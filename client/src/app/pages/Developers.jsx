import React from "react";
import { useSelector } from "react-redux";
import CardsList from "../components/ui/CardsList";
import { getDevelopers } from "../store/developers";

const Developers = () => {
    const developers = useSelector(getDevelopers());
    return <CardsList items={developers} path={"developers"} />;
};

export default Developers;
