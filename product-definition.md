# neighborhood-meals — Product Definition

> This is the companion repository for *Your Dev Environment: A Guide for AI-Assisted Developers* by Lee Harrington.
> The app is intentionally set up to produce the exact environment errors the book walks through. See **Intentional Friction** below before building anything.

---

## What the App Does

`neighborhood-meals` is a small full-stack web app for managing community meal pickups. Neighbors post available meals; other neighbors sign up to pick them up. Think of it as a lightweight mutual-aid board: someone makes too much soup, posts it, and the person two streets over claims it before dinner.

The app is deliberately simple. It has enough moving parts to require a real tech stack — a backend that talks to data, a frontend that renders it in a browser — but not so complex that the environment setup is buried under actual application complexity. Every folder, file, and config the book references exists for a reason.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Backend | Python / Flask | Python 3.11.8, Flask 3.x |
| Frontend | React / Vite | Node 20.11.1, React 18 |
| Package management (Python) | uv + pyproject.toml | uv 0.5.x |
| Package management (Node) | npm | npm 10.2.4 |
| Shell (canonical) | zsh on macOS | — |

---

## Canonical Repo Layout

```
neighborhood-meals/
  README.md
  .gitignore
  backend/
    app.py
    pyproject.toml
    requirements.txt          ← both exist intentionally (see Ch 8)
    neighborhood_meals/
      __init__.py
      routes.py
  frontend/
    package.json
    package-lock.json
    src/
      App.jsx
      main.jsx
```

**Conventions that must never change** (the book references these by name):

- Python package name: `neighborhood_meals` (underscore)
- Frontend app name in package.json: `neighborhood-meals-frontend` (hyphen)
- Backend virtual environment: `backend/.venv` (not committed)
- Frontend dev server: port `3000`
- Backend dev server: port `8000`
- Default branch: `main`
- Feature branch used in worktree examples: `feat/theme-switcher`
- Extra worktree path: `../neighborhood-meals-theme-switcher`
- Remote name: `origin`

---

## Application Features

The app only needs to do enough to be real. Keep it minimal.

### Backend (Flask API — `backend/`)

**Endpoints:**

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/meals` | Return list of available meals |
| POST | `/api/meals` | Post a new meal |
| POST | `/api/meals/<id>/claim` | Claim a meal pickup |
| GET | `/health` | Health check — returns `{"status": "ok"}` |

**Data model (in-memory, no database):**

```python
{
  "id": 1,
  "title": "Chicken soup — 4 servings",
  "posted_by": "Apartment 4B",
  "claimed": False
}
```

No database required. A module-level list in `routes.py` is fine. The point is that Flask runs and responds — not that the data persists.

**`backend/app.py`** — Flask app factory:

```python
from flask import Flask
from neighborhood_meals.routes import bp

def create_app():
    app = Flask(__name__)
    app.register_blueprint(bp)
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=8000, debug=True)
```

**`backend/neighborhood_meals/__init__.py`** — empty or minimal.

**`backend/neighborhood_meals/routes.py`** — blueprint with the four endpoints above.

### Frontend (React/Vite — `frontend/`)

One page. Shows the meal list fetched from `http://localhost:8000/api/meals`. Each meal has a "Claim" button. A form at the top lets you post a new meal (title only).

No routing library. No state management library. Plain React hooks (`useState`, `useEffect`). The point is that Vite starts, the browser renders something, and the fetch call hits the backend.

**`frontend/src/App.jsx`** — single component with meal list + post form.

**`frontend/src/main.jsx`** — standard Vite entry point.

---

## pyproject.toml (Canonical)

```toml
[project]
name = "neighborhood-meals-backend"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
    "flask>=3.0",
    "flask-cors>=4.0",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

## requirements.txt (Canonical)

```
flask>=3.0
flask-cors>=4.0
```

Both files exist. `requirements.txt` is a leftover from the original setup; `pyproject.toml` is the authoritative declaration. Chapter 8 explains this transition instead of treating it as an error. Do not delete either file.

## package.json (Canonical)

```json
{
  "name": "neighborhood-meals-frontend",
  "version": "0.1.0",
  "engines": {
    "node": ">=20.11.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

The `engines` field is required. It produces the canonical "Unsupported engine" error in Chapter 10 when the reader has Node 18 instead of Node 20.

---

## Intentional Friction — The Errors the Book Produces

The repo must be in a state where a reader who clones it and follows their first instinct hits each of these walls. Do not "fix" these — they are the curriculum.

### Part 1: Git and GitHub (Chapters 1–5)

The friction here is conceptual, not file-based. The repo just needs to be a real Git repo with a `main` branch and an `origin` remote on GitHub. The walls come from the reader's machine state, not the repo contents.

| Error | Where it comes from |
|-------|-------------------|
| `fatal: not a git repository` | Reader runs `git status` outside the repo dir |
| `Permission denied (publickey)` | Reader's machine not authorized to GitHub via SSH |
| `'feat/theme-switcher' is already checked out` | Reader tries `git checkout feat/theme-switcher` when the worktree already exists |
| `local changes would be overwritten by checkout` | Reader has unsaved edits in `frontend/src/App.jsx` and tries to switch branches |

The `feat/theme-switcher` branch should exist on the remote (with a trivial change — a CSS variable or a toggle button) so the worktree example has something to check out.

### Part 2: Python Environments (Chapters 6–8)

| Error | How to reproduce it | Canonical message |
|-------|-------------------|------------------|
| `ModuleNotFoundError: No module named 'flask'` | Run `python backend/app.py` with no venv active | See scenario-thread.md |
| `requires a different Python: 3.9.6 not in '>=3.11'` | Reader has system Python 3.9, runs `pip install -e .` | See scenario-thread.md |

**Trigger condition:** `backend/.venv/` must NOT be committed. The `.gitignore` must exclude it. A reader who clones the repo and immediately runs `python backend/app.py` must get the ModuleNotFoundError.

### Part 3: Node and npm (Chapters 9–11)

| Error | How to reproduce it | Canonical message |
|-------|-------------------|------------------|
| `zsh: command not found: node` | Machine has no Node installed | See scenario-thread.md |
| `npm ERR! engine Unsupported engine` | Reader has Node 18, package.json requires >=20.11.0 | See scenario-thread.md |
| `sh: vite: command not found` | Reader runs `npm run dev` without running `npm install` first | See scenario-thread.md |

**Trigger condition:** `frontend/node_modules/` must NOT be committed. `.gitignore` must exclude it. A reader who runs `npm run dev` immediately after cloning must get the vite error.

### Part 4: Warp and System-Level (Chapters 12–15)

These errors are machine-state problems, not repo problems. The repo does not cause them — the book sets them up through the reader's own actions.

| Error | How it arises |
|-------|--------------|
| `Error: listen EADDRINUSE :::3000` | Reader starts the frontend twice, or another process holds port 3000 |
| `zsh: command not found: gh` | `gh` CLI installed but not on PATH |
| `export VAR=value` disappears after restart | Reader sets env var in current session only, not in `~/.zshrc` |

---

## .gitignore (Required Entries)

```
# Python
backend/.venv/
__pycache__/
*.pyc
*.egg-info/
dist/

# Node
frontend/node_modules/
frontend/dist/

# Editor
.DS_Store
.env
```

The `.venv` and `node_modules` exclusions are load-bearing. Without them the intentional friction disappears.

---

## README.md (Canonical Content)

The README should describe the app simply and include setup instructions that are correct but non-trivial — enough that a reader using an AI tool to help set it up would encounter each environment wall naturally.

Suggested sections:
- What it does (3 sentences)
- Requirements (Python 3.11+, Node 20.11+, uv)
- Backend setup (`uv venv`, `uv pip install -e .`, `python backend/app.py`)
- Frontend setup (`nvm use 20`, `npm install`, `npm run dev`)
- Ports (backend: 8000, frontend: 3000)

Do not include troubleshooting. The book is the troubleshooting guide.

---

## What to Build (Summary)

A working full-stack app that:

1. Flask backend on port 8000 with 4 endpoints and in-memory meal data
2. React/Vite frontend on port 3000 that lists meals and lets you claim or post one
3. Both files (`requirements.txt` and `pyproject.toml`) present for the Python dep story
4. `feat/theme-switcher` branch with a trivial change (a CSS variable is enough)
5. No `.venv`, no `node_modules` committed
6. `engines.node >= 20.11.0` in `package.json`
7. `requires-python = ">=3.11"` in `pyproject.toml`
8. `.gitignore` excluding all the right things
9. GitHub remote at `origin` (the book assumes a real remote exists)

The app does not need to be polished. It needs to be real enough that the errors are real.
