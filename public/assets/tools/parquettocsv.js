/* Parquet to CSV converter. Runs fully in the browser: a small Parquet reader
   (Thrift compact metadata, Snappy/Gzip, PLAIN/RLE/dictionary/delta pages).
   Localized labels come from data-* attributes on the widget. */
(function () {
  'use strict';
  var root = document.getElementById('pq-app');
  if (!root) return;
  var d = root.dataset;

  var fileInput = document.getElementById('pq-file');
  var sepSel = document.getElementById('pq-sep');
  var headerBox = document.getElementById('pq-header');
  var resultBox = document.getElementById('pq-result');
  var summaryEl = document.getElementById('pq-summary');
  var noteEl = document.getElementById('pq-note');
  var outEl = document.getElementById('pq-out');
  var dlBtn = document.getElementById('pq-download');
  var errEl = document.getElementById('pq-error');
  var statusEl = document.getElementById('pq-status');

  var PREVIEW_ROWS = 200;
  var utf8 = new TextDecoder();
  var lastCsv = '';
  var lastName = 'data';

  /* ---------- Thrift compact protocol ---------- */

  function TC(bytes, pos) { this.b = bytes; this.p = pos || 0; }
  TC.prototype.byte = function () { return this.b[this.p++]; };
  TC.prototype.uvarint = function () {
    var shift = 0n, res = 0n, b;
    do { b = this.b[this.p++]; res |= BigInt(b & 0x7f) << shift; shift += 7n; } while (b & 0x80);
    return res;
  };
  TC.prototype.zigzag = function () { var u = this.uvarint(); return (u >> 1n) ^ -(u & 1n); };
  TC.prototype.int = function () { return Number(this.zigzag()); };
  TC.prototype.long = function () { return this.zigzag(); };
  TC.prototype.bin = function () {
    var n = Number(this.uvarint());
    var s = this.b.subarray(this.p, this.p + n);
    this.p += n;
    return s;
  };
  TC.prototype.str = function () { return utf8.decode(this.bin()); };

  function readStruct(t, onField) {
    var id = 0, out = {};
    for (;;) {
      var h = t.byte();
      if (h === 0 || h === undefined) break;
      var type = h & 0x0f;
      var delta = (h & 0xf0) >> 4;
      id = delta === 0 ? Number(t.zigzag()) : id + delta;
      if (!onField(out, id, type, t)) skipField(t, type);
    }
    return out;
  }

  function listHeader(t) {
    var h = t.byte();
    var et = h & 0x0f;
    var n = (h & 0xf0) >> 4;
    if (n === 15) n = Number(t.uvarint());
    return { n: n, et: et };
  }

  function skipField(t, type) {
    switch (type) {
      case 1: case 2: break;
      case 3: t.p += 1; break;
      case 4: case 5: case 6: t.uvarint(); break;
      case 7: t.p += 8; break;
      case 8: t.bin(); break;
      case 9: case 10: {
        var lh = listHeader(t);
        for (var i = 0; i < lh.n; i++) skipField(t, lh.et);
        break;
      }
      case 11: {
        var n = Number(t.uvarint());
        if (n === 0) break;
        var kv = t.byte();
        for (var j = 0; j < n; j++) { skipField(t, (kv & 0xf0) >> 4); skipField(t, kv & 0x0f); }
        break;
      }
      case 12: readStruct(t, function () { return false; }); break;
      default: break;
    }
  }

  /* ---------- Parquet metadata structures ---------- */

  function readLogicalType(t) {
    var out = {};
    readStruct(t, function (o, id, type, tt) {
      if (type !== 12) return false;
      out.kind = id;
      if (id === 5) {
        readStruct(tt, function (o2, id2, type2, t2) {
          if (id2 === 1 && type2 === 5) { out.scale = t2.int(); return true; }
          if (id2 === 2 && type2 === 5) { out.precision = t2.int(); return true; }
          return false;
        });
      } else if (id === 6 || id === 7 || id === 8) {
        readStruct(tt, function (o2, id2, type2, t2) {
          if (id2 === 1 && (type2 === 1 || type2 === 2)) { out.utc = type2 === 1; return true; }
          if (id2 === 2 && type2 === 12) {
            readStruct(t2, function (o3, id3) { out.unit = id3; return false; });
            return true;
          }
          return false;
        });
      } else if (id === 10) {
        readStruct(tt, function (o2, id2, type2, t2) {
          if (id2 === 1 && type2 === 3) { out.bits = t2.b[t2.p++]; return true; }
          if (id2 === 2 && (type2 === 1 || type2 === 2)) { out.signed = type2 === 1; return true; }
          return false;
        });
      } else {
        readStruct(tt, function () { return false; });
      }
      return true;
    });
    return out;
  }

  function readSchemaElement(t) {
    return readStruct(t, function (o, id, type, tt) {
      if (id === 1 && type === 5) { o.type = tt.int(); return true; }
      if (id === 2 && type === 5) { o.typeLength = tt.int(); return true; }
      if (id === 3 && type === 5) { o.rep = tt.int(); return true; }
      if (id === 4 && type === 8) { o.name = tt.str(); return true; }
      if (id === 5 && type === 5) { o.numChildren = tt.int(); return true; }
      if (id === 6 && type === 5) { o.converted = tt.int(); return true; }
      if (id === 7 && type === 5) { o.scale = tt.int(); return true; }
      if (id === 8 && type === 5) { o.precision = tt.int(); return true; }
      if (id === 10 && type === 12) { o.logical = readLogicalType(tt); return true; }
      return false;
    });
  }

  function readColumnMeta(t) {
    return readStruct(t, function (o, id, type, tt) {
      if (id === 1 && type === 5) { o.type = tt.int(); return true; }
      if (id === 3 && type === 9) {
        var lh = listHeader(tt);
        o.path = [];
        for (var i = 0; i < lh.n; i++) o.path.push(tt.str());
        return true;
      }
      if (id === 4 && type === 5) { o.codec = tt.int(); return true; }
      if (id === 5 && type === 6) { o.numValues = Number(tt.long()); return true; }
      if (id === 7 && type === 6) { o.totalCompressed = Number(tt.long()); return true; }
      if (id === 9 && type === 6) { o.dataPageOffset = Number(tt.long()); return true; }
      if (id === 11 && type === 6) { o.dictPageOffset = Number(tt.long()); return true; }
      return false;
    });
  }

  function readColumnChunk(t) {
    return readStruct(t, function (o, id, type, tt) {
      if (id === 3 && type === 12) { o.meta = readColumnMeta(tt); return true; }
      return false;
    });
  }

  function readRowGroup(t) {
    return readStruct(t, function (o, id, type, tt) {
      if (id === 1 && type === 9) {
        var lh = listHeader(tt);
        o.columns = [];
        for (var i = 0; i < lh.n; i++) o.columns.push(readColumnChunk(tt));
        return true;
      }
      if (id === 3 && type === 6) { o.numRows = Number(tt.long()); return true; }
      return false;
    });
  }

  function readFileMeta(t) {
    return readStruct(t, function (o, id, type, tt) {
      if (id === 2 && type === 9) {
        var lh = listHeader(tt);
        o.schema = [];
        for (var i = 0; i < lh.n; i++) o.schema.push(readSchemaElement(tt));
        return true;
      }
      if (id === 3 && type === 6) { o.numRows = Number(tt.long()); return true; }
      if (id === 4 && type === 9) {
        var lh2 = listHeader(tt);
        o.rowGroups = [];
        for (var j = 0; j < lh2.n; j++) o.rowGroups.push(readRowGroup(tt));
        return true;
      }
      return false;
    });
  }

  function readPageHeader(t) {
    return readStruct(t, function (o, id, type, tt) {
      if (id === 1 && type === 5) { o.type = tt.int(); return true; }
      if (id === 2 && type === 5) { o.uncompressed = tt.int(); return true; }
      if (id === 3 && type === 5) { o.compressed = tt.int(); return true; }
      if (id === 5 && type === 12) {
        o.v1 = readStruct(tt, function (p, pid, ptype, t2) {
          if (pid === 1 && ptype === 5) { p.numValues = t2.int(); return true; }
          if (pid === 2 && ptype === 5) { p.encoding = t2.int(); return true; }
          if (pid === 3 && ptype === 5) { p.defEnc = t2.int(); return true; }
          if (pid === 4 && ptype === 5) { p.repEnc = t2.int(); return true; }
          return false;
        });
        return true;
      }
      if (id === 7 && type === 12) {
        o.dict = readStruct(tt, function (p, pid, ptype, t2) {
          if (pid === 1 && ptype === 5) { p.numValues = t2.int(); return true; }
          if (pid === 2 && ptype === 5) { p.encoding = t2.int(); return true; }
          return false;
        });
        return true;
      }
      if (id === 8 && type === 12) {
        o.v2 = readStruct(tt, function (p, pid, ptype, t2) {
          if (pid === 1 && ptype === 5) { p.numValues = t2.int(); return true; }
          if (pid === 2 && ptype === 5) { p.numNulls = t2.int(); return true; }
          if (pid === 3 && ptype === 5) { p.numRows = t2.int(); return true; }
          if (pid === 4 && ptype === 5) { p.encoding = t2.int(); return true; }
          if (pid === 5 && ptype === 5) { p.defLen = t2.int(); return true; }
          if (pid === 6 && ptype === 5) { p.repLen = t2.int(); return true; }
          if (pid === 7 && (ptype === 1 || ptype === 2)) { p.compressed = ptype === 1; return true; }
          return false;
        });
        return true;
      }
      return false;
    });
  }

  /* ---------- Decompression ---------- */

  function snappyDecompress(input) {
    var pos = 0, shift = 0, size = 0, b;
    do { b = input[pos++]; size |= (b & 0x7f) << shift; shift += 7; } while (b & 0x80);
    var out = new Uint8Array(size >>> 0), op = 0;
    while (pos < input.length && op < out.length) {
      var tag = input[pos++];
      var kind = tag & 3;
      if (kind === 0) {
        var n = tag >> 2;
        if (n >= 60) {
          var extra = n - 59, len = 0;
          for (var i = 0; i < extra; i++) len += input[pos + i] * Math.pow(256, i);
          pos += extra;
          n = len;
        }
        n += 1;
        out.set(input.subarray(pos, pos + n), op);
        op += n;
        pos += n;
      } else {
        var length, offset;
        if (kind === 1) {
          length = 4 + ((tag >> 2) & 7);
          offset = ((tag >> 5) << 8) | input[pos++];
        } else if (kind === 2) {
          length = 1 + (tag >> 2);
          offset = input[pos] | (input[pos + 1] << 8);
          pos += 2;
        } else {
          length = 1 + (tag >> 2);
          offset = (input[pos] | (input[pos + 1] << 8) | (input[pos + 2] << 16) | (input[pos + 3] << 24)) >>> 0;
          pos += 4;
        }
        var src = op - offset;
        if (src < 0) throw fail(d.errCorrupt);
        for (var k = 0; k < length; k++) out[op++] = out[src++];
      }
    }
    return out;
  }

  function inflate(bytes, format) {
    var stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream(format));
    return new Response(stream).arrayBuffer().then(function (buf) { return new Uint8Array(buf); });
  }

  var CODECS = { 0: 'NONE', 1: 'SNAPPY', 2: 'GZIP', 3: 'LZO', 4: 'BROTLI', 5: 'LZ4', 6: 'ZSTD', 7: 'LZ4_RAW' };

  function decompress(bytes, codec) {
    if (codec === 0) return Promise.resolve(bytes);
    if (codec === 1) return Promise.resolve(snappyDecompress(bytes));
    if (codec === 2) return inflate(bytes, 'gzip');
    return Promise.reject(fail(d.errCodec.replace('{codec}', CODECS[codec] || String(codec))));
  }

  /* ---------- Level and value decoders ---------- */

  function bitWidth(max) {
    var w = 0;
    while (max > 0) { w++; max >>= 1; }
    return w;
  }

  function rleDecode(bytes, pos, end, width, count, out) {
    var n = 0;
    while (n < count && pos < end) {
      var shift = 0, header = 0, b;
      do { b = bytes[pos++]; header |= (b & 0x7f) << shift; shift += 7; } while (b & 0x80);
      if (header & 1) {
        var groups = header >> 1;
        var bitPos = 0;
        var base = pos;
        var total = groups * 8;
        for (var i = 0; i < total; i++) {
          var v = 0;
          for (var j = 0; j < width; j++) {
            v |= ((bytes[base + (bitPos >> 3)] >> (bitPos & 7)) & 1) << j;
            bitPos++;
          }
          if (n < count) out[n++] = v >>> 0;
        }
        pos = base + groups * width;
      } else {
        var runLen = header >> 1;
        var byteCount = (width + 7) >> 3;
        var val = 0;
        for (var k = 0; k < byteCount; k++) val += bytes[pos + k] * Math.pow(256, k);
        pos += byteCount;
        for (var r = 0; r < runLen && n < count; r++) out[n++] = val;
      }
    }
    return pos;
  }

  /* Delta binary packed (encoding 5). Returns BigInt values. */
  function deltaBinaryPacked(bytes, pos, out) {
    var shift, res, b;
    function uv() {
      shift = 0n; res = 0n;
      do { b = bytes[pos++]; res |= BigInt(b & 0x7f) << shift; shift += 7n; } while (b & 0x80);
      return res;
    }
    function zz() { var u = uv(); return (u >> 1n) ^ -(u & 1n); }
    var blockSize = Number(uv());
    var miniPerBlock = Number(uv());
    var total = Number(uv());
    var valuesPerMini = blockSize / miniPerBlock;
    var idx = 0;
    var prev = 0n;
    if (total > 0) { prev = zz(); out[idx++] = prev; }
    while (idx < total) {
      var minDelta = zz();
      var widths = [];
      for (var m = 0; m < miniPerBlock; m++) widths.push(bytes[pos++]);
      for (var mb = 0; mb < miniPerBlock && idx < total; mb++) {
        var w = widths[mb];
        for (var i = 0; i < valuesPerMini; i++) {
          var v = 0n;
          if (w > 0) {
            var bitPos = i * w;
            for (var j = 0; j < w; j++) {
              v |= BigInt((bytes[pos + (bitPos >> 3)] >> (bitPos & 7)) & 1) << BigInt(j);
              bitPos++;
            }
          }
          if (idx < total) { prev = prev + minDelta + v; out[idx++] = prev; }
        }
        pos += (valuesPerMini * w) >> 3;
      }
    }
    return { pos: pos, count: total };
  }

  var TYPE = { BOOLEAN: 0, INT32: 1, INT64: 2, INT96: 3, FLOAT: 4, DOUBLE: 5, BYTE_ARRAY: 6, FLBA: 7 };

  /* PLAIN decoding of `count` values of the given physical type. */
  function plainDecode(bytes, pos, end, type, count, typeLength, out) {
    var view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    var i;
    if (type === TYPE.BOOLEAN) {
      for (i = 0; i < count; i++) out.push(((bytes[pos + (i >> 3)] >> (i & 7)) & 1) === 1);
      return pos + ((count + 7) >> 3);
    }
    if (type === TYPE.INT32) {
      for (i = 0; i < count; i++) { out.push(view.getInt32(pos, true)); pos += 4; }
      return pos;
    }
    if (type === TYPE.INT64) {
      for (i = 0; i < count; i++) { out.push(view.getBigInt64(pos, true)); pos += 8; }
      return pos;
    }
    if (type === TYPE.INT96) {
      for (i = 0; i < count; i++) {
        out.push({ nanos: view.getBigInt64(pos, true), day: view.getInt32(pos + 8, true) });
        pos += 12;
      }
      return pos;
    }
    if (type === TYPE.FLOAT) {
      for (i = 0; i < count; i++) { out.push(view.getFloat32(pos, true)); pos += 4; }
      return pos;
    }
    if (type === TYPE.DOUBLE) {
      for (i = 0; i < count; i++) { out.push(view.getFloat64(pos, true)); pos += 8; }
      return pos;
    }
    if (type === TYPE.BYTE_ARRAY) {
      for (i = 0; i < count && pos < end; i++) {
        var len = view.getUint32(pos, true);
        pos += 4;
        out.push(bytes.subarray(pos, pos + len));
        pos += len;
      }
      return pos;
    }
    for (i = 0; i < count; i++) { out.push(bytes.subarray(pos, pos + typeLength)); pos += typeLength; }
    return pos;
  }

  function byteStreamSplit(bytes, pos, count, width, type, out) {
    var buf = new Uint8Array(count * width);
    for (var s = 0; s < width; s++) {
      for (var i = 0; i < count; i++) buf[i * width + s] = bytes[pos + s * count + i];
    }
    plainDecode(buf, 0, buf.length, type, count, width, out);
    return pos + count * width;
  }

  var ENC = { PLAIN: 0, PLAIN_DICT: 2, RLE: 3, BIT_PACKED: 4, DELTA: 5, DELTA_LEN_BA: 6, DELTA_BA: 7, RLE_DICT: 8, BSS: 9 };
  var ENC_NAMES = { 0: 'PLAIN', 2: 'PLAIN_DICTIONARY', 3: 'RLE', 4: 'BIT_PACKED', 5: 'DELTA_BINARY_PACKED', 6: 'DELTA_LENGTH_BYTE_ARRAY', 7: 'DELTA_BYTE_ARRAY', 8: 'RLE_DICTIONARY', 9: 'BYTE_STREAM_SPLIT' };

  /* Decode the values section of a data page (nulls excluded). */
  function decodeValues(bytes, pos, end, enc, type, count, typeLength, dict) {
    var out = [];
    var i;
    if (enc === ENC.PLAIN) {
      plainDecode(bytes, pos, end, type, count, typeLength, out);
      return out;
    }
    if (enc === ENC.RLE_DICT || enc === ENC.PLAIN_DICT) {
      if (!dict) throw fail(d.errCorrupt);
      var width = bytes[pos];
      var idx = new Array(count);
      rleDecode(bytes, pos + 1, end, width, count, idx);
      for (i = 0; i < count; i++) out.push(dict[idx[i]]);
      return out;
    }
    if (enc === ENC.RLE) {
      var levels = new Array(count);
      rleDecode(bytes, pos + 4, end, 1, count, levels);
      for (i = 0; i < count; i++) out.push(levels[i] === 1);
      return out;
    }
    if (enc === ENC.DELTA) {
      var vals = new Array(count);
      deltaBinaryPacked(bytes, pos, vals);
      for (i = 0; i < count; i++) out.push(type === TYPE.INT32 ? Number(vals[i]) : vals[i]);
      return out;
    }
    if (enc === ENC.DELTA_LEN_BA) {
      var lens = new Array(count);
      var r = deltaBinaryPacked(bytes, pos, lens);
      var p = r.pos;
      for (i = 0; i < count; i++) {
        var n = Number(lens[i]);
        out.push(bytes.subarray(p, p + n));
        p += n;
      }
      return out;
    }
    if (enc === ENC.DELTA_BA) {
      var prefixes = new Array(count);
      var r1 = deltaBinaryPacked(bytes, pos, prefixes);
      var suffixes = new Array(count);
      var r2 = deltaBinaryPacked(bytes, r1.pos, suffixes);
      var q = r2.pos;
      var prevBytes = new Uint8Array(0);
      for (i = 0; i < count; i++) {
        var pl = Number(prefixes[i]);
        var sl = Number(suffixes[i]);
        var val = new Uint8Array(pl + sl);
        val.set(prevBytes.subarray(0, pl), 0);
        val.set(bytes.subarray(q, q + sl), pl);
        q += sl;
        out.push(val);
        prevBytes = val;
      }
      return out;
    }
    if (enc === ENC.BSS) {
      var w = type === TYPE.FLOAT ? 4 : type === TYPE.DOUBLE ? 8 : type === TYPE.INT32 ? 4 : type === TYPE.INT64 ? 8 : typeLength;
      byteStreamSplit(bytes, pos, count, w, type, out);
      return out;
    }
    throw fail(d.errEncoding.replace('{encoding}', ENC_NAMES[enc] || String(enc)));
  }

  /* ---------- Column chunk reader ---------- */

  function readChunk(bytes, chunk, se, maxDef, rowCount) {
    var meta = chunk.meta;
    var start = meta.dataPageOffset;
    if (meta.dictPageOffset && meta.dictPageOffset > 0 && meta.dictPageOffset < start) start = meta.dictPageOffset;
    var pos = start;
    var limit = meta.totalCompressed ? start + meta.totalCompressed : bytes.length;
    var values = [];
    var dict = null;
    var seen = 0;
    var typeLength = se.typeLength || 0;

    function step() {
      if (seen >= rowCount || pos >= limit) return Promise.resolve(values);
      var t = new TC(bytes, pos);
      var head = readPageHeader(t);
      var dataStart = t.p;
      var raw = bytes.subarray(dataStart, dataStart + head.compressed);
      pos = dataStart + head.compressed;

      if (head.dict) {
        return decompress(raw, meta.codec).then(function (page) {
          var out = [];
          plainDecode(page, 0, page.length, meta.type, head.dict.numValues, typeLength, out);
          dict = out;
          return step();
        });
      }

      if (head.v2) {
        var v2 = head.v2;
        var levelBytes = (v2.repLen || 0) + (v2.defLen || 0);
        var levelPart = raw.subarray(0, levelBytes);
        var body = raw.subarray(levelBytes);
        var defs = null;
        if (maxDef > 0) {
          defs = new Array(v2.numValues);
          rleDecode(levelPart, v2.repLen || 0, levelBytes, bitWidth(maxDef), v2.numValues, defs);
        }
        var nonNull = v2.numValues - (v2.numNulls || 0);
        var doBody = v2.compressed === false ? Promise.resolve(body) : decompress(body, meta.codec);
        return doBody.then(function (page) {
          var vals = decodeValues(page, 0, page.length, v2.encoding, meta.type, nonNull, typeLength, dict);
          merge(vals, defs, v2.numValues);
          seen += v2.numValues;
          return step();
        });
      }

      if (!head.v1) { return Promise.resolve(values); }
      var v1 = head.v1;
      return decompress(raw, meta.codec).then(function (page) {
        var p = 0;
        var defs = null;
        var view = new DataView(page.buffer, page.byteOffset, page.byteLength);
        if (maxDef > 0) {
          var defLen = view.getUint32(p, true);
          p += 4;
          defs = new Array(v1.numValues);
          rleDecode(page, p, p + defLen, bitWidth(maxDef), v1.numValues, defs);
          p += defLen;
        }
        var nonNull = v1.numValues;
        if (defs) {
          nonNull = 0;
          for (var i = 0; i < v1.numValues; i++) if (defs[i] === maxDef) nonNull++;
        }
        var vals = decodeValues(page, p, page.length, v1.encoding, meta.type, nonNull, typeLength, dict);
        merge(vals, defs, v1.numValues);
        seen += v1.numValues;
        return step();
      });
    }

    function merge(vals, defs, n) {
      if (!defs) {
        for (var i = 0; i < n; i++) values.push(vals[i]);
        return;
      }
      var k = 0;
      for (var j = 0; j < n; j++) values.push(defs[j] === maxDef ? vals[k++] : null);
    }

    return step();
  }

  /* ---------- Value formatting ---------- */

  var CONV = { UTF8: 0, DECIMAL: 5, DATE: 6, TIME_MILLIS: 7, TIME_MICROS: 8, TS_MILLIS: 9, TS_MICROS: 10, UINT8: 11, UINT16: 12, UINT32: 13, UINT64: 14, JSON: 19, BSON: 20 };
  var TWO64 = 18446744073709551616n;

  function pad(n, size) {
    var s = String(n);
    while (s.length < size) s = '0' + s;
    return s;
  }

  function floorDiv(a, b) {
    var q = a / b;
    if (a % b !== 0n && (a < 0n) !== (b < 0n)) q -= 1n;
    return q;
  }

  function trimFrac(frac, digits) {
    var f = pad(frac.toString(), digits).replace(/0+$/, '');
    return f ? '.' + f : '';
  }

  /* value is a count of `perSecond` units since the Unix epoch, UTC. */
  function tsFormat(value, perSecond, digits) {
    var v = BigInt(value);
    var unit = BigInt(perSecond);
    var secs = floorDiv(v, unit);
    var frac = v - secs * unit;
    var ms = Number(secs) * 1000;
    if (!isFinite(ms) || Math.abs(ms) > 8.64e15) return '';
    var dt = new Date(ms);
    if (isNaN(dt.getTime())) return '';
    return dt.getUTCFullYear() + '-' + pad(dt.getUTCMonth() + 1, 2) + '-' + pad(dt.getUTCDate(), 2) +
      ' ' + pad(dt.getUTCHours(), 2) + ':' + pad(dt.getUTCMinutes(), 2) + ':' + pad(dt.getUTCSeconds(), 2) +
      trimFrac(frac, digits);
  }

  function dateFromDays(days) {
    var dt = new Date(days * 86400000);
    if (isNaN(dt.getTime())) return '';
    return dt.getUTCFullYear() + '-' + pad(dt.getUTCMonth() + 1, 2) + '-' + pad(dt.getUTCDate(), 2);
  }

  function timeOfDay(value, perSecond, fracDigits) {
    var v = BigInt(value);
    var neg = v < 0n;
    if (neg) v = -v;
    var unit = BigInt(perSecond);
    var secs = v / unit;
    var frac = v % unit;
    var h = secs / 3600n, m = (secs % 3600n) / 60n, s = secs % 60n;
    return (neg ? '-' : '') + pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + trimFrac(frac, fracDigits);
  }

  function scaled(bigValue, scale) {
    var v = BigInt(bigValue);
    if (!scale) return v.toString();
    var neg = v < 0n;
    if (neg) v = -v;
    var s = v.toString();
    while (s.length <= scale) s = '0' + s;
    return (neg ? '-' : '') + s.slice(0, s.length - scale) + '.' + s.slice(s.length - scale);
  }

  function bytesToBigInt(bytes) {
    var v = 0n;
    for (var i = 0; i < bytes.length; i++) v = (v << 8n) | BigInt(bytes[i]);
    if (bytes.length && (bytes[0] & 0x80)) v -= 1n << BigInt(bytes.length * 8);
    return v;
  }

  function toBase64(bytes) {
    var bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }

  function timestampUnit(se) {
    if (se.logical && se.logical.kind === 8 && se.logical.unit) return se.logical.unit;
    if (se.converted === CONV.TS_MILLIS) return 1;
    if (se.converted === CONV.TS_MICROS) return 2;
    return 0;
  }

  function isString(se) {
    if (se.logical && (se.logical.kind === 1 || se.logical.kind === 4 || se.logical.kind === 12)) return true;
    return se.converted === CONV.UTF8 || se.converted === CONV.JSON || se.converted === 4;
  }

  function decimalScale(se) {
    if (se.logical && se.logical.kind === 5) return se.logical.scale || 0;
    if (se.converted === CONV.DECIMAL) return se.scale || 0;
    return -1;
  }

  function formatValue(v, se) {
    if (v === null || v === undefined) return '';
    var scale;
    switch (se.type) {
      case TYPE.BOOLEAN:
        return v ? 'true' : 'false';
      case TYPE.INT32:
        scale = decimalScale(se);
        if (scale >= 0) return scaled(BigInt(v), scale);
        if (se.converted === CONV.DATE || (se.logical && se.logical.kind === 6)) return dateFromDays(v);
        if (se.converted === CONV.TIME_MILLIS || (se.logical && se.logical.kind === 7 && se.logical.unit === 1)) return timeOfDay(v, 1000, 3);
        if (se.converted === CONV.UINT32 && v < 0) return String(v >>> 0);
        return String(v);
      case TYPE.INT64: {
        var big = BigInt(v);
        scale = decimalScale(se);
        if (scale >= 0) return scaled(big, scale);
        var unit = timestampUnit(se);
        if (unit === 1) return tsFormat(big, 1000, 3);
        if (unit === 2) return tsFormat(big, 1000000, 6);
        if (unit === 3) return tsFormat(big, 1000000000, 9);
        if (se.converted === CONV.TIME_MICROS || (se.logical && se.logical.kind === 7 && se.logical.unit === 2)) return timeOfDay(big, 1000000, 6);
        if (se.logical && se.logical.kind === 7 && se.logical.unit === 3) return timeOfDay(big, 1000000000, 9);
        if ((se.converted === CONV.UINT64 || (se.logical && se.logical.kind === 10 && se.logical.signed === false)) && big < 0n) return (big + TWO64).toString();
        return big.toString();
      }
      case TYPE.INT96:
        return tsFormat((BigInt(v.day) - 2440588n) * 86400000000000n + v.nanos, 1000000000, 9);
      case TYPE.FLOAT:
      case TYPE.DOUBLE:
        if (!isFinite(v)) return v > 0 ? 'Infinity' : (v < 0 ? '-Infinity' : 'NaN');
        return String(v);
      default: {
        scale = decimalScale(se);
        if (scale >= 0) return scaled(bytesToBigInt(v), scale);
        if (se.logical && se.logical.kind === 14 && v.length === 16) {
          var hex = '';
          for (var i = 0; i < 16; i++) hex += pad(v[i].toString(16), 2);
          return hex.slice(0, 8) + '-' + hex.slice(8, 12) + '-' + hex.slice(12, 16) + '-' + hex.slice(16, 20) + '-' + hex.slice(20);
        }
        if (isString(se) || se.type === TYPE.BYTE_ARRAY) {
          try { return new TextDecoder('utf-8', { fatal: true }).decode(v); }
          catch (e) { return toBase64(v); }
        }
        return toBase64(v);
      }
    }
  }

  /* ---------- File reader ---------- */

  function fail(msg) {
    var e = new Error('parquet');
    e.shown = msg || d.errGeneric;
    return e;
  }

  function magicAt(bytes, offset) {
    return bytes[offset] === 0x50 && bytes[offset + 1] === 0x41 && bytes[offset + 2] === 0x52 && bytes[offset + 3] === 0x31;
  }

  function buildColumns(schema) {
    var cols = [];
    for (var i = 1; i < schema.length; i++) {
      var se = schema[i];
      if (se.numChildren > 0) throw fail(d.errNested);
      if (se.rep === 2) throw fail(d.errNested);
      cols.push(se);
    }
    return cols;
  }

  function readParquet(bytes) {
    if (bytes.length < 12 || !magicAt(bytes, 0) || !magicAt(bytes, bytes.length - 4)) throw fail(d.errFormat);
    var view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    var footerLen = view.getUint32(bytes.length - 8, true);
    var metaStart = bytes.length - 8 - footerLen;
    if (metaStart < 4) throw fail(d.errFormat);
    var meta = readFileMeta(new TC(bytes, metaStart));
    if (!meta.schema || meta.schema.length < 2) throw fail(d.errFormat);
    var cols = buildColumns(meta.schema);
    var groups = meta.rowGroups || [];
    var rows = [];

    var gi = 0;
    function nextGroup() {
      if (gi >= groups.length) return Promise.resolve({ cols: cols, rows: rows });
      var rg = groups[gi++];
      var count = rg.numRows || 0;
      var data = new Array(cols.length);
      var ci = 0;
      function nextCol() {
        if (ci >= cols.length) {
          for (var r = 0; r < count; r++) {
            var row = new Array(cols.length);
            for (var c = 0; c < cols.length; c++) row[c] = formatValue(data[c] ? data[c][r] : null, cols[c]);
            rows.push(row);
          }
          return nextGroup();
        }
        var idx = ci++;
        var se = cols[idx];
        var chunk = null;
        for (var k = 0; k < rg.columns.length; k++) {
          var p = rg.columns[k].meta.path;
          if (p && p.length === 1 && p[0] === se.name) { chunk = rg.columns[k]; break; }
        }
        if (!chunk) chunk = rg.columns[idx];
        if (!chunk) { data[idx] = null; return nextCol(); }
        return readChunk(bytes, chunk, se, se.rep === 1 ? 1 : 0, count).then(function (vals) {
          data[idx] = vals;
          return nextCol();
        });
      }
      return nextCol();
    }
    return nextGroup();
  }

  /* ---------- CSV output ---------- */

  function escapeCell(value, sep) {
    if (value.indexOf(sep) >= 0 || value.indexOf('"') >= 0 || value.indexOf('\n') >= 0 || value.indexOf('\r') >= 0) {
      return '"' + value.split('"').join('""') + '"';
    }
    return value;
  }

  function toCsv(cols, rows, sep, withHeader, limit) {
    var lines = [];
    if (withHeader) {
      var head = [];
      for (var c = 0; c < cols.length; c++) head.push(escapeCell(cols[c].name, sep));
      lines.push(head.join(sep));
    }
    var max = limit && limit < rows.length ? limit : rows.length;
    for (var r = 0; r < max; r++) {
      var cells = [];
      for (var i = 0; i < rows[r].length; i++) cells.push(escapeCell(rows[r][i], sep));
      lines.push(cells.join(sep));
    }
    return lines.join('\r\n');
  }

  /* ---------- UI wiring ---------- */

  function showError(msg) {
    errEl.textContent = msg;
    errEl.hidden = false;
    resultBox.hidden = true;
    statusEl.textContent = '';
  }

  function separator() {
    var v = sepSel.value;
    return v === 'tab' ? '\t' : v;
  }

  function render(parsed) {
    var sep = separator();
    var withHeader = headerBox.checked;
    lastCsv = toCsv(parsed.cols, parsed.rows, sep, withHeader, 0);
    outEl.value = toCsv(parsed.cols, parsed.rows, sep, withHeader, PREVIEW_ROWS);
    summaryEl.textContent = d.summary
      .replace('{rows}', String(parsed.rows.length))
      .replace('{cols}', String(parsed.cols.length));
    noteEl.hidden = parsed.rows.length <= PREVIEW_ROWS;
    noteEl.textContent = d.previewNote
      .replace('{shown}', String(PREVIEW_ROWS))
      .replace('{total}', String(parsed.rows.length));
    errEl.hidden = true;
    resultBox.hidden = false;
    statusEl.textContent = '';
  }

  var parsedCache = null;

  function convert(file) {
    errEl.hidden = true;
    resultBox.hidden = true;
    statusEl.textContent = d.working;
    return file.arrayBuffer().then(function (buf) {
      return readParquet(new Uint8Array(buf));
    }).then(function (parsed) {
      parsedCache = parsed;
      render(parsed);
    })['catch'](function (e) {
      parsedCache = null;
      showError(e && e.shown ? e.shown : d.errGeneric);
    });
  }

  fileInput.addEventListener('change', function () {
    var file = this.files && this.files[0];
    if (!file) return;
    lastName = file.name.replace(/\.[^.]+$/, '') || 'data';
    convert(file);
  });

  function reformat() {
    if (parsedCache) render(parsedCache);
  }
  sepSel.addEventListener('change', reformat);
  headerBox.addEventListener('change', reformat);

  dlBtn.addEventListener('click', function () {
    if (!lastCsv) return;
    var blob = new Blob(['﻿' + lastCsv], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = lastName + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  });
})();
