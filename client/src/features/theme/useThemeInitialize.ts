import { useEffect } from "react";

import { useAppSelector } from "../../hooks/redux";

export const useThemeInitialize = () => {
  const theme = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);
};
