import axios from "axios";

const instance = axios.create({
	// baseURL: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/"
	baseURL: "http://localhost:81/pdampengaduan/api/auth/"
});

export default instance;
