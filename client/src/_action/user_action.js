import axios from 'axios';
import { LOGIN_USER, REGISTER_USER } from './types'

export const loginUser = (userData) => {
    const request = axios.post('/api/users/login', userData)
        .then(res => res.data)
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export const registerUser = (user) => {
    const request = axios.post('/api/users/register', user)
        .then(res => res.data)
    return {
        type: REGISTER_USER,
        payload: request
    }
}