import axios from "axios";
import configUrl from "./config-url";

const instance = axios.create({
	// baseURL: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/"
	// baseURL: "http://localhost:50080/api/auth/"
	// baseURL: "http://192.168.1.3:8000/api/auth/"
	baseURL: configUrl.authBaseURL
});

export default instance;
