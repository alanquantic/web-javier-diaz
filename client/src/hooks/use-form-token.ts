import { useCallback, useEffect, useState } from "react";

export function useFormToken() {
  const [formToken, setFormToken] = useState("");

  const refreshFormToken = useCallback(() => {
    fetch("/api/form-token")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (typeof data?.token === "string") setFormToken(data.token);
      })
      .catch(() => {
        // El servidor permite degradación segura cuando FORM_SECRET no existe.
      });
  }, []);

  useEffect(() => {
    refreshFormToken();
    const intervalId = window.setInterval(refreshFormToken, 45 * 60 * 1_000);
    return () => window.clearInterval(intervalId);
  }, [refreshFormToken]);

  return { formToken, refreshFormToken };
}
