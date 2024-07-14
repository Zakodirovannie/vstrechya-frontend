import axios from "axios";
import {getCookie} from "./cookie";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://engine.vstrechya.space/",
});

// Интерсептор для запросов
instance.interceptors.request.use(config => {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Интерсептор для ответов
instance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        // Обработка ошибки неавторизованного доступа
        console.error('Unauthorized access - possibly redirect to login');
        // Можно, например, редиректить на страницу логина
        // window.location.assign('https://vstrechya.space/login');
    }
    return Promise.reject(error);
});