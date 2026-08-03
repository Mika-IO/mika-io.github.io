## What this converter does

Apache Parquet is the format your data pipeline probably writes: a columnar, compressed binary layout designed for analytics engines. It is excellent for machines and useless for eyeballs. You cannot open it in a text editor, you cannot mail it to a colleague who lives in spreadsheets, and you cannot paste it into a ticket. CSV is the opposite: clumsy for analytics, universally readable everywhere.

This page bridges the two directions in the simplest possible way. You pick a `.parquet` file from your disk, the page decodes it, shows you how many rows and columns it found, prints a preview, and hands you a CSV file to download. There is no account, no queue, no upload progress bar, because there is no server involved at any point.

That last part is the reason this tool exists. Most online Parquet converters are a form that posts your file to a backend. If the file contains customer records, salary data, medical identifiers or anything else covered by a data policy, that upload is the entire problem. Here the conversion is JavaScript running in your tab, reading bytes the browser already gave the page when you chose the file.

## How to use it in four steps

1. Choose your `.parquet` file in the file field. Nothing happens until you pick one.
2. Pick the delimiter. Comma is the default; semicolon suits spreadsheets configured for locales where the comma is the decimal mark; tab produces a TSV that pastes cleanly into most spreadsheet programs.
3. Decide whether the first line should carry the column names. The header checkbox is on by default and toggling it re-renders the output instantly, with no need to reload the file.
4. Read the preview, then press **Download CSV**. The preview shows the first 200 rows so the page stays responsive; the downloaded file always contains every row that was in the Parquet file.

Changing the delimiter or the header switch after a conversion does not re-read the file from disk. The decoded table is kept in memory for the tab, so those switches are instant even for a file with hundreds of thousands of rows.

## How Parquet stores a table, and why the conversion is not trivial

A CSV file is a stream of rows. Parquet is the opposite: it stores each column separately, in blocks called row groups, and inside a row group each column lives in a chunk made of pages. Each page can be compressed, and the values inside can be encoded several different ways.

Reading it therefore means unwrapping several layers:

- The **footer** holds the schema and the location of every chunk, serialised with Thrift's compact protocol. The file ends with a four-byte length and the ASCII marker `PAR1`, which is also written at the very start of the file. If either marker is missing, the file is not Parquet or it was truncated during a copy.
- Each **page** may be compressed. This tool decodes uncompressed pages, Snappy pages and Gzip pages, which together cover the overwhelming majority of files written by pandas, PyArrow, Polars, DuckDB and Spark.
- The values inside a page are **encoded**. Plain layout, dictionary encoding, run-length encoding, the delta family and byte-stream-split are all handled, in both data page v1 and the newer v2 layout.
- **Nulls** are not stored as values. Parquet records a definition level per row, and the converter uses those levels to put values back in the right rows and leave the null positions empty.

None of this matters when it works. It matters when it does not: because the decoder understands each layer, an unsupported file produces a specific message about the codec, the encoding or the nesting, rather than a silently mangled CSV.

## Worked example: the values you will see

Three Parquet types have no direct CSV equivalent, so it is worth knowing exactly what the converter writes.

**A date column.** Parquet's `DATE` type stores a plain 32-bit count of days since 1 January 1970. If the stored number is 19723, then 19723 days after the epoch is 1 January 2024, and the CSV cell reads `2024-01-01`. No timezone is applied, because a date has no time to shift.

**A microsecond timestamp.** A `TIMESTAMP` column with microsecond precision stores a 64-bit count of microseconds since the epoch. Take the value 1704112215123456. Divide by 1,000,000 to get 1704112215 whole seconds, which is 1 January 2024 at 12:30:15 UTC, and 123456 microseconds are left over. The CSV cell reads `2024-01-01 12:30:15.123456`. Trailing zeros in the fraction are trimmed, so a timestamp landing exactly on a second is written without a decimal part.

**A decimal column.** A `DECIMAL(12,2)` column is stored as an integer plus a scale. The integer 1230 with scale 2 means 12.30, and that is written literally as `12.30`. This is the reason financial columns should never be routed through a float: the text keeps the exact value and the exact number of decimal places the schema promised.

Booleans are written as `true` and `false`, nulls become empty fields, and binary columns that are not valid UTF-8 text are written as base64 so that raw bytes cannot break the CSV structure.

## Where an offline converter earns its place

The obvious case is confidentiality: an export of user records that you need to glance at before it goes anywhere near a shared drive. Nothing leaves the laptop, so no policy is bent.

The second case is friction. A colleague sends a Parquet extract, you want to check three columns, and installing Python plus PyArrow just to inspect a file you will delete in five minutes is an absurd price. Opening a browser tab is not.

The third case is a machine that is not yours to configure — a locked-down work laptop, a client's computer, a lab machine where you cannot install packages. The browser is already there.

The fourth case is teaching. Watching the same table appear first as an opaque binary blob and then as plain text makes the columnar-versus-row-oriented distinction concrete in a way a diagram rarely does.

## Common mistakes and how to avoid them

**Opening the CSV in a spreadsheet and finding one giant column.** Your spreadsheet expects the delimiter of your locale. Regenerate the CSV with the semicolon option, or use the import dialog and state the delimiter explicitly.

**Long numeric identifiers turning into scientific notation.** That is the spreadsheet, not the CSV. The file contains the digits; the program decided to display them as a float. Import the column as text.

**Expecting local time.** Timestamps are written in UTC. Parquet timestamps are usually stored as an instant, and converting them to whatever timezone your machine happens to sit in would silently change every value. Shift them deliberately later if you need local time.

**Feeding it a nested export.** A file with struct, list or map columns is refused. Flatten it first with `pandas.json_normalize`, Polars' `unnest`, or a DuckDB query that selects the leaf fields, write a flat Parquet file, and convert that.

## Limits: when this is not the right tool

It reads a whole file into memory, so very large exports — several hundred megabytes and up — are better handled by DuckDB or a small script that streams row groups. Zstd, Brotli and LZ4 compression are rejected rather than half-decoded; rewrite such files with Snappy or Gzip. Encrypted Parquet files are not supported at all, by design. And nested schemas stay out of scope, because collapsing a list column into a CSV cell is a decision about your data that a generic converter has no business making silently.

## Privacy

The page contains no upload code, no analytics on your file, and no network call of any kind during the conversion. Your file is read with the browser's own file API and decoded in the tab. If you want proof rather than a promise, load the page, disconnect from the internet, and convert a file: it works exactly the same, because there was never anything on the other end of a wire.
