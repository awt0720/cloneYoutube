import axios from 'axios';
import { LOGIN_USER } from './types'

export const loginUser = (userData) => {
    const request = axios.post('/api/users/login', userData)
        .then(res => res.data)
    return {
        type: LOGIN_USER,
        payload: request
    }
}