import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/App.tsx";
import { Provider } from "@/provider.tsx";
import "@/styles/globals.css";
// import { DefaultLayout } from "./layouts/layout.tsx";
// import { Show } from "./testingnewcodes/show.tsx";
// import { Techshow } from "./testingnewcodes/techshow.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        
          <App />
           {/* <Show />
          <Techshow />
          */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
