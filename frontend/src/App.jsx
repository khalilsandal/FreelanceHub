
import AppRoutes from "./routes/AppRoutes.jsx";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/FreelanceHub">
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
