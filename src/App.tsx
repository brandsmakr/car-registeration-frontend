import { AppRoutes } from "./routes/app.routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const appRoute = AppRoutes.map(({ Component, children }, key) => (
    <Route key={key} element={<Component />}>
      {children.map(({ path, Component }, key) => (
        <Route key={key} path={path} element={<Component />} />
      ))}
    </Route>
  ));
  return (
    <BrowserRouter>
      <Routes>{appRoute}</Routes>
    </BrowserRouter>
  );
}

export default App;
