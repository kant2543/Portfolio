# Kant Lersphuksakit — Portfolio

Personal portfolio site: operations strategy, data & analytics, and internal automation tools.

**Live:** https://kant2543.github.io/portfolio/

## Structure

```
index.html        page layout & static content (About, Skills, Experience, Contact)
css/style.css     all styles
js/data.js        ← edit here: experience popup slides + "Tools I've Built" cards
js/main.js        behaviour (nav, animations, modal, contact)
assets/
  profile.jpg     profile photo
  img/            gallery images used in js/data.js
.nojekyll         tells GitHub Pages to serve files as-is
```

## Update content

- **Add a project:** add an object to `window.PROJECTS` in `js/data.js`.
- **Add a photo to an experience popup:** put the image in `assets/img/` and set `img: 'assets/img/your-file.jpg'` on the slide (`img: null` shows a placeholder).
- **Change experience bullets / stats:** edit `index.html` directly.

## Deploy (GitHub Pages)

1. Push these files to the root of the `main` branch.
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save.
3. The site goes live at `https://<username>.github.io/<repo>/` within a minute or two.

No build step — plain HTML, CSS and JavaScript.
