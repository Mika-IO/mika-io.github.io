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

## How to use the tool

Paste text into the encode field to get its Base64 representation immediately, or paste a Base64 string into the decode field to recover the original text, with both directions updating live as you type. This is handy for quickly inspecting the payload of a JWT, checking what a data URI actually contains, or preparing a value that needs to travel safely through a text-only channel such as a URL parameter or a JSON field.

## How Base64 encoding works step by step

Base64 converts binary data to text through a straightforward process. First, take the binary data and group it into 3-byte, or 24-bit, chunks. Split each 24-bit chunk into four 6-bit groups. Look up each 6-bit value, which ranges from 0 to 63, in the Base64 alphabet, where A=0, B=1, continuing through Z=25, a=26 through z=51, 0=52 through 9=61, += 62 and /=63. If the input is not an exact multiple of 3 bytes, add = padding characters at the end to complete the final group. Since 3 bytes become 4 Base64 characters, encoding increases data size by approximately 33 percent — a 1 MB binary file encoded in Base64 becomes roughly 1.37 MB of text.

## Data URIs and inline images

One of the most visible uses of Base64 on the web is the data URI, which allows a file to be embedded directly into HTML or CSS rather than referenced as a separate file, in a form like `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...`. This eliminates a separate HTTP request for the resource, which can improve performance for small icons and images. However, Base64 data cannot be cached independently from the page it is embedded in, and the roughly 33 percent size overhead makes this approach inefficient for large images, which is why it is generally reserved for small assets.

## JWT tokens and Base64URL

JSON Web Tokens use a variant called Base64URL, which replaces the + and / characters, which have special meaning inside URLs, with - and _ respectively, and usually omits the = padding entirely. A JWT looks like three dot-separated sections — header, payload and signature — each one a Base64URL-encoded chunk of data, which is why a JWT can be safely placed directly into a URL or an HTTP header without further escaping.

## Base64 in email

The MIME standard for email defines how message bodies and attachments should be encoded for transmission. Text-based content typically uses a different scheme called quoted-printable encoding, while binary attachments use Base64. When you attach a PDF to an email, your email client encodes it in Base64 before sending it, and the recipient's client decodes it back into the original file automatically, all invisibly to both people involved.

## Private and instant

Encoding and decoding run entirely in your browser using the built-in btoa and atob functions, so results appear instantly and no data you encode or decode is ever sent anywhere.
