import { Route, Routes } from "react-router-dom";

import {FrontIntroduction} from "@/Modules/FirstPageCombinedModules/FrontIntroduction";

import {Projects} from "@/Modules/project/Projects";

import { Contact } from "@/Modules/contact/Contact";
import { DefaultLayout } from "@/layouts/layout";
import { NoteficationProvider } from "@/context/NoteficationContext";


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
