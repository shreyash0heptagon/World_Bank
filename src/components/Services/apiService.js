
const api = {
	axiosCall(apiUrl, params, method, querystring) {
		const axios = require('axios');
		const fullUrl = 'https://wb-poc.heptagon.tech' + apiUrl;
		console.log(fullUrl);
		const requestAxios = {
			method: method,
			url: querystring ? this.convertUrl(fullUrl, params) : fullUrl,
			headers: { 'Content-Type': 'application/json' },
		};
		if (method === 'POST') {
			requestAxios['data'] = params;
		}

		return axios(requestAxios)
			.then((response) => response.data)
			.catch(error => {
				console.error('There was an error!', error);
			})
	},

	convertUrl(apiUrl, params) {
		apiUrl += '?';
		let query = Object.keys(params).map(k =>
			encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
		).join('&');
		apiUrl += query;

		return apiUrl;
	}
}

export default api;