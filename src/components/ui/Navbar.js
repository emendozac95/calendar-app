import React from 'react'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                Pedro
            </span>

            <button className="btn btn-outline-danger">
                <span>Salir </span>
                <i className="fas fa-sign-out-alt"></i>
            </button>
        </nav>
    )
}