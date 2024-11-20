import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import { routes } from "./routes/routes";

function App() {
  return (
    <DashboardLayout>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </DashboardLayout>
  );
}

export default App;
