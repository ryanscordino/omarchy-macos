# Design QA

## Source visual truth

- Selected visual target: `/Users/ryanscordino/.codex/generated_images/01a0534e-8cf0-75c0-9e83-f0fa9e3571a8/exec-49f80d86-b702-403c-9b1f-db67adf1a038.png`
- Source pixels: 1024 x 1536 PNG.
- The source is an editorial direction board rather than a fixed product screenshot. Its split hero, warm paper surface, serif display type, mono utility type, orange signal color, and dithered atlas were treated as the visual truth.

## Implementation evidence

- Desktop capture: `/private/tmp/omarchy-design-qa-desktop.png`
- Mobile capture: `/private/tmp/omarchy-design-qa-mobile.png`
- Desktop capture pixels and CSS viewport: 1280 x 720.
- Mobile capture pixels and CSS viewport: 390 x 844.
- Browser captures use one output pixel per CSS pixel; the browser tool does not expose a separate device-density value.
- State: homepage at the top, fonts loaded, mobile menu closed. A second mobile state was checked with the menu open and with Manifesto selected.
- Logo source: official `logo.svg` from the Omarchy repository's `quattro` branch, copied byte-for-byte to `/Users/ryanscordino/dev/omarchy-macos/public/images/omarchy-logo.svg`.

## Comparison evidence

Full view: the implementation carries the source direction into a responsive editorial homepage with a split hero, large serif title, mono navigation and body copy, hairline rules, warm off-white/charcoal/orange tokens, and a real dithered atlas image. The implementation intentionally replaces the concept-only `SYSTEM / 01` chip, machine-spec readout, and Mac-specific headline with verified Omarchy homepage copy and links from the current site.

Focused regions: the hero crop and typography were checked at desktop; the generated atlas was checked for crop, density, and integration; the official video-card imagery was checked at desktop and mobile; and the mobile menu was checked for visibility, close behavior, and section navigation.

The official logo was checked at 1280px and 390px widths. It renders as a compact image wordmark in the header, scales down without distortion on mobile, and remains visible while the mobile navigation opens.

## Required fidelity surfaces

- Fonts and typography: `Instrument Serif` supplies the display hierarchy and `IBM Plex Mono` supplies navigation, metadata, links, and body copy. The serif/mono contrast is preserved from the selected direction, with responsive wrapping checked at 390px.
- Spacing and layout: the desktop hero uses the selected split composition; later content uses an editorial grid with generous section spacing. The mobile layout collapses to a single column without clipped hero copy or inaccessible actions.
- Colors and tokens: the implementation uses warm paper, ink, muted gray, cool blue-gray, and signal orange tokens. There are no gradients or decorative CSS noise layers competing with the asset.
- Image quality and asset fidelity: the dithered atlas and all five official video thumbnails are real raster assets. No visible artwork is substituted with CSS art, inline SVG, placeholder shapes, or text glyphs. Lucide is used only for small interface icons.
- Copy and content: the visible homepage title, description, DHH attribution, latest news, official links, five official video titles, partner email, 37signals/Basecamp/HEY attribution, Cloudflare sponsorship, and pending-trademark note are represented. The latest official Plugins, Discord, article, and video destinations were checked against the live homepage.
- Accessibility: semantic headings, landmark regions, image alt text, labeled menu control, keyboard-reachable links, visible focus-compatible controls, and reduced-motion CSS are present.

## Findings

- No actionable P0, P1, or P2 findings remain.
- Intentional content deviations from the visual target are acceptable: concept-only system diagnostics and Mac-specific messaging were removed per the implementation brief, while the current official Omarchy content was restored.

## Comparison history

1. Initial desktop preview exposed the development-only TanStack floating control over the lower-right artwork. This was a P2 visual obstruction. The root shell was simplified to remove the development overlay, then the desktop and mobile captures were refreshed. The post-fix captures show no overlay.
2. A full-page browser stitch visually repeated sections while the DOM reported exactly one instance of each section. This was treated as a browser capture artifact, not an implementation finding; viewport captures were used for the final review.
3. The text-only navigation wordmark was replaced with the official Omarchy SVG. Desktop and mobile checks showed the intended visual scale, no clipping, and no change to the menu's open/close behavior.

## Implementation checklist

- [x] Desktop hero remains readable and the primary ISO action is visible.
- [x] Narrow mobile layout has a working menu and section navigation.
- [x] Official homepage content and visible destinations are represented.
- [x] Official video artwork is local and included in the page.
- [x] Official Omarchy logo is local and used in the header navigation.
- [x] Hover states and smooth section navigation do not block content.
- [x] Reduced-motion rules remove smooth scrolling and shorten transitions.
- [x] Preview console reported no warnings or errors during the final capture.
- [x] Focused format, lint, type, diff, and production build checks passed.

## Follow-up polish

- If the direction is approved, the next pass can replace the generated atlas with a final brand-owned illustration and refine the video section once the intended Omarchy media hierarchy is confirmed.

final result: passed
