import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = ({ categories }) => {
    return (
        <div className="list-group text-center">
            <Link
                to="/categories"
                className="list-group-item bg-dark text-white"
            >
                Категории
            </Link>
            {categories.map((с) => (
                <Link
                    className="list-group-item btn btn-warning"
                    to={"/categories/" + с._id}
                    key={с._id}
                >
                    {с.name}
                </Link>
            ))}
            <Link
                to="/developers"
                className="list-group-item bg-dark text-white"
            >
                Разработчики
            </Link>
        </div>
    );
};

Sidebar.propTypes = {
    categories: PropTypes.array
};

export default Sidebar;
