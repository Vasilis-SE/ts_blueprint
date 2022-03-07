export default class LocalStorage {

    static getData(key: string) {
        const token = localStorage.getItem(key);
        return token ? token : false;
    }

    static setData(token: string, key: string) {
        return localStorage.setItem(key, token);
    }

    static deleteData(key: string) {
        return localStorage.removeItem(key);
    }

    static clearLocalStorage() {
        return localStorage.clear();
    }

}