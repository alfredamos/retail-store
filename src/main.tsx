import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "mdbootstrap/css/mdb.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import App from './App.tsx'


const queryClient = new QueryClient();

import store from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
