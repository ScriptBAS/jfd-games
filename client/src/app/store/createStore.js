import commentsReducer from "./comments";
import developersReducer from "./developers";
import categoriesReducer from "./categories";
import usersReducer from "./users";
import gamesReducer from "./games";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    categories: categoriesReducer,
    developers: developersReducer,
    games: gamesReducer,
    users: usersReducer,
    comments: commentsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
