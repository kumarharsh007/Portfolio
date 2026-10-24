# Harsh Swami — Product Analyst Portfolio

A responsive, game-inspired portfolio for showcasing Harsh Swami’s product analytics work at Electronic Arts. The visual direction takes high-level cues from cinematic western game menus—frontier landscapes, chapter markers, a compass-like quick-navigation wheel, warm paper, dark wood, and brass details—while keeping the work and professional story easy to scan.

The design is original and does not use third-party game logos or artwork. Interactions are intentionally light: chapter links, a responsive navigation menu, and accessible project case-file dialogs. The site respects reduced-motion preferences and works without a build step.

## Portfolio sections

- **Introduction:** Role, focus, resume, and quick chapter navigation.
- **About:** Product analytics approach and player-first perspective.
- **Experience:** Work at Electronic Arts across Real Racing 3, NBA Live Mobile, Madden Mobile, and College Football Mobile; plus Netcracker Technology and Azentio.
- **Skills:** Analytics tools, player and product analytics, and AI-augmented data workflows.
- **Selected work:** Project summaries, GitHub link, and case-file dialogs.
- **Gameography:** Contributions to Real Racing 3, NBA Live Mobile, Madden Mobile, and College Football Mobile.
- **Contact:** Email, LinkedIn, GitHub, and contact form.

## Run locally

This is a static site; there are no package dependencies or build commands. Open `index.html` in a browser, or serve the `Portfolio` folder with any local static-file server.

The resume is linked at `assets/HARSH_SWAMI_Resume.pdf`. Keep the file at that path when deploying.

## Contact form

The contact form uses EmailJS. Its public key, service ID, and template ID are configured in `script.js`. Update those values if you connect the portfolio to a different EmailJS account. If EmailJS does not load, the form reports that the service is unavailable and provides the direct email link.

## Deploy

The folder can be deployed to GitHub Pages or another static host. Publish the complete `Portfolio` directory so the stylesheet, script, favicon, and assets remain alongside `index.html`.
