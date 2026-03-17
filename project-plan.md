# neighborhood-meals Project Plan

> **Strategic roadmap** — stable, long-term planning document
>
> For tactical execution, see `sprint-plan.md`

---

## Project Overview

**neighborhood-meals** is a deliberately small full-stack web app used to teach AI-assisted environment setup and debugging through a realistic Flask + React/Vite project.

The philosophy is **TinyClaw**:

> Build the smallest useful primitives first. Validate before scaling.

---

## Objectives

### Primary Objective
Create a minimal but real application that supports the book's setup, debugging, and workflow lessons without adding unnecessary product complexity.

### Secondary Objectives
- Maintain a known-good reference state for demos and sanity checks
- Preserve intentional environment friction on `main` so the book scenarios remain reproducible
- Keep the codebase small enough that setup problems stay visible and teachable

---

## Non-Negotiable Constraints

- The app code should remain functionally correct; teaching failures should come from environment and workflow friction, not arbitrary broken logic
- `main` is the canonical reader-facing branch and must preserve the intentional friction described in `product-definition.md`
- A `reference-working` branch should exist as the fully runnable "baked cake" state for demos, sanity checks, and recovery
- The stack and file conventions named in `product-definition.md` are load-bearing and must not be renamed or "cleaned up"
- No database, no extra runtime dependencies, and no unnecessary feature expansion beyond the book's minimal use case

---

## Development Phases

### Phase 0 — Research / Bootstrap

**Status**: ACTIVE

**Goals**:
- Align the scaffolded docs with the actual product definition
- Establish the branch and validation strategy before implementation starts

**Deliverables**:
- Corrected project documentation
- Sprint 1 plan
- Explicit `main` vs `reference-working` strategy

---

### Phase 1 — Core Foundation

**Goal**: Ship the smallest working end-to-end app that matches the product definition.

**Core components**:
1. Flask API with in-memory meals endpoints
2. React/Vite frontend with meal list, post form, and claim action

**Success Criteria**:
- Backend runs on port `8000` and exposes the canonical endpoints
- Frontend runs on port `3000`, fetches meals, posts meals, and claims meals
- The app is demonstrably functional in the `reference-working` branch
- `main` still preserves the intentional setup friction required by the book

---

### Phase 2 — Feature Expansion

**Goal**: Add only the smallest amount of polish needed to support the book's examples and workflow chapters.

**Components**:
- Sample data and minimal UX cleanup
- `feat/theme-switcher` branch used in worktree examples

**Success Criteria**:
- Worktree and branch-management examples are reproducible
- The app remains minimal and consistent with the product definition

---

### Phase 3 — Integration & Polish

**Goal**: Verify the reader-facing failure scenarios and document the happy path cleanly.

**Success Criteria**:
- Intentional friction scenarios are reproducible and mapped to book lessons
- README and handoff docs describe the app accurately without turning into troubleshooting guides

---

### Phase 4 — Advanced / Future (Optional)

**Potential**:
- Small presentation improvements for demos
- Additional teaching branches or tags if the manuscript later needs them

*Not required for initial success.*

---

## Branch Strategy

- `main` is the canonical book-facing branch. It should contain correct app code while preserving environment and workflow friction such as missing committed `.venv` and `node_modules`.
- `reference-working` is the maintained happy-path branch. It represents the fully runnable "baked cake" version used for demos, sanity checks, and recovery when `main`-based teaching scenarios become hard to reason about.
- Lesson-specific failures should be expressed as reproducible setup conditions and workflow scenarios, not as permanently broken application logic.

---

## Architecture Principles

1. **Tiny First** — smallest viable implementation
2. **Explicit State** — no hidden behavior
3. **Human Authority** — autonomy with oversight
4. **Audit Everything** — reproducible history
5. **Artifacts Over Chat** — durable outputs

---

## Core Components

### Data Stores
- `context.md` — session working memory
- `result-review.md` — running log of completed work
- `sprint-plan.md` — tactical execution plan
- `product-definition.md` — vision and constraints

---

## Risks

| Risk | Mitigation |
|------|------------|
| Scope creep | TinyClaw discipline |
| Over-complex architecture | Phase gating |
| Divergence between `main` and `reference-working` | Keep the app minimal and limit branch differences to setup/readiness, not product behavior |
| Losing the teaching failures while polishing the app | Treat `product-definition.md` friction requirements as acceptance criteria |

---

## Success Metrics

- A new clone of `main` reproduces the expected setup failures before environment setup
- The same project can be run successfully end-to-end after the documented setup steps
- `reference-working` remains a known-good demo branch for the current app scope

---

## Current Status

**Phase**: Phase 1 — Core Foundation
**Mode**: Mode 2 (Implementation with approval)
**Next Milestone**: Finish and verify the `reference-working` baseline branch

---

## Guiding Philosophy

> Build the smallest real app that can teach the right failures, then preserve a known-good reference state so both the lesson and the software stay testable.

Keep implementations minimal. Validate before scaling.

---

*End of Project Plan*
