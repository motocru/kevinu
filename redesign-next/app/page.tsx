"use client";
import Nav from "../components/nav";
import Home from '../components/home/home';
import About from '../components/home/about';
import Projects from '../components/home/projects';
import Contact from '../components/home/contact';
import Resume from '../components/home/resume';
import "../components/home/home.css";

import { AiOutlineGithub } from "react-icons/ai";
import { AiOutlineLinkedin } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleIdCallback = (id: string) => {
    setActiveId(id);
  };

  return (
    <div>
      <Home idCallback={handleIdCallback} />

      <div className="nav-wrapper">
        <Nav activeId={activeId ?? "home"} />
      </div>

      <About idCallback={handleIdCallback} />
      <Projects idCallback={handleIdCallback} />
      <Resume idCallback={handleIdCallback} />
      <Contact idCallback={handleIdCallback} />

      <div className="footer">
        <p>Copyright © 2026 Kevin Urban. All rights reserved.</p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ padding: "0.5rem" }}>
            <Link href="https://github.com/motocru">
              <AiOutlineGithub className="footer-image" />
            </Link>
          </div>
          <div style={{ padding: "0.5rem" }}>
            <Link href="https://www.linkedin.com/in/kevin-u/">
              <AiOutlineLinkedin className="footer-image" />
            </Link>
          </div>
          <div style={{ padding: "0.5rem" }}>
            <Link href="mailto:urban.kevi@gmail.com">
              <AiOutlineMail className="footer-image" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

