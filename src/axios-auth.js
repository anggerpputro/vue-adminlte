import axios from "axios";

const instance = axios.create({
	// baseURL: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/"
	baseURL: "http://localhost:8090/"
});

export default instance;
