## Find and scale any aspect ratio instantly

An aspect ratio describes the shape of a rectangle — a photo, a screen, a video frame — as a simple relationship between its width and its height, written as two numbers separated by a colon, such as 16:9 or 4:3. This calculator does two related jobs at once: enter any width and height to find the simplified ratio those dimensions represent, and enter a new width to see exactly what height keeps that same shape. Both update instantly as you type, so you can check a resolution or plan a resize in seconds rather than doing the division by hand.

## How to use it

Type a width and height into the first section — these can be pixels, centimetres, inches or any consistent unit, since a ratio is just a proportion and does not care what the underlying unit is. The simplified ratio appears immediately below, along with the common name for that shape if it matches a widely used standard such as 16:9 or 4:3. In the second section, type any new width and the calculator works out the exact height that preserves the original proportions, which is exactly what you need when resizing an image or setting up a new video export without introducing stretching or unwanted cropping.

## How the simplification works

Reducing a ratio like 1920:1080 down to 16:9 uses exactly the same idea as simplifying a fraction: find the greatest common divisor of the two numbers and divide both by it. For 1920 and 1080, the greatest common divisor is 120, and dividing both numbers by 120 gives 16 and 9 — the smallest whole-number pair that describes the same shape. This is why 1920×1080, 1280×720 and 3840×2160 all simplify to the same 16:9 ratio despite being very different actual sizes: they all share the same underlying proportion, just at different scales.

## Common aspect ratios and where they come from

**16:9** is the standard widescreen ratio used by virtually all modern televisions, monitors, and streaming video, including full HD (1920×1080) and 4K (3840×2160) resolutions. **4:3** was the standard shape for television and computer monitors before the widescreen era, and it persists in some older content and specific camera formats. **1:1** is a perfect square, associated with classic medium-format photography and square social media posts. **9:16** is the vertical mirror of widescreen, now the standard shape for phone-held video, stories and short-form vertical content. **21:9** is an ultrawide ratio used by cinema and some ultrawide monitors, closely matching the look of a movie theatre screen. **3:2** is a classic 35mm film photography ratio still used by many camera sensors today.

## Why matching a ratio matters when scaling

When you resize an image or a video frame without preserving its aspect ratio, the result looks visibly stretched or squashed — circles become ovals, faces widen or narrow unnaturally. The scale-to-new-width section of this calculator exists specifically to prevent that: by calculating the exact proportional height for any new width, it guarantees the resized version keeps exactly the same shape as the original, just larger or smaller. This is the same calculation that photo editors, video editors and web design tools perform automatically whenever you drag a corner handle while holding a "lock aspect ratio" option, and understanding the maths behind it helps when a tool does not offer that lock or when you need to compute the number yourself for a spec sheet or a piece of code.

## A worked example

Say a photo measures 4000 by 2250 pixels and you want to know its ratio and then resize it to a width of 1600 pixels for a website. First, the greatest common divisor of 4000 and 2250 is 250, so dividing both by 250 gives 16 and 9 — the photo is a 16:9 image, the same shape as a widescreen monitor. To scale it to a width of 1600, multiply the height by the same factor the width changed by: 1600 ÷ 4000 = 0.4, so the new height is 2250 × 0.4 = 900 pixels. The resized 1600×900 image keeps exactly the same 16:9 shape as the original, just smaller — precisely what the second section of this calculator works out for you instantly. This same trick works in reverse too: if you know a target height instead of a target width, dividing that height by the original height gives the same scaling factor, which you can then apply to the width to find the matching value, though this calculator is set up specifically for the width-first case since that is how most cropping and export tools ask for the number, and it is the far more common direction in everyday use.

## Private and instant

The calculation runs entirely in your browser using simple arithmetic, so results appear the instant you type and none of the dimensions you enter are ever sent to a server, logged or shared. It works offline once the page has loaded, ready whenever you need to check a resolution or plan a resize.
