import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStorage } from "@/hooks/useAuthCookies";

export const useUserProfile = () => {
  const { getAuth } = useAuthStorage();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const auth = getAuth();
        if (!auth?.token) {
          setError("No auth token");
          return;
        }

        const res = await axios.get("http://backend:4000/users/me", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setUser(res.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [getAuth]);

  return { user, setUser, loading, error };
};
