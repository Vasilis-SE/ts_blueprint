export default class LocalStorage {

    static getUserToken() {
        const token = localStorage.getItem('token');
        return token ? token : false;
    }

    static setUserToken(token: string) {
        return localStorage.setItem('token', token);
    }

    static deleteUserToken() {
        return localStorage.removeItem('token');
    }

    static clearLocalStorage() {
        return localStorage.clear();
    }

}