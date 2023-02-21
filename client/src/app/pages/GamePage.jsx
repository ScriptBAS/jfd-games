import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comments from "../components/Comments";
import { getCategoriesById } from "../store/categories";
import { getDeveloperbyId } from "../store/developers";
import { removeGame } from "../store/games";
import {
    getCurrentUserId,
    getCurrentUserIsAdmin,
    getUserById
} from "../store/users";
import PropTypes from "prop-types";

const GamePage = ({ game }) => {
    const dispatch = useDispatch();
    const { name: developerName } = useSelector(
        getDeveloperbyId(game.developer)
    );
    const { name: autorName } = useSelector(getUserById(game.authorId));
    const createdAt = new Date(game.createdAt).toLocaleDateString();
    const categories = useSelector(getCategoriesById(game.categories));
    const currentUserId = useSelector(getCurrentUserId());
    const userIsAdmin = useSelector(getCurrentUserIsAdmin());

    const handleDelete = (id) => {
        const isConfirm = window.confirm(
            "Вы действительно хотите удалить игру?"
        );
        if (isConfirm) {
            dispatch(removeGame(id));
        }
    };

    return (
        <div className="container w-75 mt-2">
            <div className="container">
                <div className="row align-items-center bg-secondary bg-gradient text-center text-light p-2 rounded">
                    <div className="col">
                        Автор:{" "}
                        <Link
                            to={"/users/" + game.authorId}
                            className="text-decoration-none text-warning"
                        >
                            {autorName}
                        </Link>
                    </div>
                    <div className="col">
                        Разработчик:{" "}
                        <Link
                            to={"/developers/" + game.developer}
                            className="text-decoration-none text-warning"
                        >
                            {developerName}
                        </Link>
                    </div>
                    <div className="col">Добавлено: {createdAt}</div>
                </div>
            </div>

            <div className="col">
                <div className="card">
                    <img
                        src={game.image}
                        className="card-img"
                        alt={game.name}
                    />

                    {(userIsAdmin || currentUserId === game.authorId) && (
                        <div className="card-img-overlay fs-3">
                            <Link
                                to={"/games/" + game._id + "/edit"}
                                className="link-light"
                            >
                                <i className="bi bi-pencil-square card-title"></i>
                            </Link>
                            <Link onClick={() => handleDelete(game._id)}>
                                <i className="bi bi-trash3-fill link-danger"></i>
                            </Link>
                        </div>
                    )}
                    <div className="card-body">
                        <h5 className="card-title">{game.name}</h5>
                        <p className="card-text">{game.content}</p>
                    </div>
                </div>
                <div className="col align-items-center bg-secondary bg-gradient text-light p-2 mt-1 rounded">
                    {"Категории: "}
                    {categories.map((category) => (
                        <Link
                            to={"/categories/" + category._id}
                            key={category._id}
                            className="text-decoration-none text-warning"
                        >{`${category.name} `}</Link>
                    ))}
                </div>
                <div className="mt-2">
                    <Comments />
                </div>
            </div>
        </div>
    );
};

GamePage.propTypes = {
    game: PropTypes.object.isRequired
};

export default GamePage;
