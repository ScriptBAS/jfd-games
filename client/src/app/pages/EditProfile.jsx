import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RadioField from "../components/common/form/radioField";
import TextField from "../components/common/form/textField";
import Loader from "../components/ui/Loader";
import { getCurrentUserData, updateUser } from "../store/users";
import { validator } from "../utils/validator";

const EditProfile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const currentUser = useSelector(getCurrentUserData());
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(updateUser(data));
    };

    useEffect(() => {
        if (currentUser) {
            setData(currentUser);
        }
    }, [currentUser]);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
        // eslint-disable-next-line
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должено состаять миниму из 3 символов",
                value: 3
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };

    useEffect(
        () => {
            validate();
        },
        // eslint-disable-next-line
        [data]
    );

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <RadioField
                                options={[
                                    { name: "Мужской", value: "male" },
                                    { name: "Женский", value: "female" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
