import React from "react";
import { useSelector } from "react-redux";
import CardsList from "../components/ui/CardsList";
import { getGames } from "../store/games";

const Games = () => {
    const games = useSelector(getGames());

    return <CardsList items={games} path={"games"} />;
};

export default Games;
