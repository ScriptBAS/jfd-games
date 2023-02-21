import React, { useState } from "react";
import history from "../../utils/history";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const handleChange = (e) => {
        setSearch(e.target.value.trim().toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?q=${search}`);
    };

    return (
        <form className="d-flex" onSubmit={handleSubmit}>
            <input
                className="form-control me-2"
                onChange={handleChange}
                type="search"
                placeholder="Введите текст..."
                aria-label="Search"
            />
            <input className="btn btn-secondary" type="submit" value="Найти" />
        </form>
    );
};

export default SearchInput;
