import { useCallback } from "react";

/**
 * Simple alert hook
 * Can later be replaced with Toast / Snackbar / AntD / MUI
 */
export const useAlert = () => {
  const success = useCallback((message: string) => {
    console.log("✅ SUCCESS:", message);
    // Replace with toast/snackbar later
    alert(message);
  }, []);

  const error = useCallback((message: string) => {
    console.error("❌ ERROR:", message);
    alert(message);
  }, []);

  const info = useCallback((message: string) => {
    console.info("ℹ️ INFO:", message);
    alert(message);
  }, []);

  return {
    success,
    error,
    info,
  };
};
