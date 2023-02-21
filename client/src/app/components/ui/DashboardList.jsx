import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeGame } from "../../store/games";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import PropTypes from "prop-types";

const DashboardList = ({ items }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const pageSize = 10;
    const itemsCrop = paginate(items, currentPage, pageSize);
    const count = items.length;
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleDelete = (id) => {
        const isConfirm = window.confirm(
            "Вы действительно хотите удалить игру?"
        );
        if (isConfirm) {
            dispatch(removeGame(id));
        }
    };

    if (!count) {
        return (
            <div className="container p-2 text-center">
                <h4>Ничего не найдено</h4>
            </div>
        );
    }

    return (
        <>
            <ul className="list-group">
                {itemsCrop.map((item, i) => (
                    <li
                        className={
                            "list-group-item d-flex justify-content-between align-items-center list-group-item" +
                            (i % 2 === 0 ? "-dark" : "-light")
                        }
                        key={item._id}
                    >
                        <Link
                            className="text-decoration-none link-dark"
                            to={`/games/${item._id}`}
                        >
                            {item.name}
                        </Link>
                        <span>
                            <Link
                                to={"/games/" + item._id + "/edit"}
                                className="link-dark"
                            >
                                <i className="bi bi-pencil-square card-title"></i>
                            </Link>
                            &nbsp;
                            <Link onClick={() => handleDelete(item._id)}>
                                <i className="bi bi-trash3-fill link-danger"></i>
                            </Link>
                        </span>
                    </li>
                ))}
            </ul>

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

DashboardList.propTypes = {
    items: PropTypes.array.isRequired
};

export default DashboardList;
