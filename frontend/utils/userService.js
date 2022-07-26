import http from './httpService';

export function registerUser(req) {
    return http.post('http://localhost:3000/api/users', req);
}

export function loginUser(req) {
    return http.post('http://localhost:3000/api/login', req);
}

