function getUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}

function requireLogin() {
  const token = localStorage.getItem("token");
  const user = getUser();

  if (!token || !user) {
    window.location.href = "../login.html";
    return null;
  }

  return user;
}

function requireRole(expectedRole) {
  const user = requireLogin();
  if (!user) return null;

  if (user.role !== expectedRole) {
    if (user.role === "admin") {
      window.location.href = "../admin/dashboard.html";
    } else {
      window.location.href = "../collector/dashboard.html";
    }
    return null;
  }

  return user;
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "../login.html";
}
