import { useEffect, useState } from "react";
import { validator } from "../utils/validator";
import PropTypes from "prop-types";

const useForm = (initialState = {}, onSubmit) => {
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(form);
    };

    const handleChange = (target) => {
        setForm((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        content: {
            isRequired: {
                message: "Описание обязательно для заполнения"
            }
        },
        image: {
            isRequired: {
                message: "Добавьте ссылку на изображение"
            }
        },
        name: {
            isRequired: {
                message: "Поле не может быть пустым"
            },
            min: {
                message: "Минимальная длина 3 символа",
                value: 3
            }
        },
        developer: {
            isRequired: {
                message: "Обязательно выберите разработчика"
            }
        },
        categories: {
            isSelected: {
                message: "Обязательно выберите категории"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
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

    const validate = () => {
        const errors = validator(form, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    return { handleChange, handleSubmit, form, errors };
};

useForm.propTypes = {
    initialState: PropTypes.object,
    onSubmit: PropTypes.func
};

export default useForm;
