import { Route, Routes } from "react-router-dom";

import {FrontIntroduction} from "./pages/FrontIntroduction";

import {Projects} from "./pages/Projects";

import { Contact } from "./pages/Contact";
import { DefaultLayout } from "./layouts/layout";
import { NoteficationProvider } from "./Context/NoteficationContext";


function App() {
  return (
    <NoteficationProvider>

      <Routes>
        <Route element = {<DefaultLayout />}>
          <Route element={<FrontIntroduction />} path="/" />
          <Route element={<Projects />} path="/projects" />
          <Route element={<Contact />} path="/contact" />
      
        </Route >
      </Routes>
    </NoteficationProvider>
  );
}

export default App;
