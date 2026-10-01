const themeButton = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const themeText = document.querySelector("#theme-text");

const storageKey = "dailybloom-theme";
const systemPreference = window.matchMedia(
  "(prefers-color-scheme: dark)"
);

let savedTheme = null;

try {
  savedTheme = localStorage.getItem(storageKey);
} catch {
  // Dark mode still works when browser storage is unavailable.
}

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.documentElement.dataset.theme = theme;

  if (themeButton) {
    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  if (themeIcon) {
    themeIcon.textContent = isDark ? "☀️" : "🌙";
  }

  if (themeText) {
    themeText.textContent = isDark ? "Light mode" : "Dark mode";
  }
}

const initialTheme =
  savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : systemPreference.matches
      ? "dark"
      : "light";

applyTheme(initialTheme);

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark"
        ? "light"
        : "dark";

    applyTheme(nextTheme);
    savedTheme = nextTheme;

    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch {
      // The selected theme remains active for this page.
    }
  });
}

systemPreference.addEventListener("change", (event) => {
  if (savedTheme !== "dark" && savedTheme !== "light") {
    applyTheme(event.matches ? "dark" : "light");
  }
});