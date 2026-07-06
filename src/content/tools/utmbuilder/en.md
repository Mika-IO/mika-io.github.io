## Build UTM-tagged URLs for accurate campaign tracking

UTM parameters are the standard way to tell analytics platforms like Google Analytics exactly where website traffic comes from. Without UTM tags, traffic from your email newsletter, your social media posts, and your paid ads all look the same in analytics — all classified as "direct" or lumped into generic referral categories. With UTM tags, you know precisely which campaign, which medium, and which source drove each visitor.

## What are UTM parameters?

UTM stands for Urchin Tracking Module. Urchin Software was a web analytics company acquired by Google in 2005, and its tracking module became the basis for Google Analytics. The UTM naming has stuck as the industry standard even though Urchin itself was discontinued.

UTM parameters are key-value pairs appended to a URL as a query string. For example:

https://example.com/sale?utm_source=newsletter&utm_medium=email&utm_campaign=summer_sale

When someone clicks this link and arrives on your website, Google Analytics (or any other analytics platform that supports UTM) records all three parameters alongside the visit data.

## The five UTM parameters

**utm_source** (required): Identifies where the traffic comes from. Examples: newsletter, facebook, google, linkedin, twitter, instagram, podcast.

**utm_medium** (required): Describes the marketing channel or mechanism. Examples: email, social, cpc (cost-per-click), organic, referral, banner, affiliate.

**utm_campaign** (required): Names the specific marketing campaign. Examples: summer_sale_2024, product_launch_v2, brand_awareness_q1.

**utm_term** (optional): Used primarily for paid search to identify the keyword that triggered the ad. Example: running+shoes, best+crm+software.

**utm_content** (optional): Used for A/B testing or to differentiate between multiple links in the same campaign. Examples: cta_button, hero_image, footer_link, version_a.

## Best practices for UTM naming

**Consistency is critical**: utm_source=Email and utm_source=email are treated as two different sources. Establish a naming convention and stick to it across your entire organization.

**Use lowercase**: Most teams use all-lowercase with underscores or hyphens. Avoid spaces (use + or %20 if necessary, but tools like this one handle encoding automatically).

**Be descriptive but concise**: utm_campaign=summer_sale_2024 tells you more than utm_campaign=campaign1.

**Do not use UTM on internal links**: UTM parameters reset the session in Google Analytics. Internal links with UTMs will incorrectly attribute traffic.

## Common campaign URL examples

Newsletter: utm_source=newsletter&utm_medium=email&utm_campaign=weekly_digest
Facebook ad: utm_source=facebook&utm_medium=cpc&utm_campaign=brand_awareness
LinkedIn post: utm_source=linkedin&utm_medium=social&utm_campaign=product_launch
QR code on a flyer: utm_source=print_flyer&utm_medium=qr_code&utm_campaign=event_2024

## How to use the builder

Enter your destination URL and fill in the source, medium and campaign fields, adding term and content if your campaign needs them, and the complete tagged URL appears immediately, correctly encoded and ready to copy into an email, an ad platform or a social post. Building it this way removes the two most common mistakes people make typing UTM links by hand: a typo in a parameter name that analytics silently fails to recognise, and inconsistent capitalisation that splits what should be one traffic source into several different-looking ones in a report.

## Why consistency matters more than the exact names you choose

Analytics platforms treat UTM values as literal strings rather than interpreting their meaning, so "Newsletter", "newsletter" and "news_letter" are recorded as three completely separate sources even though a human reading the report would recognise them as the same thing. This is the single most common way UTM tracking quietly breaks down inside larger marketing teams: everyone agrees on the concept but nobody enforces the exact spelling, and months later the analytics report is fragmented into a dozen near-duplicate rows that all mean the same campaign. Deciding on a naming convention before your first campaign, and having every team member build links through the same tool with the same values, prevents this far more reliably than trying to clean up the data after the fact.

## UTM tags and platform-native tracking

Some ad platforms, including Google Ads and Facebook Ads, offer their own automatic tagging systems (gclid, fbclid) that can duplicate or conflict with manually built UTM parameters if both are used carelessly on the same link. The general best practice is to let the platform's auto-tagging handle platform-specific attribution while using UTM parameters for the broader campaign-level story you want to see in Google Analytics — the source, medium and campaign name — since UTM parameters are the one tagging scheme virtually every analytics platform understands consistently, regardless of which ad network actually served the click.

## Auditing your UTM links before launch

Before a campaign goes live, it is worth testing every UTM-tagged link exactly as a recipient would encounter it: paste the full URL into a private browser window and confirm it lands on the intended page with the tags intact, since some content management systems and link shorteners silently strip query parameters during a redirect. A campaign that looks perfectly tagged in the builder but loses its UTM parameters somewhere in a redirect chain will report as "direct" traffic in analytics, silently erasing the exact attribution the tags were meant to provide.

## Keeping a shared naming reference

Larger teams benefit from keeping a simple shared reference document listing the exact approved values for utm_source and utm_medium — "email", not "Email" or "e-mail" — so that everyone building campaign links, regardless of which tool they use, produces UTM values that roll up cleanly into the same rows in an analytics report rather than fragmenting into near-duplicates over time.

## Private and instant

The URL is built entirely in your browser, so it appears instantly as you type and nothing you enter is ever sent to any server, logged or shared.

