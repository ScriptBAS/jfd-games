import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import GamePage from "../pages/GamePage";
import { getGameById } from "../store/games";

const GamePageLayout = () => {
    const { gameId } = useParams();
    const game = useSelector(getGameById(gameId));

    if (!game) {
        return <Navigate to="/games" />;
    }

    return <GamePage game={game} />;
};

export default GamePageLayout;
