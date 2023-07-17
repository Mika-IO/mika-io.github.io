function changeTheme() {
  const themeStyle = document.getElementById("theme-style");
  if (themeStyle.getAttribute("href") === "css/style.css") {
    themeStyle.setAttribute("href", "css/darkstyle.css");
    document.getElementById("theme-toggle").textContent = "☀️";
    setTheme("dark");
  } else {
    themeStyle.setAttribute("href", "css/style.css");
    document.getElementById("theme-toggle").textContent = "🌙";
    setTheme("light");
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function initTheme() {
  var theme = localStorage.getItem("theme");
  if (theme == "dark") {
    changeTheme();
  }
}

function changeArticleTheme() {
  const themeStyle = document.getElementById("theme-style");
  if (themeStyle.getAttribute("href") === "../../../css/style.css") {
    themeStyle.setAttribute("href", "../../../css/darkstyle.css");
    document.getElementById("theme-toggle").textContent = "☀️";
    setTheme("dark");
  } else {
    themeStyle.setAttribute("href", "../../../css/style.css");
    document.getElementById("theme-toggle").textContent = "🌙";
    setTheme("light");
  }
}

function initArticleTheme() {
  var theme = localStorage.getItem("theme");
  if (theme == "dark") {
    changeArticleTheme();
  }
}

function changeResumeTheme() {
  const themeStyle = document.getElementById("theme-style");
  if (themeStyle.getAttribute("href") === "../css/style.css") {
    themeStyle.setAttribute("href", "../css/darkstyle.css");
    document.getElementById("theme-toggle").textContent = "☀️";
    setTheme("dark");
  } else {
    themeStyle.setAttribute("href", "../css/style.css");
    document.getElementById("theme-toggle").textContent = "🌙";
    setTheme("light");
  }
}

function initResumeTheme() {
  var theme = localStorage.getItem("theme");
  if (theme == "dark") {
    changeResumeTheme();
  }
}
