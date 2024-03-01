import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./app"; // Fix the file name to match the actual file name

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

