# Lens & Light — Photography Portfolio

A multi-page responsive website for a fictional photography studio.

Built by Moldir & Ingkar for the Midterm, Endterm, and Final Projects.

---

## Link

- **Deployed Website:** https://inkartolegen2.github.io/Term_WEB1/

---

## Topic

Photography portfolio -  a website for a small studio that shoots weddings, portraits, and events. The idea was to keep it simple, clean,  and focused on the photos themselves.

---

## Group Members

- Ingkar - Tolegen Ingkar
- Moldir - Jarmukhambetova Moldir

---

## Short Description
Lens & Light  is a multi-page portfolio website for a photography duo based in Astana.  The site shows who we are, what we shoot, our pricing,  and gives visitors an easy way to book a session. 

Throughout the semester,  we added interactivity: real-time form validation, dynamic search and filtering, a CRUD package manager, an image lightbox gallery, user authentication (registration and sign-in),  light/dark theme switching, an FAQ accordion, and a live photo search using a public API.

---

## Features Implemented

### Midterm
- 5 connected pages: Home, About, Portfolio, Services, Contact
- Navigation bar visible on all pages (Flexbox)
- Photo gallery using CSS Grid with hover zoom + captions
- Pricing table with striped rows
- Booking form with HTML5 validation
- Sticky header
- Hero section with overlay
- Fully responsive (768px and 480px breakpoints)
- Bootstrap grid + utilities

### Endterm

- Registration page with real-time client-side validation  (required fields, RegEx email, password strength meter, confirm-password match)
- Real-time search and category filter on the Portfolio page
- CRUD package manager on the Services page  (Add / Edit / Delete via Bootstrap modal)
- Image lightbox on Portfolio with prev/next arrows, fade transitions, and keyboard navigation
- New folder: `/js/script.js` for all JavaScript

### Final Project

- **Authentication System (Ingkar & Moldir):** Registration form saves the user account to `localStorage`. The Sign-In page validates the email and password against the saved account and maintains the session.
- **Openverse API Integration (Ingkar):** Photo search page using `fetch()` to retrieve and display openly-licensed images with error handling.
- **Light/Dark Theme (Moldir):** Global toggle in the navigation bar that saves the user's preference in `localStorage`.
- **FAQ Accordion (Moldir):** Dedicated FAQ page and a short FAQ block on the home page using jQuery `.slideToggle()` with `+ / -` indicators.

---

## Technologies Used

- HTML5 - semantic structure
- CSS3 - Flexbox, Grid, positioning, variables, pseudo-classes
- Bootstrap 5 - grid, utilities, modal component
- jQuery 3.7 - DOM manipulation, event handling, animations (`.slideToggle`, `.fadeIn`)
- Fetch API - Openverse Image Search API
- GitHub Pages - for publishing

---

## Individual Contributions

### Moldir

Midterm:
- Built `index.html` and `portfolio.html`
- Designed the photo gallery (Grid layout + hover effects)
- Styled the hero section and navigation bar
- Set up the color palette in `:root` variables

Endterm:
- Created `js/script.js` and added jQuery to all pages
- Built `register.html` and all form validation logic
- Password strength indicator (weak / medium / strong)
- Lightbox gallery on `portfolio.html` with fade effects and keyboard nav

Final Project:
- Created `faq.html` and added the FAQ block to `index.html`
- Wrote the jQuery accordion logic and CSS styles
- Implemented the Light/Dark theme toggle, saving to `localStorage`
- Wrote the dark-mode CSS variables and component overrides

### Ingkar

Midterm:
- Built `about.html`, `services.html`, and `contact.html`
- Created the pricing table and the booking form
- Handled all media queries (tablet + mobile)
- Wrote the README and handled GitHub Pages publishing

Endterm:
- Real-time search bar and category filter buttons on Portfolio
- Full CRUD package manager on Services (modal-based add/edit, delete with confirmation)
- Styled search, filter, and CRUD controls

Final Project:
- Built `signin.html` and linked it to the registration system
- Implemented session management using `localStorage` (`registeredUser` and `signedInUser`)
- Built `gallery.html` and integrated the Openverse API using `fetch()`
- Implemented API search, refresh, error handling, and image fallbacks

### Shared
- Layout structure, footer, and overall design decisions
- Testing on different screen sizes
- Debugging and final polish
- AI usage acknowledgment placed in the footer of all pages

---

## AI Usage Acknowledgment
AI tools (Claude) were used as a supporting tool for code review, debugging guidance, and drafting the README/Report structure. All code was written, tested, and integrated by the group members. A short AI-acknowledgment is also displayed in the footer of every page.