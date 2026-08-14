import { Configuration } from "./generated";
const apiConfiguration = new Configuration({
    basePath: import.meta.env.VITE_API_BASE_URL,
    accessToken: () => {
        return sessionStorage.getItem("access_token") ?? "";
    },
});
export default apiConfiguration;
// This code snippet is creating a new instance of the Configuration class from the generated API code.
