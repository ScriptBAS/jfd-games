import { createSlice } from "@reduxjs/toolkit";
import developerService from "../services/developer.service";
import isOutdated from "../utils/isOutdated";

const developersSlice = createSlice({
    name: "developers",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        developersRequested: (state) => {
            state.isLoading = true;
        },
        developersReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        developersRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: developersReducer, actions } = developersSlice;
const { developersRequested, developersReceived, developersRequestFiled } =
    actions;

export const loadDevelopersList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().developers;
    if (isOutdated(lastFetch)) {
        dispatch(developersRequested());
        try {
            const { content } = await developerService.get();
            dispatch(developersReceived(content));
        } catch (error) {
            dispatch(developersRequestFiled(error.message));
        }
    }
};
export const getDevelopers = () => (state) => state.developers.entities;
export const getDevelopersLoadingStatus = () => (state) =>
    state.developers.isLoading;
export const getDeveloperbyId = (id) => (state) => {
    if (state.developers.entities) {
        return state.developers.entities.find((p) => p._id === id);
    }
};

export default developersReducer;
