import React, { Component } from 'react';
import Link from 'next/link';

class Navigation extends Component {

    componentDidMount() {
        this.menu();
    }

    menu = () => {
        var dropdown = document.querySelector("nav .dropdown");
        var button = document.querySelector("nav .menu");
        if (dropdown.style.display === "none") {
            dropdown.style.display = "grid";
            button.innerHTML = "close";
        } else {
            dropdown.style.display = "none";
            button.innerHTML = "menu";
        }
        addEventListener("resize", () => {
            if (window.innerWidth > 700) {
                dropdown.style.display = "none";
                button.innerHTML = "menu";
            }
        });
    }

    render() {
        return(
            <div>
                <nav>
                    <div className="content">
                        <Link href="/">
                            <div className="nav-title">
                                <h1 style={{color: 'black'}}>Kevin-u.com</h1>
                            </div>
                        </Link>
                        <div className="links">
                            <Link href="/about">
                                <a>About</a>
                            </Link>
                            <Link href="/resume">
                                <a>Resume</a>
                            </Link>
                            <Link href="/projects">
                                <a>Projects</a>
                            </Link>
                        </div>
                        <i className="material-icons menu" onClick={() => this.menu()}>menu</i>
                    </div>
                    <div className="dropdown">
                      <Link href="/about">
                          <a>About</a>
                      </Link>
                      <Link href="/resume">
                          <a>Resume</a>
                      </Link>
                      <Link href="/projects">
                          <a>Projects</a>
                      </Link>
                    </div>
                </nav>
            

                <style jsx>{`
                    nav {
                        display: grid;
                        grid-template-rows: minmax(min-content, 100px) min-content;
                    }

                    nav a {
                      color: black;
                    }

                    nav .content {
                        background-color: var(--greyapple);
                        display: grid;
                        place-items: center;
                        grid-auto-flow: column;
                        align-content: space-evenly;
                    }

                    nav .nav-title:hover {
                        filter: opacity(80%);
                        cursor: pointer;
                        -webkit-user-select: none;
                    }

                    nav .content .menu {
                        display: none;
                    }

                    nav .content .menu:hover {
                        filter: opacity(50%);
                        cursor: pointer;
                        -webkit-user-select: none;
                        transition: 3s ease-out;
                    }

                    nav .content .links {
                        display: grid;
                        grid-gap: 15px;
                        place-items: center;
                        grid-auto-flow: column;
                        grid-auto-columns: minmax(min-content, 80px);
                    }

                    nav .dropdown {
                        background-color: var(--darkmatter);
                        text-align: center;
                        transition: 3s ease-out;
                    }

                    nav .dropdown a {
                        color: white;
                        padding: 20px;
                        
                    }

                    nav .dropdown a:hover {
                        color: black;
                        background-color: var(--greenapple);
                    }

                    @media only screen and (max-width: 700px) {
                        nav .content .menu { display: initial;}
                        nav .content .links { display: none;}
                    }
                `}</style>
            </div>
        );
    }
};

export default Navigation;