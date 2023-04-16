// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="login-title">
      <h1>DM Friends</h1>
      <Outlet />
    </div>
  );
}

export default App;
