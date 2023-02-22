import React, { useState } from "react";
import Comment from "./comment";
import PropTypes from "prop-types";
import Pagination from "../pagination";
import { paginate } from "../../../utils/paginate";

const CommentsList = ({ comments, onRemove }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    const count = comments.length;
    const commentsCrop = paginate(comments, currentPage, pageSize);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    return (
        <>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Комментарии</h2>
                    <hr />
                    {commentsCrop.map((comment) => (
                        <Comment
                            key={comment._id}
                            {...comment}
                            onRemove={onRemove}
                        />
                    ))}
                </div>
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

CommentsList.propTypes = {
    comments: PropTypes.array,
    onRemove: PropTypes.func
};

export default CommentsList;
