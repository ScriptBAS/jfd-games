import React from "react";
import { useSelector } from "react-redux";
import TextField from "../components/common/form/textField";
import RadioField from "../components/common/form/radioField";
import { useDispatch } from "react-redux";
import { getIsLoggedIn, signUp } from "../store/users";
import { Link, Navigate } from "react-router-dom";
import useForm from "../hooks/useForm";

const Register = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const dispatch = useDispatch();
    const data = {
        email: "",
        password: "",
        sex: "male",
        name: ""
    };

    const onSubmit = (form) => {
        dispatch(signUp(form));
    };

    const { form, handleSubmit, handleChange, errors } = useForm(
        data,
        onSubmit
    );

    const isValid = Object.keys(errors).length === 0;

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            label="Имя"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <RadioField
                            options={[
                                { name: "Мужской", value: "male" },
                                { name: "Женский", value: "female" }
                            ]}
                            value={form.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Выберите ваш пол"
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Submit
                        </button>
                    </form>
                    <p>
                        Зарегистрированы? <Link to="/login">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
