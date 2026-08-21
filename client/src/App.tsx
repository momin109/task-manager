import AppRoutes from "./routes/AppRoutes";
import { useAuthInitialize } from "./features/auth/useAuthInitialize";

function App() {
  useAuthInitialize();

  return <AppRoutes />;
}

export default App;
