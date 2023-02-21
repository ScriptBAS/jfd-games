import React from "react";
import { useSelector } from "react-redux";
import CardsList from "../components/ui/CardsList";
import { getCategories } from "../store/categories";

const Categories = () => {
    const categories = useSelector(getCategories());
    return <CardsList items={categories} path={"categories"} />;
};

export default Categories;
