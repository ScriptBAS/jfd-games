import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../components/common/form/textField";
import { getAuthErrors, getIsLoggedIn, login } from "../store/users";
import { Link, Navigate } from "react-router-dom";
import useForm from "../hooks/useForm";

const Login = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const data = {
        email: "",
        password: ""
    };

    const onSubmit = (e) => {
        dispatch(login({ payload: form }));
    };

    const { form, handleSubmit, handleChange, errors } = useForm(
        data,
        onSubmit
    );

    const dispatch = useDispatch();

    const loginError = useSelector(getAuthErrors());

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
                            label="Пароль"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        {loginError && (
                            <p className="text-danger">{loginError}</p>
                        )}

                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Submit
                        </button>
                    </form>
                    <p>
                        Нет аккаунта? <Link to="/register">Регистрация</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
