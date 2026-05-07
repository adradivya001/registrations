# SDLC Daily Report: JanmaSethu Registration Portal

**Date:** May 6, 2026
**Project:** JanmaSethu Fertility Grant Program — Application 2025
**Repository:** adradivya001/registrations

---

## 1. What Was Accomplished Today
Today focused on the rapid end-to-end deployment of the JanmaSethu web presence and application portal. The key milestones achieved include:

* **Frontend Architecture:** Migrated a custom-designed HTML/CSS landing page into a modern **React (Vite)** application (`App.tsx`). Implemented state management for navigation scroll effects and interactive FAQ accordions.
* **Database Design:** Created a robust PostgreSQL schema in **Supabase** (`applications` table) with strict data validation (Enums, Check constraints) to handle 17 different data points.
* **Custom Form Integration:** Built a custom React modal (`RegistrationForm.tsx`) to replace the standard Google Form. This form successfully collects applicant details, handles PDF/Image uploads, and inserts data directly into the database.
* **Image Processing:** Programmatically removed the white background from the brand logo (`janmasethu.png`) using a custom Node.js script, allowing it to blend seamlessly into the premium dark-green theme.
* **Version Control:** Initialized a local Git repository, configured `.gitignore` to protect sensitive environment variables, and successfully pushed the production-ready code to GitHub.

---

## 2. What Went Well
* **Agile Pivoting:** When the automated Google Form creation failed, we seamlessly pivoted to building a custom React form backed by Supabase. This ultimately resulted in a much more professional, seamless user experience that keeps applicants on your website.
* **UI/UX Implementation:** The vanilla CSS translated perfectly into the React ecosystem. The animations, responsive grid layouts, and modal overlay give the site a highly premium, trustworthy feel.
* **Security & Configuration:** Safely transitioned environment variables to follow Vite's strict `VITE_` prefix requirements and successfully kept secrets out of version control before pushing to GitHub.

---

## 3. What Did Not Go Well (Challenges & Resolutions)
* **Google Form 503 Errors:** The initial attempt to automate the creation of the 5-section Google Form was blocked by persistent server capacity errors from Google. **Resolution:** Bypassed Google Forms entirely in favor of a superior Supabase integration.
* **Image Background Removal Environment Issues:** The first attempt to remove the logo's white background using a Python (`Pillow`) script failed due to environment path issues on Windows. **Resolution:** Pivoted to a Node.js solution using the `jimp` library.
* **Jimp Library Versioning:** The latest version of `jimp` had breaking API changes that caused the script to fail. **Resolution:** Quickly downgraded to a stable version (`v0.22.12`), which successfully processed the transparent image.
* **Blank Page Error:** A minor typo in the `.env` file (`VITE_SUPABASE_ANOYN_KEY` instead of `ANON`) and an incorrect URL suffix caused a brief application crash. **Resolution:** Identified the typo via DevTools, corrected the `.env` file, and restarted the server.

---

## 4. Tools & Technologies Used
* **React 18 & Vite:** The core frontend framework and build tool, chosen for its lightning-fast Hot Module Replacement (HMR) and optimized production builds.
* **Supabase (PostgreSQL & Storage):** Used as the Backend-as-a-Service (BaaS). Replaced the need for a custom Node.js backend. Handled both structured application data and binary file uploads (fertility reports).
* **@supabase/supabase-js:** The official JavaScript client library used to connect the React frontend to the Supabase backend.
* **Node.js & Jimp (v0.22.12):** Utilized for server-side image processing to manipulate raw pixel data, converting the white background of the logo to alpha transparency.
* **Vanilla CSS:** Used extensively for all styling, completely bypassing utility frameworks like Tailwind to maintain exact control over the custom design tokens (fonts, colors, spacing).
* **Tabler Icons:** An open-source icon library used via CDN for lightweight, crisp SVG iconography across the site.
* **Git & GitHub:** Used for local version control, staging (`.gitignore`), and remote code hosting (`adradivya001/registrations`).
