import sys
import unittest
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent / "backend"
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from app import create_app
from neighborhood_meals.routes import reset_meals


class BackendApiTestCase(unittest.TestCase):
    def setUp(self):
        reset_meals()
        app = create_app()
        app.testing = True
        self.client = app.test_client()

    def test_health_endpoint_returns_ok(self):
        response = self.client.get("/health")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {"status": "ok"})

    def test_list_meals_returns_seed_data(self):
        response = self.client.get("/api/meals")
        payload = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(payload), 1)
        self.assertEqual(payload[0]["title"], "Chicken soup - 4 servings")

    def test_create_meal_adds_new_meal(self):
        response = self.client.post("/api/meals", json={"title": "Baked ziti - 6 servings"})
        payload = response.get_json()

        self.assertEqual(response.status_code, 201)
        self.assertEqual(payload["id"], 2)
        self.assertEqual(payload["claimed"], False)

        list_response = self.client.get("/api/meals")
        self.assertEqual(len(list_response.get_json()), 2)

    def test_create_meal_requires_title(self):
        response = self.client.post("/api/meals", json={"title": "  "})

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json(), {"error": "title is required"})

    def test_claim_meal_marks_meal_claimed(self):
        response = self.client.post("/api/meals/1/claim")
        payload = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertTrue(payload["claimed"])

    def test_cannot_claim_meal_twice(self):
        self.client.post("/api/meals/1/claim")
        response = self.client.post("/api/meals/1/claim")

        self.assertEqual(response.status_code, 409)
        self.assertEqual(response.get_json(), {"error": "meal already claimed"})


if __name__ == "__main__":
    unittest.main()
