#!/usr/bin/env python3
import sys,os,struct,zlib,hashlib,math
import numpy as np
from PIL import Image
W=H=460;C=3;TB=W*H*C//8;MG=b"GHCR";HS=44;DS=TB-HS
def _e(cv,pl):
    f=cv.reshape(-1).copy();b=np.unpackbits(np.frombuffer(pl,dtype=np.uint8))
    f[:len(b)]=(f[:len(b)]&0xFE)|b;return f.reshape(cv.shape)
def _c(s):return np.random.default_rng(s).integers(0,256,(H,W,C),dtype=np.uint8)
def _p(d,i,t,sh):
    cr=zlib.crc32(d)&0xFFFFFFFF
    h=MG+struct.pack("<HH",i,t)+sh+struct.pack("<I",cr)
    p=h+d+b"\x00"*(TB-len(h)-len(d));return p
def run(fp,od):
    with open(fp,"rb") as f:raw=f.read()
    sz=len(raw);sh=hashlib.sha256(raw).digest();tc=math.ceil(sz/DS)
    os.makedirs(od,exist_ok=True)
    print(f"[*] {os.path.basename(fp)} | {sz:,}B | {tc} chunks | sha={sh.hex()[:16]}")
    for i in range(tc):
        s=i*DS;e=min(s+DS,sz);cd=raw[s:e]
        if len(cd)<DS:cd+=b"\x00"*(DS-len(cd))
        pl=_p(cd,i,tc,sh);cv=_c(42000+i);st=_e(cv,pl)
        op=os.path.join(od,f"chunk_{i:03d}.png")
        Image.fromarray(st,"RGB").save(op,"PNG",optimize=False)
        print(f"  [{i+1}/{tc}] {os.path.basename(op)} ({os.path.getsize(op)//1024}KB)")
    print(f"[*] {tc} imgs -> {od}/")
if __name__=="__main__":
    if len(sys.argv)<2:print("uso: python encode.py <arquivo> [output_dir]");sys.exit(1)
    run(sys.argv[1],sys.argv[2] if len(sys.argv)>2 else "chunks")
