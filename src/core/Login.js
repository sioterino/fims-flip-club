import { Storage } from "../utils/Storage.js";

class Login {
  constructor() {
    this.login = document.querySelectorAll(".login");
    this.signup = document.querySelector(".signup");
    this.signin = document.querySelector(".signin");

    this.login.forEach((l) => {
      l.querySelector(".link").addEventListener("click", () => {
        this.#toggleLogin();
      });
    });

    this.#enableForms();
    this.#checkSession();
  }

  #checkSession() {
    const session = Storage.loadFromSessionStorage("fims-flip-club:session");

    if (session?.isLoggedIn) {
      document.querySelector(".username").textContent = session.username;
      document.querySelector(".login-wrapper").classList.add("hide");
      document.querySelector(".app-body").classList.remove("hide");
      this.signin.classList.add("hide");
      this.signup.classList.add("hide");
    }
  }

  logout() {
    sessionStorage.removeItem("fims-flip-club:session");
    location.reload();
  }

  #toggleLogin() {
    this.signup.classList.toggle("hide");
    this.signin.classList.toggle("hide");
    this.signin.querySelector(".warning").classList.add("hidden");
    this.signup.querySelector(".warning").classList.add("hidden");
  }

  #enableForms() {
    this.login.forEach((l) => {
      const form = l.querySelector("form");
      form.addEventListener("submit", (e) => {
        this.#formSubmit(e, form);
        form.querySelectorAll("input").forEach((i) => (i.value = ""));
      });
    });
  }

  #formSubmit(e, form) {
    e.preventDefault();
    const method = e.target.classList.value;

    const input = new FormData(form);
    const data = {};

    input.forEach((value, key) => {
      data[key] = value.trim();
    });

    switch (method) {
      case "signup":
        this.#signup(data);
        break;

      case "signin":
        this.#signin(data);
        break;

      default:
        new Error("Invalid Login Method");
    }
  }

  #signup(data) {
    if (this.#verifyUserExists(data.name)) {
      this.#userWarning("user-exists");
      return;
    }

    const loginData = Storage.loadFromLocalStorage("fims-flip-club:login");
    loginData.push({
      id: Storage.createId(),
      username: data.name,
      password: Storage.encode(data.password),
    });
    Storage.saveToLocalStorage("fims-flip-club:login", loginData);

    this.#toggleLogin();
    this.signin.querySelector(".send-to-sigup").classList.add("hidden");
    this.signin.querySelector(".link").classList.add("hide");
  }

  #signin(data) {
    if (!this.#verifyPassword(data.name, data.password)) {
      this.#userWarning("user-doesnt-exist");
      return;
    }

    const loginData = Storage.loadFromLocalStorage("fims-flip-club:login");
    const user = loginData.find((item) => item.username === data.name);

    Storage.saveToSessionStorage("fims-flip-club:session", {
      id: user.id,
      username: user.username,
      isLoggedIn: true,
    });

    document.querySelector(".username").textContent = user.username;

    document.querySelector(".login-wrapper").classList.add("hide");
    document.querySelector(".app-body").classList.remove("hide");
    this.signin.classList.toggle("hide");
  }

  #verifyUserExists(username) {
    const loginData = Storage.loadFromLocalStorage("fims-flip-club:login");
    return loginData.some((data) => data.username === username);
  }

  #verifyPassword(username, password) {
    const loginData = Storage.loadFromLocalStorage("fims-flip-club:login");

    const user = loginData.find((item) => item.username === username);
    if (!user) return false;

    return Storage.encode(password) === user.password;
  }

  #userWarning(warning) {
    let w;
    switch (warning) {
      case "user-exists":
        w = this.signup.querySelector(".warning");
        w.textContent = "This username is already taken";
        w.classList.remove("hidden");
        break;

      case "user-doesnt-exist":
        w = this.signin.querySelector(".warning");
        w.textContent = "Invalid username or password";
        w.classList.remove("hidden");
        break;

      default:
        new Error("Invalid Warning Method");
    }
  }
}

export { Login };
