import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { clearAuthStorage } from "../utils/auth";


const TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes
const WARNING_BEFORE = 2 * 60 * 1000; // 2 minutes pehle warning

const notyf = new Notyf({
  duration: 3000,
  position: {
    x: "right",
    y: "top",
  },
  dismissible: true,
});

function useSessionTimeout() {
  const navigate = useNavigate();

  const timeoutRef = useRef(null);
  const warningRef = useRef(null);
  const warningToastRef = useRef(null);

  const logout = useCallback(() => {
    clearAuthStorage();

    notyf.error("Session expired. Please login again.");

    navigate("/login");
  }, [navigate]);

  const resetTimer = useCallback(() => {
    clearTimeout(timeoutRef.current);
    clearTimeout(warningRef.current);

    if (warningToastRef.current) {
      notyf.dismiss(warningToastRef.current);
      warningToastRef.current = null;
    }

    const isLoggedIn =
      localStorage.getItem("adminAuthToken") ||
      localStorage.getItem("googleCredential") ||
      localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) return;

    warningRef.current = setTimeout(() => {
      warningToastRef.current = notyf.error({
        message: "Your session will expire soon due to inactivity.",
        duration: WARNING_BEFORE,
        dismissible: true,
      });
    }, TIMEOUT_DURATION - WARNING_BEFORE);

    timeoutRef.current = setTimeout(() => {
      logout();
    }, TIMEOUT_DURATION);
  }, [logout]);

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });

      clearTimeout(timeoutRef.current);
      clearTimeout(warningRef.current);

      if (warningToastRef.current) {
        notyf.dismiss(warningToastRef.current);
        warningToastRef.current = null;
      }
    };
  }, [resetTimer]);
}

export default useSessionTimeout;
