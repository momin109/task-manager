import { useEffect } from "react";

import { getCurrentUser } from "./authApi";
import { setUser, finishLoading, logout } from "./authSlice";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

export const useAuthInitialize = () => {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    const initializeAuth = async () => {
      if (!token) {
        dispatch(finishLoading());
        return;
      }

      try {
        const user = await getCurrentUser();

        dispatch(setUser(user));
      } catch {
        dispatch(logout());
      }
    };

    initializeAuth();
  }, [token, dispatch]);
};
