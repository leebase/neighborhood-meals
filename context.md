# neighborhood-meals Session Context

> **Purpose**: Working memory for session continuity. If power drops, a new AI takes over, or we return after a break—read this first.

---

## Snapshot

| Attribute | Value |
|-----------|-------|
| **Phase** | Sprint 3 Preparation |
| **Mode** | 2 (Implementation with approval) |
| **Last Updated** | 2026-03-17 |

### Sprint Status
| Sprint | Status | Completion |
|--------|--------|------------|
| Sprint 1 — Foundation | ✅ Complete | 100% |

---

## What's Happening Now

### Current Work Stream
Closing Sprint 2 after creating and verifying `reference-working`, then preparing the Git/worktree support branch used by the book examples.

### Recently Completed
- ✅ Project scaffolded with init-agent
- ✅ AGENTS.md created
- ✅ Core docs aligned with the actual full-stack app shape
- ✅ Branch strategy defined: `main` for the book, `reference-working` for the baked-cake baseline
- ✅ `sprint-plan.md` created
- ✅ Orientation docs reviewed and normalized so they no longer describe the repo as being in raw scaffold state
- ✅ Canonical `backend/` and `frontend/` app structure created
- ✅ Flask API implemented with in-memory meals and health endpoint
- ✅ React/Vite frontend implemented with list, post, and claim flow
- ✅ Sprint 1 happy path verified with automated tests and real dev-server runs
- ✅ README backend setup corrected to match the actual verified run path
- ✅ Root scaffold metadata cleaned up so it no longer advertises a dead console-script entrypoint
- ✅ Startup protocol aligned with `WHERE_AM_I.md`, and `architecture.md` added for technical decisions
- ✅ Sprint 2 happy path re-verified on `main` before baseline branching
- ✅ `reference-working` branch created and pushed to origin
- ✅ `reference-working` verified with backend tests, frontend build, and real backend startup
- ✅ Reader-facing docs updated to explain `main` versus `reference-working`

### In Progress
- ⏳ Preparing Sprint 3 workflow-support work

---

## Decisions Locked

| Decision | Rationale | Date |
|----------|-----------|------|
| TinyClaw methodology | Build from scratch with small primitives; validate before scale | 2026-03-17 |
| `reference-working` branch will hold the fully runnable baseline | Keeps a known-good demo state without sacrificing the book-facing friction on `main` | 2026-03-17 |

---

## Document Inventory

### Planning (Stable)
| File | Purpose | Status |
|------|---------|--------|
| `product-definition.md` | Product vision, constraints | ✅ Created |
| `project-plan.md` | Strategic roadmap, phases, success metrics | ✅ Created |
| `sprint-plan.md` | Tactical execution | ✅ Created |
| `AGENTS.md` | AI agent guide, conventions, operational modes | ✅ Created |

### Session Memory (Dynamic)
| File | Purpose | Status |
|------|---------|--------|
| `context.md` | Working state, current focus, next actions | 🔄 Active |
| `result-review.md` | Running log of completed work | 🔄 Active |

### Backlog System
| File | Purpose | Status |
|------|---------|--------|
| `backlog/schema.md` | Unified backlog item schema | ✅ Created |
| `backlog/template.md` | Copy-paste template for new backlog items | ✅ Created |

---

## Open Questions (keep short)

1. Build backend first or scaffold backend and frontend together?
2. When should `reference-working` be created: after the happy path first works, or after a bit of polish?

---

## Next Actions Queue (ranked)

| Rank | Action | Owner | Done When |
|------|--------|-------|----------|
| 1 | Create the `feat/theme-switcher` branch from the right base | AI | Branch exists locally and on origin |
| 2 | Add the minimal theme-related change used by the book workflow examples | AI | Branch contains a trivial but real UI delta |
| 3 | Validate the worktree flow with `../neighborhood-meals-theme-switcher` | AI | The documented worktree example is reproducible |

---

## Working Conventions

### Start of session
1. Read `product-definition.md` (if exists)
2. Read this file
3. Execute the top-ranked item only
4. Update **Last Updated** if you changed any state here

### End of work unit
1. Move completed items into "Recently Completed"
2. Update "Next Actions Queue"
3. Add any new "Decisions Locked"
4. Keep "Open Questions" ≤ 5

---

## Environment Notes

- **Working Directory**: ./neighborhood-meals
- **Project Name**: neighborhood-meals
- **Profile**: Full-stack web app (Flask API + React/Vite frontend)
- **Author**: Lee Harrington

---

*This file is a living document—update it frequently.*
