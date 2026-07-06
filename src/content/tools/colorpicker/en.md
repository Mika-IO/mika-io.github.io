## Pick any color and get its code instantly

Color codes are everywhere in web design, graphic design, and programming. When you see a color you want to use or reproduce, you need its code — whether that is a HEX value for CSS, an RGB triplet for Photoshop, or an HSL specification for programmatic color manipulation. This tool gives you all three formats at once for any color you pick.

## The three color code formats

**HEX (Hexadecimal)**: The most widely used format in web development. A six-character string of digits 0-9 and letters A-F, prefixed with a hash symbol. Each pair of characters represents one color channel: #RRGGBB. For example, #FF5733 has maximum red (FF = 255), moderate green (57 = 87), and low blue (33 = 51). HEX codes can also be written in shorthand when both characters in each pair are identical: #FF5500 becomes #F50.

**RGB (Red, Green, Blue)**: Specifies each color channel as an integer from 0 (none) to 255 (maximum). This is the native format for digital screens, which emit light in red, green, and blue. rgb(255, 87, 51) is the same color as #FF5733. RGB values are used in CSS (rgb(r, g, b)), JavaScript, Python, and most image editing software.

**HSL (Hue, Saturation, Lightness)**: A more human-intuitive format. Hue is the pure color expressed as an angle from 0° to 360° around a color wheel: 0° = red, 120° = green, 240° = blue. Saturation is how vivid or grey the color is (0% = grey, 100% = fully saturated). Lightness is how light or dark (0% = black, 100% = white, 50% = the "normal" fully saturated color). HSL is excellent for systematically adjusting colors: increase lightness to create tints, decrease it to create shades.

## How to use the picker

Click or tap the color swatch to open your browser's native color picker, choose a color visually or type in a known value, and the HEX, RGB and HSL codes all update together immediately, ready to copy into whatever tool or code you are working in. Because the picker uses the browser's own built-in interface rather than a custom one, it behaves exactly the way you would expect and works reliably across devices.

## Which format to use

**CSS and web design**: HEX and RGB are both widely supported, but HSL is increasingly preferred because it is so intuitive to adjust. Making a color 10% lighter is easy in HSL; in RGB, it requires calculating new channel values.

**Print design**: Print typically uses CMYK (Cyan, Magenta, Yellow, Key/Black), which this tool does not cover. For digital-to-print conversion, use professional software like Adobe Illustrator.

**Programming**: RGB is the native format for most graphics libraries. HSL is useful when you want to generate color palettes programmatically.

## Color theory basics

Understanding colors helps you use this tool more effectively:

**Complementary colors**: Colors opposite each other on the hue wheel (180° apart) create maximum contrast. Red (0°) and cyan (180°).

**Analogous colors**: Colors adjacent on the hue wheel (30-60° apart) create harmonious, low-contrast palettes.

**Triadic colors**: Three colors equally spaced at 120° apart create vibrant, balanced schemes.

**Tints and shades**: Increase HSL lightness above 50% to create tints (lighter versions). Decrease it below 50% for shades (darker versions).

## Accessibility and contrast

Web accessibility standards require sufficient contrast between text and background colors. The WCAG 2.1 guidelines specify a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. Use the color codes from this picker in a dedicated contrast checker to verify accessibility.

## Colour harmonies for design

Beyond the basic pairs already mentioned, a few other combinations come up often in design work. A monochromatic scheme uses different shades, tints and tones of a single hue, created by varying HSL lightness while keeping hue and saturation constant — a reliable way to build a cohesive palette without any risk of clashing colours. A split-complementary scheme takes a base colour plus the two colours adjacent to its complement, giving much of the visual contrast of a straight complementary pair with a softer, more nuanced feel.

## Web accessibility and colour contrast

The Web Content Accessibility Guidelines define contrast ratio requirements for readable text: the AA standard requires at least 4.5:1 for normal text and 3:1 for large text (18pt or larger, or 14pt bold), while the stricter AAA standard requires 7:1 and 4.5:1 respectively. High contrast between text and background matters for anyone with low vision, and especially for the roughly 8% of men and 0.5% of women with some form of colour vision deficiency, for whom certain colour pairs that look distinct to most people can appear nearly identical.

## Named CSS colours

CSS defines 147 named colours that can be used directly in place of a hex or RGB value, ranging from obvious names like red, blue and black to more unusual ones such as cornflowerblue, papayawhip, and rebeccapurple — the last named in 2014 in memory of Rebecca Meyer, the daughter of CSS developer Eric Meyer. Picking a colour with this tool and comparing it against the nearest named CSS colour is a quick way to see whether a standard name already exists for roughly the shade you have in mind.

## Private and instant

The colour picker runs entirely in your browser using native browser colour input, so results appear instantly and no colour you pick is ever sent to a server, logged or shared.
