import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8000";
const THEMES = {
  porch: {
    name: "Porch Light",
    note: "Warm and neighborly for the default branch experience.",
  },
  dusk: {
    name: "Dusk Pickup",
    note: "Cooler contrast for evening claim runs.",
  },
};

export default function App() {
  const [meals, setMeals] = useState([]);
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("porch");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadMeals() {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/meals`);
      if (!response.ok) {
        throw new Error("Could not load meals.");
      }

      const nextMeals = await response.json();
      setMeals(nextMeals);
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadMeals();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const nextTitle = title.trim();
    if (!nextTitle) {
      setStatusMessage("Enter a meal title before posting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: nextTitle }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Could not post meal.");
      }

      setMeals((currentMeals) => [...currentMeals, payload]);
      setTitle("");
      setStatusMessage(`Posted "${payload.title}".`);
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleClaim(mealId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/meals/${mealId}/claim`, {
        method: "POST",
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Could not claim meal.");
      }

      setMeals((currentMeals) =>
        currentMeals.map((meal) => (meal.id === mealId ? payload : meal)),
      );
      setStatusMessage(`Claimed "${payload.title}".`);
    } catch (error) {
      setStatusMessage(error.message);
    }
  }

  return (
    <main className="app-shell" data-theme={theme}>
      <section className="card">
        <div className="hero-row">
          <div>
            <p className="eyebrow">Community Pickup Board</p>
            <h1>Neighborhood Meals</h1>
            <p className="intro">
              Post an extra meal for your neighbors, then claim one before dinner is over.
            </p>
          </div>

          <div className="theme-switcher" aria-label="Theme switcher">
            <p className="theme-label">Theme</p>
            <div className="theme-buttons">
              {Object.entries(THEMES).map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  className={key === theme ? "theme-button active" : "theme-button"}
                  onClick={() => setTheme(key)}
                >
                  {value.name}
                </button>
              ))}
            </div>
            <p className="theme-note">{THEMES[theme].note}</p>
          </div>
        </div>

        <form className="meal-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Meal title</label>
          <div className="form-row">
            <input
              id="title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Lasagna - 2 trays"
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post meal"}
            </button>
          </div>
        </form>

        {statusMessage ? <p className="status">{statusMessage}</p> : null}

        <section className="meal-list">
          <div className="section-header">
            <h2>Available now</h2>
            <button type="button" className="ghost-button" onClick={loadMeals}>
              Refresh
            </button>
          </div>

          {isLoading ? <p>Loading meals...</p> : null}

          {!isLoading && meals.length === 0 ? <p>No meals posted yet.</p> : null}

          {!isLoading
            ? meals.map((meal) => (
                <article className="meal-card" key={meal.id}>
                  <div>
                    <h3>{meal.title}</h3>
                    <p>Posted by {meal.posted_by}</p>
                  </div>
                  <button
                    type="button"
                    disabled={meal.claimed}
                    onClick={() => handleClaim(meal.id)}
                  >
                    {meal.claimed ? "Claimed" : "Claim"}
                  </button>
                </article>
              ))
            : null}
        </section>
      </section>
    </main>
  );
}
