import Nav from "@/components/nav";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="nav-wrapper" style={{ paddingBottom: "2rem" }}>
                <Nav activeId={"projects"} />
            </div>
            {children}
        </div>
    );
}