import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import DashboardList from "../components/ui/DashboardList";
import { getGames } from "../store/games";
import { getCurrentUserData, getIsLoggedIn } from "../store/users";

const Dashboard = () => {
    const user = useSelector(getCurrentUserData());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const allGames = useSelector(getGames());
    const [search, setSearch] = useState("");
    const [games, setGames] = useState([]);

    useEffect(() => {
        setGames(allGames);
    }, [allGames]);

    const handleChange = (e) => {
        setSearch(e.target.value.trim().toLowerCase());
    };

    useEffect(() => {
        setGames(
            allGames.filter(
                (game) => game.name.toLowerCase().indexOf(search) >= 0
            )
        );
        // eslint-disable-next-line
    }, [search]);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (!user.isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container mt-2">
            <input
                className="form-control me-2 my-2"
                onChange={(e) => handleChange(e)}
                placeholder="Введите текст..."
            />
            <DashboardList items={games} />
        </div>
    );
};

export default Dashboard;
