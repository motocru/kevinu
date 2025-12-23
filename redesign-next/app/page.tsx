"use client";
import Nav from "../components/nav";
import Home from '../components/home/home';
import About from '../components/home/about';
import Projects from '../components/home/projects';
import Contact from '../components/home/contact';
import Resume from '../components/home/resume';
import "../components/home/home.css";

export default function HomePage() {

  return (
    <div>
      <Home />
      <div className="nav-bar">
        <Nav />
      </div>
      <About />
      <Projects />
      <Resume />
      <Contact />
    </div>
  );
}

