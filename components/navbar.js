import React, { Component } from 'react';
import Link from 'next/link';

class Navigation extends Component {
    render() {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <a className="navbar-brand" href="#">Kevin-u.com</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor" aria-controls="navbarColor" aria-expanded="false" aria-label="Toggle Navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link href="/">
                                    <a className="nav-link">Home
                                        <span className="sr-only">(Current)</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/about">
                                    <a className="nav-link">About</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/resume">
                                    <a className="nav-link">Resume</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/projects">
                                    <a className="nav-link">Projects</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
};

export default Navigation;