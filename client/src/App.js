import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

// import pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// import components
import NavBar from "./pages/components/Navbar";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<div className="flex-column justify-flex-start min-100-vh">
					<NavBar />
				</div>
				<div className="container">
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;
