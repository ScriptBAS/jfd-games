import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../store/users";

const Profile = () => {
    const user = useSelector(getCurrentUserData());

    return (
        <div className="container mt-2">
            <div className="row align-items-center">
                <div className="col-md-4">
                    <img
                        src={user.image}
                        className="img-fluid"
                        alt={user.name}
                    />
                </div>
                <div className="col-md-8 fs-3">
                    <p>
                        <span className="text-secondary">Имя:</span>{" "}
                        <span className="text-success">{user.name}</span>
                    </p>
                    <p>
                        <span className="text-secondary">Email:</span>{" "}
                        <span className="text-success">{user.email}</span>
                    </p>
                    <p>
                        <span className="text-secondary">Пол:</span>{" "}
                        <span className="text-success">
                            {user.sex === "male" ? "Мужской" : "Женский"}
                        </span>
                    </p>
                </div>
            </div>
            <div className="row align-items-center mt-2 justify-content-around">
                <Link
                    to="/profile/edit"
                    className="btn btn-primary col-md-4 fs-6"
                >
                    Редактировать профиль
                </Link>
                <Link to="/logout" className="btn btn-danger col-md-4 fs-6">
                    Выйти
                </Link>
            </div>
        </div>
    );
};

export default Profile;
