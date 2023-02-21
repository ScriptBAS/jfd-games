import React, { useState } from "react";
import { Link } from "react-router-dom";
import { paginate } from "../../utils/paginate";
import Card from "../Card";
import Pagination from "../common/pagination";
import PropTypes from "prop-types";

const CardsList = ({ items, path }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    const itemsCrop = paginate(items, currentPage, pageSize);
    const count = items.length;
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const urlText = path === "categories" ? "Перейти" : "Подробнее";

    if (!count) {
        return (
            <div className="container p-2 text-center">
                <h4>Ничего не найдено</h4>
                <Link to="/">
                    <h5>Вернуться на главную</h5>
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="row row-cols-1 row-cols-md-2 g-4 mt-1">
                {itemsCrop.map((item) => (
                    <div className="col" key={item._id}>
                        <Card data={item} />
                        <Link
                            className="d-block btn btn-warning mt-1"
                            to={`/${path}/${item._id}`}
                        >
                            {urlText}
                        </Link>
                    </div>
                ))}
            </div>

            <div className="pagination justify-content-center mt-2">
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    );
};

CardsList.propTypes = {
    items: PropTypes.array,
    path: PropTypes.string
};

export default CardsList;
