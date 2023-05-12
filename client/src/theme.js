import { createTheme } from "@mui/material";

const theme = createTheme({
	palette: {
		type: "light",
		primary: {
			main: "#454545",
		},
		secondary: {
			main: "#B0BBBF",
		},
		error: {
			main: "#ff0303",
		},
		warning: {
			main: "#ffd93d",
		},
		info: {
			main: "#058ED9",
		},
		success: {
			main: "#748E54",
		},
	},
});

export { theme };
