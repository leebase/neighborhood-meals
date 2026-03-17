# neighborhood-meals

A small full-stack web app for managing community meal pickups.

Neighbors can post available meals, and other neighbors can claim them for pickup. The app is intentionally small but uses a real backend and frontend so the development environment behaves like an actual project.

## Requirements

- Python 3.11+
- Node 20.11+
- `uv`
- `npm`

## Backend Setup

Create the backend virtual environment and install dependencies:

```bash
cd backend
uv venv --python 3.11 .venv
uv pip install -e .
./.venv/bin/python app.py
```

The Flask API runs on `http://localhost:8000`.

## Frontend Setup

Install frontend dependencies and start Vite:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000`.

## API Surface

- `GET /api/meals`
- `POST /api/meals`
- `POST /api/meals/<id>/claim`
- `GET /health`

## Notes

This repository intentionally preserves some setup friction for the companion book. Do not remove expected files like `backend/requirements.txt`, and do not commit `backend/.venv/` or `frontend/node_modules/`.

## Branches

- `main` is the book-facing branch. It preserves intentional environment and workflow friction while keeping the underlying app code correct.
- `reference-working` is the known-good runnable baseline. Use it when you need to confirm the app works end to end without wondering whether an issue is caused by an unfinished repo state.

## Updating Templates

To refresh the generic AgentFlow contract files without overwriting project memory:

```bash
init-agent --update
```

---

Created on 2026-03-17 by Lee Harrington.
