import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "../components/common/comments";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../store/comments";
import Loader from "./ui/Loader";

const Comments = () => {
    const { gameId } = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    useEffect(() => {
        dispatch(loadCommentsList(gameId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameId]);

    const handleSubmit = (data) => {
        dispatch(createComment({ ...data, pageId: gameId }));
    };

    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };

    const sortedComments = orderBy(comments, ["createdAt"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Комментарии</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
