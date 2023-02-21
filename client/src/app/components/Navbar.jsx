import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserIsAdmin, getIsLoggedIn } from "../store/users";
import SearchInput from "./ui/SearchInput";

const Navbar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const [open, setOpen] = useState(false);
    const isAdmin = useSelector(getCurrentUserIsAdmin());
    const handleClick = () => {
        setOpen((prevState) => !prevState);
    };

    const show = open ? " show" : "";
    const collapsed = open ? " collapsed" : "";

    return (
        <nav className="navbar navbar-expand-lg bg-warning rounded mt-2">
            <div className="container-fluid">
                <button
                    className={"navbar-toggler" + collapsed}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar"
                    aria-controls="navbar"
                    aria-expanded={open}
                    aria-label="Toggle navigation"
                    onClick={handleClick}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={"collapse navbar-collapse" + show} id="navbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-semibold">
                        <li className="nav-item">
                            <Link
                                to="/"
                                className="nav-link"
                                onClick={handleClick}
                            >
                                Главная
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/games"
                                onClick={handleClick}
                            >
                                Игры
                            </Link>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                        to="/games/add"
                                        className="nav-link"
                                        onClick={handleClick}
                                    >
                                        Добавить игру
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="/profile"
                                        className="nav-link"
                                        onClick={handleClick}
                                    >
                                        Профиль
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/login"
                                    onClick={handleClick}
                                >
                                    Войти
                                </Link>
                            </li>
                        )}
                        {isAdmin && (
                            <li className="nav-item">
                                <Link
                                    to="/admin"
                                    className="nav-link"
                                    onClick={handleClick}
                                >
                                    Админпанель
                                </Link>
                            </li>
                        )}
                    </ul>
                    <SearchInput />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
