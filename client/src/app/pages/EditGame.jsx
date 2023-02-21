import React from "react";
import Loader from "../components/ui/Loader";
import TextField from "../components/common/form/textField";
import TextAreaField from "../components/common/form/textAreaField";
import SelectField from "../components/common/form/selectField";
import MultiSelectField from "../components/common/form/multiSelectField";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../store/categories";
import { getDevelopers } from "../store/developers";
import { getGameById, updateGame } from "../store/games";
import { Navigate, useParams } from "react-router-dom";
import { getCurrentUserId, getCurrentUserIsAdmin } from "../store/users";
import useForm from "../hooks/useForm";

const EditGame = () => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUserId());
    const { gameId } = useParams();
    const currentGame = useSelector(getGameById(gameId));
    const userIsAdmin = useSelector(getCurrentUserIsAdmin());
    const categories = useSelector(getCategories());

    const data = {
        ...currentGame,
        categories: transformData(currentGame.categories)
    };

    const onSubmit = (form) => {
        const newData = {
            ...form,
            categories: form.categories.map((c) => c.value)
        };
        dispatch(updateGame(newData));
    };

    const { form, handleSubmit, handleChange, errors } = useForm(
        data,
        onSubmit
    );

    const categoriesList = categories.map((category) => ({
        label: category.name,
        value: category._id
    }));

    function transformData(data) {
        const result = getCategoriesListByIds(data).map((category) => ({
            label: category.name,
            value: category._id
        }));

        return result;
    }

    function getCategoriesListByIds(categoryIds) {
        const categoriesArray = [];
        for (const categoryId of categoryIds) {
            for (const category of categories) {
                if (category._id === categoryId) {
                    categoriesArray.push(category);
                    break;
                }
            }
        }
        return categoriesArray;
    }

    const developers = useSelector(getDevelopers());

    const developersList = developers.map((d) => ({
        label: d.name,
        value: d._id
    }));

    const isValid = Object.keys(errors).length === 0;

    if (currentUserId !== currentGame.authorId) {
        if (!userIsAdmin) {
            return <Navigate to="/games" />;
        }
    }

    if (!form) {
        return <Loader />;
    } else {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Название"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                name="image"
                                label="Изображение"
                                value={form.image}
                                onChange={handleChange}
                                error={errors.image}
                            />
                            <TextAreaField
                                label="Описание"
                                type="content"
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                error={errors.content}
                            />
                            <SelectField
                                label="Выберите разработчика"
                                defaultOption="Choose..."
                                name="developer"
                                options={developersList}
                                onChange={handleChange}
                                value={form.developer}
                                error={errors.developer}
                            />
                            <MultiSelectField
                                options={categoriesList}
                                onChange={handleChange}
                                name="categories"
                                label="Выберите категории"
                                defaultValue={form.categories}
                                error={errors.categories}
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Изменить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default EditGame;
