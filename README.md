# Raport Generator V2

A portfolio frontend project for generating school exam reports.

It is practical project used in work environment to make it easier for
teachers to complete documents in their work.

👉 **Live Demo (GitHub Pages):**  
https://rapgen2.mikeldev.online/

---

## About the Project

**Raport Generator V2** is the second, refactored version of a web application created to generate reports for mock high school graduation exams (Matura).

This project was built as a **portfolio case study** focused on:

- frontend architecture refactoring,
- modular JavaScript organization,
- form handling and report generation workflow,
- PDF export,
- UI improvements over the original V1 version.

The current public version is presented as a **frontend portfolio demo**.

---

## Portfolio Context

This project was also used as a learning space for **Supabase integration**.

Authentication, account handling, and online report saving were implemented during development, but in the **public portfolio version those backend-related features are intentionally disconnected and commented out**.

Reason:

- the project is kept online as a lightweight frontend demo,
- the Supabase layer is not maintained for this deployed version,
- the backend code remains in the repository as part of the learning and architectural process.

Because of that, the currently exposed demo should be treated as a **portfolio presentation of the application structure and core report workflow**, not as a production SaaS deployment.

---

## What Works in the Demo

- report generation from form data,
- editable students table,
- automatic score calculations,
- report analysis sections,
- PDF export,
- responsive frontend layout.

The core report workflow works independently from the disconnected backend layer.

---

## Supabase Scope

The repository still contains code related to:

- Supabase client configuration,
- authentication flow,
- registration and login UI,
- online report saving/loading.

Those parts are currently **not active in the deployed version** and are kept only as documentation of the broader development scope of the project.

---

## Project Goals (V2)

- improve code structure compared to V1,
- separate UI, logic, and feature modules more clearly,
- create a cleaner and more maintainable frontend codebase,
- keep the app simple and practical for non-technical end users,
- present refactoring progress in a portfolio-ready form.

---

## Why Version 2?

### Version 1

- intentionally simple UI,
- designed around practical usage,
- focused mostly on getting the workflow done.

### Version 2

- cleaner structure,
- modular JavaScript code,
- improved interface,
- better separation of concerns,
- expanded project scope during development.

---

## Tech Stack

- HTML5
- SCSS
- JavaScript (ES modules)
- Vite
- html2pdf.js
- Supabase integration layer (currently disconnected in public demo)

---

## Previous Version (V1)

👉 **V1 Demo (GitHub Pages):**  
https://mikel538.github.io/raportGenerator/

👉 **V1 Repository:**  
https://github.com/MikeL538/raportGenerator

Version 1 shows the earlier stage of the same reporting idea and provides useful comparison for the refactor done in V2.

---

## Project Status

✅ Portfolio project completed  
✅ Public frontend demo available  
✅ Supabase-related code preserved as part of the learning process  
🛠 Backend-connected features intentionally disabled in deployed version
