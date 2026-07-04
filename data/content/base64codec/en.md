## Encode and decode Base64 instantly

Base64 is a fundamental encoding used throughout computing to safely represent binary data in text form. Whether you are working with APIs, debugging network requests, understanding JWT tokens, or embedding images in HTML, Base64 appears constantly. This tool encodes any text to Base64 and decodes any Base64 string back to text with a single click.

## What is Base64?

Base64 is a binary-to-text encoding scheme that represents binary data using only 64 printable ASCII characters: the 26 uppercase letters (A-Z), 26 lowercase letters (a-z), the 10 digits (0-9), plus the characters + and /. A 65th character, =, is used as padding.

The name "Base64" comes from the fact that the encoding uses 64 distinct characters. Each Base64 character represents 6 bits of data (2^6 = 64). Since a byte is 8 bits, every 3 bytes of input become exactly 4 Base64 characters.

## Why Base64 exists

Many older text-based protocols and systems can only handle ASCII text, not arbitrary binary bytes. Email (SMTP), URLs, HTTP headers, and XML all handle text safely. Binary data — such as images, audio files, cryptographic keys, or compressed data — cannot be transmitted safely through these channels without encoding.

Base64 solves this by translating any binary data into a subset of ASCII characters that all text systems can safely store and transmit.

## Common uses

**Data URIs**: Images can be embedded directly in HTML or CSS without separate file requests. A data URI begins with data:image/png;base64, followed by the Base64-encoded image data.

**Email attachments (MIME)**: Email attachments are Base64-encoded for transmission in the MIME protocol.

**JSON APIs**: Binary data (images, files, cryptographic signatures) transmitted in JSON must be Base64-encoded because JSON is text-only.

**HTTP Basic Authentication**: The Authorization header sends credentials as Base64(username:password). This is not secure on its own — HTTPS is still required.

**JWT tokens**: JSON Web Tokens consist of three Base64URL-encoded sections (header, payload, signature) separated by dots.

**Database storage**: Binary blobs stored in text-based storage formats (like some NoSQL databases or config files) are often Base64-encoded.

## Base64 vs Base64URL

Standard Base64 uses + and / which are special characters in URLs. Base64URL replaces these with - and _ to make the encoded data URL-safe. JWT tokens use Base64URL. The = padding character is also often omitted in Base64URL.

## Security note

Base64 is NOT encryption. Anyone who receives Base64-encoded data can immediately decode it using any Base64 decoder. Do not use Base64 to "hide" sensitive information — use proper encryption instead.

## Private and instant

Encoding and decoding run in your browser using the built-in btoa() and atob() functions. No data is sent anywhere.

## How Base64 encoding works step by step

Base64 converts binary data to text through a straightforward process:

1. Take the binary data and group it into 3-byte (24-bit) chunks
2. Split each 24-bit chunk into four 6-bit groups
3. Look up each 6-bit value (0–63) in the Base64 alphabet: A=0, B=1, ... Z=25, a=26, ... z=51, 0=52, ... 9=61, +=62, /=63
4. If the input is not a multiple of 3 bytes, add = padding characters at the end

Since 3 bytes become 4 Base64 characters, Base64 encoding increases data size by approximately 33%. A 1 MB binary file encoded in Base64 becomes approximately 1.37 MB of text.

## Data URIs and inline images

One of the most visible uses of Base64 on the web is data URIs, which allow files to be embedded directly into HTML or CSS:

data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...

This eliminates an HTTP request for the resource, which can improve performance for small icons and images. However, Base64 data cannot be cached separately from the page, and the 33% size overhead makes it inefficient for large images.

## JWT tokens and Base64URL

JSON Web Tokens (JWTs) use a variant called Base64URL, which replaces the + and / characters (which have special meaning in URLs) with - and _ respectively. The = padding is usually omitted. A JWT looks like:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature

Each of the three dot-separated parts is a Base64URL-encoded section: header, payload, and signature.

## Base64 in email

The MIME standard for email defines how to encode message bodies and attachments. Text-based content typically uses "quoted-printable" encoding; binary attachments use Base64. When you attach a PDF to an email, your email client encodes it in Base64 before transmission; the recipient's client decodes it back.

## Private and instant

Encoding and decoding run in your browser using the built-in btoa() and atob() functions. No data is sent anywhere.

## How Base64 encoding works step by step

Base64 converts binary data to text through a straightforward process:

1. Take the binary data and group it into 3-byte (24-bit) chunks
2. Split each 24-bit chunk into four 6-bit groups
3. Look up each 6-bit value (0–63) in the Base64 alphabet: A=0, B=1, ... Z=25, a=26, ... z=51, 0=52, ... 9=61, +=62, /=63
4. If the input is not a multiple of 3 bytes, add = padding characters at the end

Since 3 bytes become 4 Base64 characters, Base64 encoding increases data size by approximately 33%. A 1 MB binary file encoded in Base64 becomes approximately 1.37 MB of text.

## Data URIs and inline images

One of the most visible uses of Base64 on the web is data URIs, which allow files to be embedded directly into HTML or CSS:

data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...

This eliminates an HTTP request for the resource, which can improve performance for small icons and images. However, Base64 data cannot be cached separately from the page, and the 33% size overhead makes it inefficient for large images.

## JWT tokens and Base64URL

JSON Web Tokens (JWTs) use a variant called Base64URL, which replaces the + and / characters (which have special meaning in URLs) with - and _ respectively. The = padding is usually omitted. A JWT looks like:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature

Each of the three dot-separated parts is a Base64URL-encoded section: header, payload, and signature.

## Base64 in email

The MIME standard for email defines how to encode message bodies and attachments. Text-based content typically uses "quoted-printable" encoding; binary attachments use Base64. When you attach a PDF to an email, your email client encodes it in Base64 before transmission; the recipient's client decodes it back.

## Private and instant

Encoding and decoding run in your browser using the built-in btoa() and atob() functions. No data is sent anywhere.
