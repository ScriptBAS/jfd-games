import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../store/categories";
import { getDevelopers } from "../store/developers";
import { addGame } from "../store/games";
import TextAreaField from "../components/common/form/textAreaField";
import { Navigate } from "react-router-dom";
import { getIsLoggedIn } from "../store/users";
import TextField from "../components/common/form/textField";
import SelectField from "../components/common/form/selectField";
import MultiSelectField from "../components/common/form/multiSelectField";
import useForm from "../hooks/useForm";

const AddGame = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const newData = {
            ...data,
            categories: data.categories.map((c) => c.value)
        };
        dispatch(addGame(newData));
    };

    const data = {
        name: "",
        image: "",
        developer: "",
        categories: [],
        content: ""
    };

    const { form, handleSubmit, handleChange, errors } = useForm(
        data,
        onSubmit
    );

    const categories = useSelector(getCategories());
    const categoriesList = categories.map((c) => ({
        label: c.name,
        value: c._id
    }));

    const developers = useSelector(getDevelopers());
    const developersList = developers.map((d) => ({
        label: d.name,
        value: d._id
    }));

    const isValid = Object.keys(errors).length === 0;

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

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
                            error={errors.categories}
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Добавить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddGame;
