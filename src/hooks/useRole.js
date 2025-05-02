// hooks/useRole.js
"use client";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export default function useRole() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (cookie) {
      const token = cookie.split("=")[1];
      try {
        const decoded = jwt.decode(token); // decode only (no verify on client)
        if (decoded?.role) {
          setRole(decoded.role);
        }
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  }, []);

  return role;
}
