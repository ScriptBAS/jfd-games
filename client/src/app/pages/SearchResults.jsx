import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CardsList from "../components/ui/CardsList";
import { getGames } from "../store/games";

const SearchResults = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    const games = useSelector(getGames());
    const findedGames = games.filter(
        (g) => g.name.toLowerCase().indexOf(query) >= 0
    );

    return <CardsList items={findedGames} path={"games"} />;
};

export default SearchResults;
