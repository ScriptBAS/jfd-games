import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getUsersLoadingStatus, loadUsersList } from "../store/users";
import {
    getDevelopersLoadingStatus,
    loadDevelopersList
} from "../store/developers";
import {
    getCategoriesLoadingStatus,
    loadCategoriesList
} from "../store/categories";
import { getGamesLoadingStatus, loadGamesList } from "../store/games";
import Loader from "../components/ui/Loader";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const gamesLoadingStatus = useSelector(getGamesLoadingStatus());
    const developersLoadingStatus = useSelector(getDevelopersLoadingStatus());
    const categoriesLoadingStatus = useSelector(getCategoriesLoadingStatus());
    const usersLoadingStatus = useSelector(getUsersLoadingStatus());

    useEffect(() => {
        dispatch(loadDevelopersList());
        dispatch(loadCategoriesList());
        dispatch(loadGamesList());
        dispatch(loadUsersList());
        // eslint-disable-next-line
    }, []);
    if (
        gamesLoadingStatus ||
        developersLoadingStatus ||
        categoriesLoadingStatus ||
        usersLoadingStatus
    )
        return <Loader />;

    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
