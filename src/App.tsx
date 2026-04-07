import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Shell from "@/components/Shell";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Project from "@/pages/Project";
import LevelDesignerDraft from "@/pages/LevelDesignerDraft";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Shell />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/draft/level-designer" element={<LevelDesignerDraft />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
