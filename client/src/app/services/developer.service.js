import httpService from "./http.service";

const developerEndpoint = "developer/";

const developerService = {
    get: async () => {
        const req = await httpService.get(developerEndpoint);
        return req.data;
    }
};
export default developerService;
