import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardsList from "../components/ui/CardsList";
import { getGamesByCategoryId } from "../store/games";

const CateroryPage = () => {
    const { categoryId } = useParams();
    const games = useSelector(getGamesByCategoryId(categoryId));

    return <CardsList items={games} path={"games"} />;
};

export default CateroryPage;
