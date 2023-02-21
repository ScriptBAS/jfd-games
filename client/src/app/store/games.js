import { createAction, createSlice } from "@reduxjs/toolkit";
import gameService from "../services/game.service";
import gameservice from "../services/game.service";
import isOutdated from "../utils/isOutdated";
import history from "../utils/history";

const gamesSlice = createSlice({
    name: "games",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        gamesRequested: (state) => {
            state.isLoading = true;
        },
        gamesReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        gamesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        gameRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: gamesReducer, actions } = gamesSlice;
const { gamesRequested, gamesReceived, gamesRequestFailed, gameRemoved } =
    actions;

const addGameRequested = createAction("games/addGameRequested");
const addGameRequestFailed = createAction("games/addGameRequestFailed");
const gameRequestSuccess = createAction("games/gameRequestSuccess");
const updateGameRequested = createAction("games/updateGameRequested");
const updateGameRequestSuccess = createAction("games/updateGameRequestSuccess");
const updateGameRequestFailed = createAction("games/updateGameRequestFailed");
const removeGameRequested = createAction("games/removeGameRequested");
const gameRemoveRequestFailed = createAction("games/gameRemoveRequestFailed");

export const loadGamesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().games;
    if (isOutdated(lastFetch)) {
        dispatch(gamesRequested());
        try {
            const { content } = await gameservice.get();
            dispatch(gamesReceived(content));
        } catch (error) {
            dispatch(gamesRequestFailed(error.message));
        }
    }
};

export const addGame = (payload) => async (dispatch) => {
    dispatch(addGameRequested());
    try {
        const data = await gameService.add(payload);
        const gameId = data.content._id;
        dispatch(gameRequestSuccess());
        history.push(`/games/${gameId}`);
    } catch (error) {
        dispatch(addGameRequestFailed(error.message));
    }
};

export const updateGame = (payload) => async (dispatch) => {
    dispatch(updateGameRequested());
    try {
        const { content } = await gameService.update(payload);
        const gameId = content._id;
        dispatch(updateGameRequestSuccess());
        history.push(`/games/${gameId}`);
    } catch (error) {
        dispatch(updateGameRequestFailed(error.message));
    }
};

export const getGames = () => (state) => state.games.entities;
export const getGamesLoadingStatus = () => (state) => state.games.isLoading;
export const getGameById = (id) => (state) => {
    if (state.games.entities) {
        return state.games.entities.find((g) => g._id === id);
    }
};
export const getGamesByCategoryId = (id) => (state) => {
    if (state.games.entities) {
        return state.games.entities.filter((g) => g.categories.includes(id));
    }
};
export const getGamesByDeveloperId = (id) => (state) => {
    if (state.games.entities) {
        return state.games.entities.filter((g) => g.developer === id);
    }
};
export const getGamesByUserId = (id) => (state) => {
    if (state.games.entities) {
        return state.games.entities.filter((g) => g.authorId === id);
    }
};

export const removeGame = (gameId) => async (dispatch) => {
    dispatch(removeGameRequested());
    try {
        const { content } = await gameService.delete(gameId);
        if (!content) {
            dispatch(gameRemoved(gameId));
        }
    } catch (error) {
        dispatch(gameRemoveRequestFailed(error.message));
    }
};

export default gamesReducer;
