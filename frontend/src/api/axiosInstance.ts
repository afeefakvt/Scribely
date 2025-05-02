import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../store/store";
import { loginSuccess, logout } from "../store/userSlice";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const status = error.response.status;
    //   const message = error.response.data?.message;

      if (status === 401) {
        store.dispatch(logout());
        Cookies.remove("authToken");
        return Promise.reject(error);
      }
      if (status === 403) {
        if (!error.config._retry) {
          error.config._retry = true;

          try {
            console.log("403 error - trying to refresh token");
            const refreshResponse = await axiosInstance.post("/refreshToken");
            if (!refreshResponse?.data?.token) {
              throw new Error("No new access token recieved");
            }
            console.log(
              "new access token recieved",
              refreshResponse.data.token
            );

            store.dispatch(
              loginSuccess({
                accessToken: refreshResponse.data.token,
                user: store.getState().auth.user,
                isAuthenticated: true,
              })
            );
            error.config.headers[
              "Authorization"
            ] = `Bearer ${refreshResponse.data.token}`;
            return axiosInstance(error.config);
          } catch (refreshError) {
            console.error("Refresh token invalid or expired", refreshError);
            store.dispatch(logout());
            Cookies.remove("authToken");
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        }
      }
    }
    return Promise.reject(error);

  }
);
