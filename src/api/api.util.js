import axios from 'axios';
import ApiConfig from './api.config.js'

export default {
    init () {
        axios.interceptors.request.use(
            function (config){
                config.headers['Authorization'] = `${ApiConfig.token}`;
                config.headers['Notion-Version'] = '2022-06-28';
                config.headers['Content-Type'] = 'application/json';
                return config
            }
        )
    },
    get(url, params){
        return axios.get(url, {params}).catch(error => {
            throw new Error(`[ApiService]\nerror: ${error} \nurl: ${url}`)
        })
    },
    post(url, params){
        return axios.post(url, params).catch(error => {
            throw new Error(`[ApiService]\nerror: ${error} \nurl: ${url}`)
        })
    },
    put(url, params){
        return axios.put(url, params).catch(error => {
            throw new Error(`[ApiService]\nerror: ${error} \nurl: ${url}`)
        })
    },
    patch(url, params){
        return axios.patch(url, params).catch(error => {
            throw new Error(`[ApiService]\nerror: ${error} \nurl: ${url}`)
        })
    },
    delete(url, params){
        return axios.delete(url, params).catch(error => {
            throw new Error(`[ApiService]\nerror: ${error} \nurl: ${url}`)
        })
    }
}