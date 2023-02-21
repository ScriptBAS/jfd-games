import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import CardsList from "../components/ui/CardsList";
import { getGamesByUserId } from "../store/games";
import { getCurrentUserId, getIsLoggedIn, getUserById } from "../store/users";

const UserPage = () => {
    const { userId } = useParams();
    const games = useSelector(getGamesByUserId(userId));
    const user = useSelector(getUserById(userId));
    const currentUserId = useSelector(getCurrentUserId());
    const isLoggedIn = useSelector(getIsLoggedIn());

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container text-center mt-2">
            <div className="row align-items-center">
                <div className="col-md-4">
                    <img
                        src={user.image}
                        className="img-fluid"
                        alt={user.name}
                    />
                </div>
                <div className="col-md-8">
                    <p className="fs-2">Информация о пользователе</p>
                    <p className="fs-3">
                        <span className="text-secondary">Имя:</span>{" "}
                        <span className="text-success">{user.name}</span>
                    </p>
                    <p className="fs-3">
                        <span className="text-secondary">Пол:</span>{" "}
                        <span className="text-success">
                            {user.sex === "male" ? "Мужской" : "Женский"}
                        </span>
                    </p>
                    {isLoggedIn && userId === currentUserId && (
                        <div className="row align-items-center mt-2 justify-content-around">
                            <Link
                                to="/profile"
                                className="btn btn-primary col-md-4 fs-5"
                            >
                                Перейти в профиль
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="row mt-2">
                <h3>{"Игры добавленные " + user.name}</h3>
                <CardsList items={games} path={"games"} />
            </div>
        </div>
    );
};

export default UserPage;
