# GitHub project investigation

Audit scope: only the five repositories named in the project brief. Repository pages, READMEs (where present), folder trees, manifests, and representative application source were checked on 2026-11-16. No live deployment was verified.

## Summary and ranking

Ranked for a portfolio that should reflect both demonstrable engineering and what can reasonably be attributed to the account owner:

1. **Python Mini Project — Video Censorship Studio**: the clearest owner-held, end-to-end processing prototype, with an important distinction between the running UI's keyword matching and the separate classifier helper.
2. **LastZENZONE — ZenZone**: broad Next.js prototype with a real Gemini chat endpoint and MongoDB community API. It is a fork; the fork-specific commits are modest and limited to sleep-aid hydration/state, dashboard presentation/logic, and metadata.
3. **Excel Analytics Platform**: broad full-stack workflow (Excel uploads, user/admin routes, MongoDB, and Gemini summaries), but the repository is a fork with zero commits ahead of its source at the time checked. Do not present the upstream implementation as solely yours.
4. **Blog Application**: a styled React interface prototype. Publishing and the post list are not connected to persistence or an API.
5. **OnlyDevs**: excluded from technical ranking because the supplied repository URL returned GitHub 404 and no source could be verified.

This order weighs attribution and completeness as well as feature breadth. The portfolio still lists all five supplied projects, but the inaccessible item is explicitly marked unverified rather than given an invented description.

## 1. Python Mini Project

- **Repository:** [rit3sh19/mini-project](https://github.com/rit3sh19/mini-project)
- **Inferred title:** Video Censorship Studio
- **What it does / problem:** A Streamlit utility for choosing or uploading a video, extracting its audio, transcribing it, and generating a beep-censored audio track for selected profanity. It explores automating a task normally done by manually editing audio.
- **Verified features:** The UI accepts MP4/MOV/MKV files and offers preloaded-video and upload flows. `app.py` calls helpers in `censor_logic.py` to extract audio, transcribe with word timestamps, find matches from a fixed list of terms, and replace those time spans with generated tones. It presents original and censored audio in the app.
- **Technologies:** Python, Streamlit, OpenAI Whisper Python package (local `base` model), MoviePy, PyDub, and Hugging Face Transformers. There is no `requirements.txt` or `pyproject.toml` in the repository tree.
- **Frontend architecture:** Single-file Streamlit UI in `app.py`; no separate browser frontend.
- **Backend architecture:** No network backend. Processing functions live in `censor_logic.py` and run in the same process.
- **Data/API integrations:** No database or application API. Whisper is loaded locally. The standalone helper's `main()` constructs a Hugging Face `unitary/toxic-bert` pipeline; the Streamlit UI does not call that classifier and instead uses a hard-coded profanity list.
- **Interesting implementation:** Whisper word timestamps are converted to millisecond ranges; `censor_audio` processes those ranges in reverse order and overlays a generated sine tone with PyDub.
- **Likely contribution:** The repository is a non-fork under the account, and the UI footer credits “Ritesh and Deepthi.” The commit history shows the owner account created/updated the project, but does not establish how work was divided between collaborators.
- **Completeness and limitations:** A useful demonstration, not a finished production tool. The current UI censors audio rather than muxing the censored track back into the video. Toxic-BERT classification exists in a separate command-line path, not the UI flow. The README describes a profanity audio system and mentions dependencies that are not supplied as a dependency manifest; the code actually wraps video input.
- **Portfolio verdict:** Yes, as a clearly labeled prototype. Its media-processing path is the most distinctive directly attributable implementation among the accessible owner-held repositories.
- **Portfolio description:** “A Streamlit prototype that extracts a clip’s audio, transcribes word-level timestamps with Whisper, and replaces selected profanity windows with beep tones. The app currently uses a fixed word list; a separate helper contains an optional Toxic-BERT path.”
- **Evidence level:** Runtime behavior above is verified from `app.py` and `censor_logic.py`. The intended use is a reasonable inference from the UI and README. Model quality, classification accuracy, and real-world results are unverified.

## 2. LastZENZONE

- **Repository:** [rit3sh19/lastZENZONE](https://github.com/rit3sh19/lastZENZONE)
- **Inferred title:** ZenZone — mood and wellbeing companion
- **What it does / problem:** A web prototype that groups mood check-ins, journaling, CBT-style thought records, sleep aids, a community feed, and an AI chat into one wellness-oriented interface.
- **Verified features:** Next.js App Router pages implement mood and journal entry forms, client-side dashboards, sleep and CBT tools, and a therapist/appointment interface. Several tools save to browser `localStorage`. The chat API calls Google Gemini (`gemini-2.0-flash`); the community route reads/writes MongoDB posts. Auth routes also use MongoDB. The sentiment endpoint uses word/phrase checks and returns a heuristic label, not a trained sentiment model. Crisis keyword matching returns resources and an incident-shaped response; the code says it does not persist or notify professionals. Appointment data is local-only and therapist entries are static.
- **Technologies:** TypeScript, React, Next.js 15, Tailwind CSS, shadcn/Radix UI components, MongoDB Node driver, and Google Generative AI SDK.
- **Frontend architecture:** Next.js App Router pages in `app/`, shared UI in `components/`, and Tailwind utility styling.
- **Backend architecture:** Next.js route handlers under `app/api/` for auth, chat, sentiment, community, and crisis-alert behavior; no separate server service.
- **Data/API integrations:** MongoDB for user and community data; Gemini for chat; browser `localStorage` for mood, journal, CBT, sleep, and appointment state. No external telehealth booking integration was found.
- **Interesting implementation:** The Gemini endpoint checks the last user message for a list of crisis phrases and returns support information alongside the model response. Mood/dashboard calculations are client-side. Three commits authored by `rit3sh19` are ahead of the upstream branch; the visible fork-specific changes include a client-mount/local-storage adjustment for sleep-aid state, dashboard edits, and metadata configuration.
- **Likely contribution:** This is a fork of `ranjanvivesh/lastZENZONE`. The fork has three owner-attributed commits, but most application features are inherited. The specific owner-side edits are verifiable; broader authorship is not.
- **Completeness and limitations:** A feature-rich prototype, not a clinical or production service. Several screens are local-only or static, sentiment/crisis checks are simple keyword rules, and the README contains only the project name. The source includes a hard-coded MongoDB credential; its value is intentionally omitted here. Treat it as exposed, rotate it, and move secrets to environment configuration. A Render configuration exists, but a working deployment was not verified.
- **Portfolio verdict:** Yes, with an explicit fork/extension note and no claim that the full inherited app was authored by the account owner.
- **Portfolio description:** “A Next.js wellbeing prototype combining mood and journal tracking, self-guided tools, community routes, and a Gemini-backed chat flow. My fork’s visible changes focus on client-side sleep-aid state and dashboard/hydration adjustments; sentiment labels and crisis flags are keyword-based.”
- **Evidence level:** Features and implementation details above are verified in the listed routes/pages. The project’s effectiveness as a mental-health product and any deployment status are unverified.

## 3. Excel_Analytics_Plateform

- **Repository:** [rit3sh19/Excel_Analytics_Plateform](https://github.com/rit3sh19/Excel_Analytics_Plateform)
- **Inferred title:** Excel Analytics Platform
- **What it does / problem:** A web app for uploading spreadsheets, previewing/tabulating their contents, plotting selected columns, and requesting a short natural-language summary. It aims to make basic spreadsheet exploration more accessible.
- **Verified features:** The React upload page reads the first worksheet in the browser, lets the user choose columns and render bar/pie/line/doughnut/scatter charts, and includes PNG/PDF export logic. The backend accepts `.xls`/`.xlsx`, parses the first sheet with `xlsx`, stores upload metadata, and exposes user history/data/download/delete routes. A Gemini endpoint sends up to the first ten rows to `gemini-1.5-flash` with a prompt framed around real-estate trends. Auth and admin routes exist for user/file management and aggregation-based summaries.
- **Technologies:** JavaScript, React 18, Create React App, Express 5, MongoDB/Mongoose, JWT, bcryptjs, Multer, SheetJS (`xlsx`), Chart.js/react-chartjs-2, Recharts, Axios, Google Generative AI SDK, html2canvas, and jsPDF.
- **Frontend architecture:** React single-page app with React Router routes, an auth context, reusable sidebar, API helper, and page components for upload/history/insights/admin/profile/settings.
- **Backend architecture:** Express API with separate route, controller, model, middleware, and connection modules. Uploaded files are stored on local disk.
- **Data/API integrations:** MongoDB Atlas via Mongoose; Gemini API for generated summaries; local filesystem for uploaded workbook and profile-image files. No live deployment was confirmed.
- **Interesting implementation:** Spreadsheet parsing happens in both the browser (for interactive chart/table previews) and server (for stored upload data and summaries). JWT-protected routes attach uploads to users; admin-only routes aggregate uploads/users/insight records. Gemini is given only a small sample of parsed rows.
- **Likely contribution:** This repository is a fork of `mffgbdojvfw/Excel_Analytics_Plateform`. At the time checked, the owner branch was 28 commits behind and zero commits ahead of its source; the visible commits are authored by the upstream account. Do not describe the inherited feature set as your solo implementation without other contribution evidence.
- **Completeness and limitations:** The code tree is substantial, but the repository has no root README; the nested frontend README is unmodified Create React App boilerplate. The API client points to a local address and the backend defaults to another port unless configured, so a ready-to-run integration is not established by source alone. A tracked `backend/.env` file exists; its contents were not read, so secret exposure status is unverified. The backend startup source also logs the Gemini key variable; remove that behavior and rotate any published keys. No tests are specified in the backend manifest.
- **Portfolio verdict:** Include as an inherited full-stack codebase only with the fork attribution visible. It demonstrates the app's architecture and integration scope, but not verified personal ownership of the implementation.
- **Portfolio description:** “A full-stack spreadsheet exploration app with workbook upload/history, column-based charts, export controls, role-protected APIs, and a Gemini summary endpoint. This public repository is a fork with no owner-only commits ahead of upstream at audit time, so the existing implementation should be credited accordingly.”
- **Evidence level:** Code paths, package manifests, and fork comparison are verified. Whether the app was run end-to-end against a live database or Gemini key is unverified.

## 4. Blog Application

- **Repository:** [rit3sh19/blog-app](https://github.com/rit3sh19/blog-app)
- **Inferred title:** Blog Application UI
- **What it does / problem:** A frontend concept for a blogging product, with routes for a home page, blog list, post composition, and profile.
- **Verified features:** `Newblog.js` provides a ReactQuill editor and title input, but its Publish handler only logs the values. `AllBlogs.js` renders four hard-coded cards with title-only filtering. The home page and profile use static copy/data; there is no persistence or API integration.
- **Technologies:** JavaScript, React 18, Create React App, React Router, ReactQuill, Tailwind CSS CLI, Framer Motion, and Lucide icons.
- **Frontend architecture:** Client-rendered React SPA with four routes and page-local state.
- **Backend architecture:** None found.
- **Data/API integrations:** None found. Blog cards and profile text are embedded in frontend source.
- **Interesting implementation:** Rich-text authoring controls and animated page/card interactions are present, but publishing is not wired to a data layer.
- **Likely contribution:** The repository is non-forked and includes the UI code, but the audit cannot establish individual authorship for every part of the implementation.
- **Completeness and limitations:** A visual prototype rather than a working blogging service. No save/publish flow, backend, auth, or durable post list is implemented. The README is the stock Create React App guide rather than project documentation.
- **Portfolio verdict:** Include as a smaller frontend/UI project, clearly marked as a prototype. It is less compelling than the processing and full-stack examples.
- **Portfolio description:** “A React blogging interface prototype with a rich-text compose screen, static post discovery, and profile/home pages. The editor and browsing UI are present; publishing and post persistence remain unimplemented.”
- **Evidence level:** These behaviors are verified from `App.js`, page components, and `package.json`. Future plans are not inferred.

## 5. OnlyDevs

- **Repository:** [rit3sh19/onlydevs-frontend](https://github.com/rit3sh19/onlydevs-frontend)
- **Inferred title / purpose:** Not established.
- **Access result:** The supplied GitHub URL returned HTTP 404 during the audit. No README, tree, manifest, or source was accessible.
- **Technologies, architecture, features, APIs, database:** Unverified; none are claimed.
- **Likely contribution:** Unverified.
- **Completeness and limitations:** Repository may be private, renamed, deleted, or otherwise unavailable; the 404 response alone does not distinguish these cases.
- **Portfolio verdict:** Retain as a clearly marked, unverified entry because it is one of the five supplied sources, but do not showcase functionality until an accessible repository URL is provided.
- **Portfolio description:** “Repository unavailable during review; implementation details and technology stack could not be verified.”
- **Evidence level:** Only the inaccessible URL and HTTP 404 are verified. All project claims remain unverified.

## Deployment and claims policy

No working live demo was verified for any of the five repositories. Accordingly, the curated project data has no live-demo URLs. Repository metadata, deployment configuration files, README statements, or local development instructions are not proof of a functioning public deployment.
