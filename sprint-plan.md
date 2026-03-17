# neighborhood-meals Sprint Plan

> **Project-wide execution plan** for the full app lifecycle.
>
> This file tracks sprint-level sequencing across the entire project. For long-term rationale, see `project-plan.md`. For current session state, see `context.md`.

---

## Plan Overview

| Sprint | Focus | Status | Exit Condition |
|--------|-------|--------|----------------|
| Sprint 1 — Foundation | Build the smallest working end-to-end app | ✅ Complete | Backend and frontend both run locally and the happy path works |
| Sprint 2 — Reference Baseline | Lock down the known-good runnable state | 🟡 In progress | `reference-working` exists and is verified as the demo baseline |
| Sprint 3 — Book Workflow Support | Add the branch/worktree artifacts used by the book | ⬜ Planned | `feat/theme-switcher` workflow is reproducible |
| Sprint 4 — Failure Validation | Verify intentional friction on `main` without breaking core logic | ⬜ Planned | Canonical setup failures and recoveries are confirmed |
| Sprint 5 — Release Readiness | Final docs and project consistency pass | ⬜ Planned | Reader-facing docs, handoff docs, and verification records are aligned |

---

## Sprint 1 — Foundation

**Status**: COMPLETE  
**Goal**: Establish the smallest real Flask + React/Vite app that matches the product definition.

### Scope

- Create the backend structure under `backend/`
- Implement the canonical in-memory Flask API
- Create the frontend structure under `frontend/`
- Implement the minimal one-page React UI
- Verify the happy path locally

### Tasks

| ID | Status | Task | Notes |
|----|--------|------|-------|
| S1-01 | ✅ Done | Align scaffold docs with the actual full-stack app | `AGENTS.md`, `README.md`, `WHERE_AM_I.md`, `context.md` updated |
| S1-02 | ✅ Done | Define branch strategy for `main` and `reference-working` | Recorded in `project-plan.md` |
| S1-03 | ✅ Done | Create backend structure under `backend/` | Added `app.py`, backend package, `pyproject.toml`, and `requirements.txt` |
| S1-04 | ✅ Done | Implement backend endpoints and in-memory meals list | `GET/POST /api/meals`, `POST /api/meals/<id>/claim`, `GET /health` implemented |
| S1-05 | ✅ Done | Create frontend structure under `frontend/` | Added Vite app shell, package metadata, and config |
| S1-06 | ✅ Done | Implement frontend meal list, post form, and claim action | Single-page UI wired to the backend API |
| S1-07 | ✅ Done | Verify the happy path in a working environment | Automated tests, frontend build, backend HTTP checks, and dev-server startup all passed |

### Acceptance Criteria

- Backend starts on port `8000` and returns `{"status": "ok"}` from `/health`
- `GET /api/meals` returns a JSON list of meals
- `POST /api/meals` adds a meal with the canonical in-memory shape
- `POST /api/meals/<id>/claim` marks a meal as claimed
- Frontend starts on port `3000` and can list, post, and claim meals against the backend

### Verification Plan

1. Create the backend virtual environment and install dependencies.
2. Install frontend dependencies.
3. Run backend and frontend together.
4. Exercise list, post, and claim manually in the browser.

---

## Sprint 2 — Reference Baseline

**Status**: IN PROGRESS  
**Goal**: Capture and protect the first known-good working state.

### Scope

- Confirm the end-to-end app is stable enough to freeze as a baseline
- Fix misleading repo artifacts that would weaken the happy-path baseline
- Create the `reference-working` branch from the verified app state
- Document how this branch should differ from `main`

### Tasks

| ID | Status | Task | Notes |
|----|--------|------|-------|
| S2-01 | ✅ Done | Fix the documented backend run command | README now uses the backend venv interpreter explicitly |
| S2-02 | ✅ Done | Clean up the leftover root scaffold metadata | Removed the dead console script and aligned Python version metadata |
| S2-03 | ✅ Done | Align startup and architecture handoff docs | Startup protocol fixed and `architecture.md` added |
| S2-04 | ✅ Done | Re-run the happy path from a clean setup | Backend tests, build, and real backend startup passed on `main` |
| S2-05 | ⏳ In progress | Create `reference-working` branch | Known-good demo branch |
| S2-06 | ⬜ Todo | Verify `reference-working` remains runnable | Use as sanity-check branch |
| S2-07 | ⬜ Todo | Update docs to explain the role of `reference-working` | Keep branch strategy explicit |

### Acceptance Criteria

- `reference-working` exists from a verified working app state
- The happy-path docs and metadata no longer send users down known-dead setup paths
- The branch can be used to demo the core app without setup ambiguity
- Handoff docs explain when to use `main` versus `reference-working`

### Verification Plan

1. Fix the repo artifacts that currently misdescribe the happy path.
2. Re-run backend and frontend verification from the corrected setup docs.
3. Create `reference-working`.
4. Re-run backend and frontend on that branch.
5. Confirm branch strategy docs still match reality.

---

## Sprint 3 — Book Workflow Support

**Status**: PLANNED  
**Goal**: Add the minimal artifacts needed for the book's Git and worktree chapters.

### Scope

- Create the `feat/theme-switcher` branch used in examples
- Add a trivial frontend change that justifies the branch
- Verify worktree flows against the canonical repo layout

### Tasks

| ID | Status | Task | Notes |
|----|--------|------|-------|
| S3-01 | ⬜ Todo | Create `feat/theme-switcher` from the appropriate base | Match book conventions exactly |
| S3-02 | ⬜ Todo | Implement a tiny theme-related UI change on that branch | CSS variable or toggle only |
| S3-03 | ⬜ Todo | Validate worktree examples with `../neighborhood-meals-theme-switcher` | Path is load-bearing |
| S3-04 | ⬜ Todo | Record any repo-shape assumptions exposed by the workflow tests | Feed back into docs if needed |

### Acceptance Criteria

- The `feat/theme-switcher` branch exists and is usable in examples
- The extra worktree path works with the documented commands
- Workflow examples rely on real repo state, not hand-wavy placeholders

### Verification Plan

1. Check out the theme branch normally.
2. Create the extra worktree at the canonical path.
3. Validate that the branch/worktree behavior matches the book scenarios.

---

## Sprint 4 — Failure Validation

**Status**: PLANNED  
**Goal**: Confirm that the intentional setup friction on `main` is preserved and teachable.

### Scope

- Validate Python environment failure scenarios
- Validate Node/npm failure scenarios
- Confirm `.gitignore` and version constraints preserve those failures
- Ensure failures come from setup state, not broken application logic

### Tasks

| ID | Status | Task | Notes |
|----|--------|------|-------|
| S4-01 | ⬜ Todo | Verify backend failure before venv setup | `ModuleNotFoundError` path |
| S4-02 | ⬜ Todo | Verify strict Python version metadata remains in place | `requires-python >=3.11` |
| S4-03 | ⬜ Todo | Verify frontend failure before `npm install` | `vite: command not found` path |
| S4-04 | ⬜ Todo | Verify strict Node engine metadata remains in place | `>=20.11.0` |
| S4-05 | ⬜ Todo | Confirm `.venv/` and `node_modules/` are ignored and uncommitted | Friction must survive cloning |
| S4-06 | ⬜ Todo | Capture verification notes in repo docs | Keep the failures intentional, not accidental |

### Acceptance Criteria

- `main` still reproduces the expected setup failures from `product-definition.md`
- The happy path still works after proper setup
- The repo does not accidentally remove the book's curriculum through convenience changes

### Verification Plan

1. Validate expected failures from a clean state.
2. Validate recovery after proper environment setup.
3. Re-check `.gitignore`, version constraints, and package metadata.

---

## Sprint 5 — Release Readiness

**Status**: PLANNED  
**Goal**: Finish the reader-facing and handoff-facing documentation pass for the initial release shape.

### Scope

- Align README with actual setup and ports
- Align handoff docs with the final sprint state
- Produce a clear verification trail for future sessions

### Tasks

| ID | Status | Task | Notes |
|----|--------|------|-------|
| S5-01 | ⬜ Todo | Final README accuracy pass | No troubleshooting section |
| S5-02 | ⬜ Todo | Final handoff-doc consistency pass | `context.md`, `WHERE_AM_I.md`, `result-review.md` |
| S5-03 | ⬜ Todo | Run end-to-end verification one more time | Confirm no drift before release |
| S5-04 | ⬜ Todo | Record final release-ready status in project docs | Leave a clean handoff state |

### Acceptance Criteria

- README, project docs, and sprint records all describe the same repo state
- A new contributor can tell what `main` is for, what `reference-working` is for, and how to verify the app
- The project is ready for book-facing use without hidden repo-state surprises

### Verification Plan

1. Read README and compare it to the actual repo layout and commands.
2. Re-run the app setup flow and core behavior checks.
3. Re-read the handoff docs and resolve any contradictions.

---

## Cross-Sprint Constraints

- Do not add external runtime dependencies without explicit approval.
- Do not remove intentional friction that the book depends on.
- Do not replace setup failures with broken application code.
- Keep the app minimal: no database, auth, router, or state library.
- Preserve canonical names, ports, branches, and paths from `product-definition.md`.

## Current Focus

Sprint 2 is in progress. The next concrete execution task is `S2-05`: create and verify the `reference-working` branch from the current corrected app state.

---

*Update this file whenever sprint sequencing, statuses, or acceptance criteria change.*
