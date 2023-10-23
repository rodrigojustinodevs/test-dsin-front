import axios from "axios";

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8004/api', 
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
});

const AUTH_TOKEN_LOCAL_STORAGE_KEY = "@Auth:token";




api.interceptors.request.use(
  (config) => {
      const storageToken = localStorage.getItem(
			  AUTH_TOKEN_LOCAL_STORAGE_KEY
			);
		
			if (storageToken) {
				config.headers.Authorization = `Bearer ${storageToken}`;
			}
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    
    return response;
  },
  (error) => {
   
    return Promise.reject(error);
  }
);
