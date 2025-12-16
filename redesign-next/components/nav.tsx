export default function Nav() {
    return (
        <nav className="bg-black text-white p-4 flex justify-between items-center">
            <a href="/" className="hover:text-gray-300 transition-colors">Home</a>
            <ul className="flex gap-6">
                <li><a href="#about" className="hover:text-gray-300 transition-colors">About</a></li>
                <li><a href="#projects" className="hover:text-gray-300 transition-colors">Projects</a></li>
                <li><a href="#resume" className="hover:text-gray-300 transition-colors">Resume</a></li>
                <li><a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a></li>
            </ul>
        </nav>
    )
}