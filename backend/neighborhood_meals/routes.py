from itertools import count

from flask import Blueprint, jsonify, request

bp = Blueprint("meals", __name__)

meals = [
    {
        "id": 1,
        "title": "Chicken soup - 4 servings",
        "posted_by": "Apartment 4B",
        "claimed": False,
    }
]
meal_ids = count(start=2)


def reset_meals():
    meals.clear()
    meals.append(
        {
            "id": 1,
            "title": "Chicken soup - 4 servings",
            "posted_by": "Apartment 4B",
            "claimed": False,
        }
    )

    global meal_ids
    meal_ids = count(start=2)


@bp.get("/health")
def health():
    return jsonify({"status": "ok"})


@bp.get("/api/meals")
def list_meals():
    return jsonify(meals)


@bp.post("/api/meals")
def create_meal():
    payload = request.get_json(silent=True) or {}
    title = (payload.get("title") or "").strip()
    posted_by = (payload.get("posted_by") or "Neighborhood kitchen").strip()

    if not title:
        return jsonify({"error": "title is required"}), 400

    meal = {
        "id": next(meal_ids),
        "title": title,
        "posted_by": posted_by or "Neighborhood kitchen",
        "claimed": False,
    }
    meals.append(meal)
    return jsonify(meal), 201


@bp.post("/api/meals/<int:meal_id>/claim")
def claim_meal(meal_id):
    for meal in meals:
        if meal["id"] == meal_id:
            if meal["claimed"]:
                return jsonify({"error": "meal already claimed"}), 409

            meal["claimed"] = True
            return jsonify(meal)

    return jsonify({"error": "meal not found"}), 404
