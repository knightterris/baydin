import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Blogs from "./Blogs";
import Numbers from "./Numbers";
import Answers from "./Answers";
import History from "./History";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/blogs",
		element: <Blogs />,
	},
	{
		path: "/numbers",
		element: <Numbers />,
	},
	{
		path: "/answers",
		element: <Answers />,
	},
	{
		path: "/history",
		element: <History />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);