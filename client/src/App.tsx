import AppRoutes from "./routes/AppRoutes";
import { useAuthInitialize } from "./features/auth/useAuthInitialize";
import { useThemeInitialize } from "./features/theme/useThemeInitialize";

function App() {
  useAuthInitialize();
  useThemeInitialize();

  return <AppRoutes />;
}

export default App;
