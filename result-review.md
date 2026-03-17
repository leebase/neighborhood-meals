# neighborhood-meals Result Review

> **Running log of completed work.** Newest entries at the top.
>
> Each entry documents what was built, why it matters, and how to verify it works.

---

## 2026-03-17 — Sprint 3 workflow branch and worktree example completed

### What Was Built
Created and pushed the `feat/theme-switcher` branch and used the canonical worktree path `../neighborhood-meals-theme-switcher` to implement a small but real frontend theme toggle there. The worktree example was validated from both sides: the feature branch builds successfully in the worktree, and attempting to check out the same branch from `main` reproduces the expected “already used by worktree” Git error.

### Why It Matters
This turns the Git/worktree chapters into real repo state instead of hypothetical instructions. The project now has the exact feature branch and worktree layout the book references.

### How to Verify
1. Run `git worktree list` from the repo root and confirm `../neighborhood-meals-theme-switcher` is present.
2. Run `git -C /Users/leeharrington/projects/neighborhood-meals checkout feat/theme-switcher` and confirm Git reports the branch is already used by the worktree.
3. Run `cd ../neighborhood-meals-theme-switcher/frontend && npm install && npm run build` and confirm the theme branch frontend builds successfully.
4. Confirm `git branch -a` shows `origin/feat/theme-switcher`.

## 2026-03-17 — Sprint 2 reference baseline completed

### What Was Built
Finished Sprint 2 by creating the `reference-working` branch from the corrected working app state and verifying that branch directly. The baseline branch now exists on origin, and the repo docs explain when to use `main` versus `reference-working`.

### Why It Matters
This gives the project a trustworthy runnable baseline separate from the intentionally friction-heavy reader branch. That makes future debugging, demos, and recovery work much easier without weakening the book-facing setup on `main`.

### How to Verify
1. Run `git branch -a` and confirm both `main` and `origin/reference-working` exist.
2. Check out `reference-working`.
3. Run `./backend/.venv/bin/python -m unittest tests/test_backend.py`.
4. Run `cd frontend && npm run build`.
5. Start the backend with `cd backend && ./.venv/bin/python app.py` and confirm `/health` returns `{"status":"ok"}`.

## 2026-03-17 — Sprint 2 baseline fixes prepared on main

### What Was Built
Applied the real repo fixes needed before freezing a trustworthy working baseline. The README now uses the backend virtualenv interpreter explicitly, the root scaffold metadata no longer advertises a dead console-script entrypoint, the startup protocol includes `WHERE_AM_I.md`, and a new `architecture.md` records the core stack decisions.

### Why It Matters
These changes do not remove intentional friction from `main`; they remove accidental drift that would make the happy path or handoff guidance misleading. That makes `reference-working` worth creating from this state instead of from a partially corrected repo.

### How to Verify
1. Read `README.md` and confirm the backend run command is `./.venv/bin/python app.py`.
2. Read `pyproject.toml` and confirm the broken root console script entry is gone and `requires-python` is `>=3.11`.
3. Read `AGENTS.md` and confirm the startup protocol includes `WHERE_AM_I.md`.
4. Read `architecture.md` and confirm it explains the backend/frontend split and the intentional-friction policy.

## 2026-03-17 — Code review standard clarified for book-driven artifacts

### What Was Built
Updated the repo conventions so future code reviews distinguish between true repo defects and intentional or book-driven artifacts. `AGENTS.md` and `skills/code-review.md` now explicitly tell reviewers to separate must-fix issues from items that may instead be resolved by feeding reality back into the manuscript.

### Why It Matters
This project is not a generic production app. Without this rule, future reviews would keep over-reporting intentional teaching structure as bugs, which creates noise and makes the real issues harder to see.

### How to Verify
1. Read `AGENTS.md` and confirm it has a `Review Standard` section.
2. Read `skills/code-review.md` and confirm it distinguishes `Must-fix now` issues from `Book-alignment choices`.
3. Confirm future reviews can explicitly note when a mismatch may be solved in the book rather than the repo.

## 2026-03-17 — Sprint 1 end-to-end app implemented and verified

### What Was Built
Built the first working version of the app across the canonical `backend/` and `frontend/` directories. The backend now exposes the Flask health and meal endpoints, the frontend provides a one-page React/Vite flow for listing, posting, and claiming meals, and the repo now includes the required `.gitignore` entries for `backend/.venv/` and `frontend/node_modules/`.

### Why It Matters
This completes the core product slice the rest of the book depends on. The project now has real runnable app code while still preserving the setup friction that `main` is supposed to teach.

### How to Verify
1. Run `cd backend && uv venv --python 3.11 .venv && uv pip install -e .`.
2. Run `./backend/.venv/bin/python -m unittest tests/test_backend.py` from the repo root and confirm all tests pass.
3. Run `cd frontend && npm install && npm run build` and confirm the build succeeds.
4. Start the backend with `cd backend && ./.venv/bin/python app.py`, then confirm `curl http://127.0.0.1:8000/health` returns `{"status":"ok"}`.
5. Start the frontend with `cd frontend && npm run dev -- --host 127.0.0.1` and confirm the dev server starts on `http://127.0.0.1:3000/`.

## 2026-03-17 — Project-wide sprint roadmap created

### What Was Built
Replaced the narrow Sprint 1-only `sprint-plan.md` with a project-wide sprint roadmap. The new plan now sequences the work across five sprints: foundation build, reference baseline, book workflow support, failure validation, and release readiness.

### Why It Matters
This gives the repo a complete execution map instead of a single immediate checklist. Future sessions can now see what comes after the first implementation slice and how each sprint supports the book's constraints.

### How to Verify
1. Read `sprint-plan.md` and confirm it includes multiple sprints, not just Sprint 1.
2. Confirm Sprint 2 covers `reference-working`, Sprint 3 covers `feat/theme-switcher`, and Sprint 4 covers intentional-friction validation.
3. Confirm the current focus still points at `S1-03` as the next implementation task.

## 2026-03-17 — Orientation docs normalized for Sprint 1 kickoff

### What Was Built
Updated the orientation docs to remove leftover init-agent language that implied the project was still in raw scaffold state. `context.md` and `WHERE_AM_I.md` now consistently describe the repo as planned, documented, and ready to start Sprint 1 implementation.

### Why It Matters
These files are the first thing a new session reads. If they lag behind the actual state, the next agent wastes time re-planning or mistrusts the repo memory.

### How to Verify
1. Read `context.md` and confirm the phase is `Sprint 1 Kickoff` with Sprint 1 marked active.
2. Read `WHERE_AM_I.md` and confirm it no longer says `sprint-plan.md` is missing.
3. Confirm both files describe implementation as not yet started but ready to begin.

## 2026-03-17 — Documentation aligned to the real app

### What Was Built
Updated the scaffolded project docs so they describe `neighborhood-meals` as a full-stack Flask + React/Vite application rather than a generic Python package. The agent guide now points the existing skills at backend, frontend, and cross-stack work, and the orientation docs reflect the actual stack.

### Why It Matters
The init-agent scaffold left several Python-only assumptions that would mislead future sessions. This removes that drift and makes the handoff docs match the product definition before implementation starts.

### How to Verify
1. Read `AGENTS.md` and confirm the skills section references backend API, frontend UI, and end-to-end validation.
2. Read `README.md` and confirm it documents backend setup in `backend/` and frontend setup in `frontend/`.
3. Read `WHERE_AM_I.md` and `context.md` and confirm the project profile is full-stack Flask + React/Vite.

## 2026-03-17 — Repo strategy and sprint plan established

### What Was Built
Defined the repo strategy around a book-facing `main` branch and a known-good `reference-working` branch. Created `sprint-plan.md` to turn that strategy into concrete Sprint 1 tasks for the minimal Flask + React/Vite app.

### Why It Matters
This resolves the key planning question for the book: the project can preserve intentional friction on `main` without losing a reliable working baseline. It also gives future sessions a concrete sequence of implementation and verification work.

### How to Verify
1. Read `project-plan.md` and confirm the branch strategy section defines `main` and `reference-working`.
2. Read `sprint-plan.md` and confirm Sprint 1 includes both happy-path app work and intentional-friction verification.
3. Read `context.md` and confirm the current work stream and next actions now reference Sprint 1 implementation.

## 2026-03-17 — Project Scaffolded

**Project initialized** with init-agent.

### Created

| File | Purpose |
|------|---------|
| `AGENTS.md` | AI agent guide and conventions |
| `WHERE_AM_I.md` | Quick orientation for agents |
| `feedback.md` | Human feedback capture |
| `README.md` | Project documentation |
| `context.md` | Session working memory |
| `result-review.md` | This file - running log |
| `sprint-plan.md` | Sprint tracking |

### How to Verify

1. Check all files exist: `ls *.md`
2. Read AGENTS.md to understand project conventions
3. Check context.md for current state

---

*Add new entries above this line. Keep the newest work at the top.*
