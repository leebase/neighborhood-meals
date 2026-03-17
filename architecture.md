# neighborhood-meals Architecture

> **Technical decisions and structural notes** for the app itself.
>
> For product constraints, see `product-definition.md`. For sprint sequencing, see `sprint-plan.md`.

---

## 2026-03-17 — Minimal full-stack baseline

**Decision:** The canonical runnable app is split into a Flask backend under `backend/` and a React/Vite frontend under `frontend/`, with the repo root reserved for project docs, lightweight tooling metadata, and book-facing artifacts.

**Rationale:** This matches the product definition and keeps the actual teaching app shape explicit. The root of the repo should not pretend to be the app runtime; the real entrypoints are `backend/app.py` and the frontend `npm` scripts.

**Alternatives rejected:** Keeping the init scaffold's root-level Python package as the primary app shape. That would blur the line between the book/project metadata and the real runnable stack.

**Consequences:** Agents and readers should treat `backend/` and `frontend/` as the application source of truth. Root-level metadata can still exist for repo tooling, but it should not contradict the backend/frontend runtime contract.

## 2026-03-17 — Intentional friction belongs in setup, not app logic

**Decision:** The repo preserves intentional failures on `main` through environment and workflow conditions such as missing committed virtualenvs, missing `node_modules`, strict runtime version requirements, and Git/worktree state, while keeping the application logic itself correct.

**Rationale:** The book teaches debugging and environment setup. Those lessons are clearer and more defensible when the app itself works after proper setup rather than containing arbitrary broken logic.

**Alternatives rejected:** Encoding teaching failures directly into backend or frontend behavior. That would make the app harder to test and undermine the value of `reference-working` as a trustworthy baseline.

**Consequences:** Code reviews and implementation work should distinguish between accidental repo defects and intentional teaching artifacts. The `reference-working` branch should remain a runnable confirmation of the real app behavior.
