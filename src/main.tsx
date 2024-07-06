import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import App from './App'
import SectionDetails from "./routes/SectionDetails";
import quoteReducer from "./store/quoteSlice";
import quoteSaga from "./store/quoteSaga";
import "./index.css";

const saga = createSagaMiddleware();

const store = configureStore({
	reducer: {
		quotes: quoteReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});

saga.run(quoteSaga);

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "set-section-details",
		element: <SectionDetails />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
	</React.StrictMode>
);
