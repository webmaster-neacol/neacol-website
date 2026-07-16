# NEACOL – Local Site Copy
A locally-editable clone of neacol.org.

## File Structure
```
neacol/
├── index.html            ← Home page (open this in your browser)
├── css/
│   └── style.css         ← ALL styling – edit once, applies everywhere
├── js/
│   └── components.js     ← Shared nav & footer – edit once, applies everywhere
└── pages/
    ├── who-we-are.html
    ├── core-values.html
    ├── areas-of-work.html
    ├── our-projects.html
    ├── our-team.html
    ├── volunteer.html
    ├── membership.html
    ├── donate.html
    ├── news-events.html
    ├── financials.html
    ├── neacol-youth.html
    ├── sponsorship.html
    ├── our-supporters.html
    ├── call-for-proposals.html
    ├── board-roles.html
    ├── executive-roles.html
    ├── committees.html
    ├── blog.html
    ├── shop.html
    └── privacy-policy.html
```

## How to Use

### Open locally
Just open `index.html` in any web browser. No server needed.

### Edit content
- **Any page**: Open the `.html` file in a text editor (VS Code, Sublime, etc.) and edit the HTML between the `<main>` tags.
- **Navigation**: Edit `js/components.js` → `navHTML` variable — changes apply to every page.
- **Footer**: Edit `js/components.js` → `footerHTML` variable — changes apply to every page.
- **Colors / fonts**: Edit `css/style.css` → the `:root { }` block at the top.

### Images
All images point to the live `https://neacol.org/wp-content/uploads/` CDN — no images need to be downloaded. Replace any `src="https://neacol.org/..."` with a local path if you want fully offline operation.

### Stub pages
Pages marked *stub* contain placeholder content. Replace the content between `<main>…</main>` with real copy.

### Payment / Forms
The donate and membership forms have placeholder buttons. Connect a payment processor (Stripe, PayPal, etc.) or embed a third-party form (Typeform, Gravity Forms, etc.) in place of the placeholder buttons.

### Deploy
Upload the entire `neacol/` folder to any web host (Netlify, GitHub Pages, WP hosting, etc.) and it will work without a CMS.

## Brand Colors (CSS variables)
| Variable       | Value     | Use                   |
|----------------|-----------|-----------------------|
| `--gold`       | `#f5a623` | Primary accent        |
| `--navy`       | `#1b2a6b` | Headings, dark areas  |
| `--navy-dark`  | `#111c4e` | Footer background     |
| `--gold-light` | `#fdf3dc` | Highlight backgrounds |

## External Scripts Retained
- **Google Tag Manager** (GTM-PZWN5DZD) – kept in `index.html` for analytics parity
- **Google Fonts** – Open Sans loaded from fonts.googleapis.com on every page

## Notes
- The site is a static HTML duplicate built from neacol.org content.
- Dynamic features (WooCommerce shop, WordPress blog, contact forms) are stubs — connect your preferred service.
- Google Tag Manager is included for analytics continuity; remove if not needed.
