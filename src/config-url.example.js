const laravelHostname =
	process.env.NODE_ENV === "production"
		? "https://app.pdamkotasmg.co.id:58080"
		: "http://localhost:8000";

const vueHostname =
	process.env.NODE_ENV === "production"
		? "https://app.pdamkotasmg.co.id/pdamsurvey"
		: "http://localhost:58080";

const apiBaseURL = laravelHostname + "/api/";
const authBaseURL = laravelHostname + "/api/auth/";

const vRedirectUri = vueHostname + "/auth/callback/";
const vLogoutUri = vueHostname + "/";
const vDashboardUri = vueHostname + "/";

module.exports = {
	laravelHostname,
	apiBaseURL,
	authBaseURL,
	vueHostname,
	vRedirectUri,
	vLogoutUri,
	vDashboardUri
};
