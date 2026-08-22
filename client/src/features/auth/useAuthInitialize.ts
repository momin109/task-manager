import { useEffect } from "react";

import { getCurrentUser } from "./authApi";
import { setUser, finishLoading, logout } from "./authSlice";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

export const useAuthInitialize = () => {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    // Login/Register theke already user data thakle, abar fetch korar dorkar nai
    if (user) {
      dispatch(finishLoading());
      return;
    }

    const initializeAuth = async () => {
      if (!token) {
        dispatch(finishLoading());
        return;
      }

      try {
        const currentUser = await getCurrentUser();

        dispatch(setUser(currentUser));
      } catch {
        dispatch(logout());
      }
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ⚠️ shudhu ekbar - app mount howar shomoy chalbe
};
