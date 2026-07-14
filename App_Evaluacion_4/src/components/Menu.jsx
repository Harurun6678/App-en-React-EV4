import {BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Local from "./Imagenes";
import Home from "./Home";
import Formulario from "./Formulario";

function Menu() {
    return (
        <div className="container mt-4">
            <BrowserRouter>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded shadow-sm px-3 py-3">
                    <div className="container-fluid justify-content-center">
                        <div className="d-flex gap-4 justify-content-center flex-wrap">
                            <NavLink to="/" className="btn btn-primary">Home</NavLink>
                            <NavLink to="/Formulario" className="btn btn-danger">Formulario</NavLink>
                            <NavLink to="/imagenes" className="btn btn-success">Imagenes</NavLink>
                        </div>
                    </div>
                </nav>

                <div className="mt-4 p-4 bg-light rounded shadow-sm">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Formulario" element={<Formulario />} />
                        <Route path="/imagenes" element={<Local />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default Menu;