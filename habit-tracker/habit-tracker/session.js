const sessionKey = "dailybloom-demo-session";

function readSession() {
  try {
    const raw = sessionStorage.getItem(sessionKey);

    if (!raw) {
      return null;
    }

    const value = JSON.parse(raw);

    if (
      value &&
      typeof value.name === "string" &&
      value.name.trim().length > 0 &&
      value.name.length <= 60
    ) {
      return { name: value.name.trim() };
    }

    return null;
  } catch {
    return null;
  }
}

const loginForm = document.querySelector("#login-form");
const session = readSession();

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.querySelector("#display-name");
    const emailInput = document.querySelector("#email");
    const message = document.querySelector("#login-message");

    const name = nameInput.value.trim();

    if (!name) {
      message.textContent = "Please enter your name.";
      nameInput.focus();
      return;
    }

    if (!loginForm.reportValidity()) {
      return;
    }

    try {
      // Store only the display name, not the email or a password.
      sessionStorage.setItem(
        sessionKey,
        JSON.stringify({ name })
      );

      emailInput.value = "";

      window.location.assign("./index.html");
    } catch {
      message.textContent =
        "Browser session storage is unavailable. Please allow it to use this demo.";
    }
  });
} else if (!session) {
  window.location.replace("./login.html");
} else {
  for (const element of document.querySelectorAll("[data-user-name]")) {
    element.textContent = session.name;
  }

  for (const button of document.querySelectorAll("[data-logout]")) {
    button.addEventListener("click", () => {
      try {
        sessionStorage.removeItem(sessionKey);
        window.location.replace("./login.html");
      } catch {
        button.textContent = "Unable to log out. Close this tab.";
      }
    });
  }
}