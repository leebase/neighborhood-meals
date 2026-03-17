from flask import Flask
from flask_cors import CORS

from neighborhood_meals.routes import bp


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(bp)
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(port=8000, debug=True)
