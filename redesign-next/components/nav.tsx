import Link from "next/link";
import './nav.css';

export default function Nav({ activeId }: { activeId: string }) {

    const getActive = (id: string) => {
        return `nav-text ${id === activeId ? "active" : ""}`;
    }

    return (
        <nav className="nav-bar">
            <Link href="/" className={getActive("home")}>Home</Link>
            <ul className="flex gap-6">
                <li><Link href="#about" className={getActive("about")}>About</Link></li>
                <li><Link href="#projects" className={getActive("projects")}>Projects</Link></li>
                <li><Link href="#resume" className={getActive("resume")}>Resume</Link></li>
                <li><Link href="#contact" className={getActive("contact")}>Contact</Link></li>
            </ul>
        </nav>
    )
}