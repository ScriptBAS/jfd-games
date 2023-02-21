import httpService from "./http.service";

const gameEndpoint = "games/";

const gameService = {
    get: async () => {
        const req = await httpService.get(gameEndpoint);
        return req.data;
    },
    add: async (payload) => {
        const req = await httpService.post(gameEndpoint, payload);
        return req.data;
    },
    update: async (payload) => {
        const req = await httpService.patch(
            gameEndpoint + payload._id,
            payload
        );
        return req.data;
    },
    delete: async (gameId) => {
        const req = await httpService.delete(gameEndpoint + gameId);
        return req.data;
    }
};
export default gameService;
