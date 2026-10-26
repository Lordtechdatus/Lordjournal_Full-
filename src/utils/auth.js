export const AUTH_CHANGE_EVENT = "lj-auth-change";

export const getIsAdmin = () => {
  const adminToken = localStorage.getItem("adminAuthToken");
  const adminRole = localStorage.getItem("adminRole");
  const userEmail = localStorage.getItem("userEmail");

  return Boolean(
    adminToken ||
      adminRole === "admin" ||
      userEmail === "admin@lordjournal.com"
  );
};

export const clearAuthStorage = () => {
  localStorage.removeItem("adminAuthToken");
  localStorage.removeItem("googleCredential");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  localStorage.removeItem("adminRole");
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};
