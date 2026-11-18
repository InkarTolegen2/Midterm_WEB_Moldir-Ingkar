# Final Project Report — Lens & Light

**Course:** Web Technologies 1  
**Project:** Lens & Light — Photography Studio Website  
**Group Members:** Moldir Jarmukhambetova, Ingkar Tolegen

---

## 1. Project Topic and Objectives

Lens & Light is a photography studio website for a two-person team based in Astana. The project continues the same topic and the same group as the Endterm assignment, as required.

The objective of the final project was to extend the existing Endterm website with new interactive features while maintaining a consistent design and full responsiveness. The final website presents the studio's portfolio, services, team, and contact information, and adds theme switching, user registration and sign-in, a searchable FAQ, and live photo search via a public API.

---

## 2. Group Members and Individual Contributions

### Moldir
- **Theme toggle (light/dark):** implemented in `js/script.js` using `localStorage` and `classList`; added toggle button to the navigation bar on every page; wrote all dark-mode CSS in `css/style.css`.
- **FAQ page & Home page FAQ:** created `faq.html` with 5 questions and added a 3-question block to `index.html`; implemented the accordion using jQuery `.slideToggle(300)`; added the `+` / `−` visual indicator.
- **Registration validation:** implemented live client-side validation, RegEx email checking, password strength meter, and password confirmation in `register.html`.
- **Previously from Endterm:** image gallery lightbox.
- **Shared:** updated `README.md`, contributed to testing on the live GitHub Pages site.

### Ingkar
- **Sign-in page:** created `signin.html` with email/password validation; linked it to the `registeredUser` data saved by the registration form; saved the active session in `localStorage`; displayed a signed-in view with a sign-out button.
- **Openverse API integration:** created `gallery.html`; implemented `fetch()` to `https://api.openverse.org/v1/images/`; displayed image, title, creator, license, and original link dynamically; added search, refresh, and Enter-key support; implemented error handling in `.catch()`.
- **Previously from Endterm:** portfolio search and category filter, services CRUD table.
- **Shared:** updated `README.md`, contributed to testing on the live GitHub Pages site.

Both members reviewed each other's code and can explain every feature during the defense.

---

## 3. Website Structure

The final website contains nine pages, all connected through a single navigation bar visible on every page:

1. `index.html` — Home page with hero section, featured work, and a short FAQ.
2. `about.html` — About the team, gear, and statistics.
3. `portfolio.html` — Photo gallery with search, category filter, and lightbox.
4. `services.html` — Service packages table with add/edit/delete actions.
5. `contact.html` — Contact form for booking requests.
6. `register.html` — Registration form with live validation and password strength meter.
7. `signin.html` — Sign-in form linked to the registered account.
8. `gallery.html` — Openverse photo search page.
9. `faq.html` — Frequently asked questions with accordion.

Shared assets:
- `css/style.css` — all styling, including dark mode, FAQ, and API cards.
- `js/script.js` — all JavaScript and jQuery logic.
- `images/` — all photos used on the site.

---

## 4. Implemented Features

### 4.1 Light/Dark Theme Toggle (Moldir)
A toggle button is placed in the navigation bar of every page. Clicking it adds or removes the `dark-mode` class on `<body>`. The selected theme is stored in `localStorage` under the key `theme` (`"dark"` or `"light"`) and is re-applied on every page load. The dark theme is defined in `css/style.css` using CSS variable overrides, which keeps the change consistent across the whole website.

### 4.2 Registration and Sign-In with localStorage (Ingkar & Moldir)
**Registration (`register.html`):** The form validates the name (minimum 2 characters), the email (Regular Expression), the password strength (using a visual meter for weak/medium/strong), and ensures both password fields match. On success, the user object `{ name, email, password }` is saved in `localStorage` under the key `registeredUser`.

**Sign-In (`signin.html`):** The form takes an email and password. JavaScript checks if a `registeredUser` exists in `localStorage`. If it does, it compares the entered credentials with the saved ones. On a successful match, the session is saved in `localStorage` under the key `signedInUser`, and the form is replaced with a welcome message and a **Sign Out** button. Clicking **Sign Out** removes the `signedInUser` session but keeps the `registeredUser` account intact for future logins.

### 4.3 FAQ Accordion (Moldir)
`faq.html` contains five photography-related questions, and `index.html` contains a short version with three questions. Each answer is hidden by default. Clicking a question runs `$(this).next('.faq-answer').slideToggle(300)` for a smooth animation. The `+` icon changes to `−` when the answer is visible, based on the `:visible` check.

### 4.4 Openverse API Integration (Ingkar)
`gallery.html` uses the public Openverse Image Search API at `https://api.openverse.org/v1/images/`. On page load, it automatically fetches results for the query `"photography"`. The user can type a new query and press **Search** or Enter, or click **Refresh**. The `fetch()` response is parsed as JSON and each result is rendered dynamically with its image, title, creator, license, and a link to the original page. Error handling is implemented by checking `res.ok`, using a `.catch()` block, and an `onerror` fallback for images that cannot load due to CORS.

### 4.5 Additional Features from Endterm
- Portfolio image gallery with a lightbox and keyboard navigation (Moldir).
- Portfolio search and category filter (Ingkar).
- Services table with full CRUD operations using a Bootstrap modal (Ingkar).

---

## 5. Development Process

1. The project continued in the existing Endterm repository, preserving the same group and topic.
2. Ingkar created the sign-in page and Openverse API page, added the JavaScript logic, and updated the navigation across the site.
3. Moldir pulled the changes, created the FAQ page, added the short FAQ block to the home page, implemented the theme toggle, and updated the CSS.
4. Both members linked the registration and sign-in forms using `localStorage` so they function as a complete authentication system.
5. Both members tested every page on the deployed GitHub Pages URL, including API error states and form validations.
6. Both members submitted the deployed URL and the repository URL individually to LMS.

---

## 6. AI Usage Acknowledgment

AI tools (Claude) were used as supporting tools during the project for:
- Reviewing code and suggesting debugging steps
- Structuring the README and this report
- Guidance on CSS refinements

All code was written, tested, and integrated by the group members. AI was not used to generate the project from scratch. A short AI-usage statement is also displayed in the footer of every page.

---

## 7. Links

- **Deployed website:** `https://inkartolegen2.github.io/Midterm_WEB_Moldir-Ingkar/`
- **GitHub repository:** `https://github.com/InkarTolegen2/Midterm_WEB_Moldir-Ingkar.git`

---

## 8. Screenshots

All screenshots are stored in [`docs/screenshots/`](docs/screenshots/).

1. [Home page (light theme)](docscreenshots/1-home-light.png)
2. [Home page (dark theme)](docscreenshots/2-home-dark.png)
3. [FAQ page with an answer open](docscreenshots/3-faq-open.png)
4. [Registration form with validations](docscreenshots/4-register-validation.png)
5. [Sign-in form](docscreenshots/5-signin.png)
6. [Signed-in view after sign-in](docscreenshots/6-signed-in.png)
7. [Gallery page with API results](docscreenshots/7-gallery-api.png)
8. [Gallery page with "No images found" message](docscreenshots/8-gallery-not-found.png)