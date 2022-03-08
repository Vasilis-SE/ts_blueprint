export default class LocalStorageStore {

    static getData(key: string) {
        if (typeof window == 'undefined') return false;
        const token = localStorage.getItem(key);
        return token ? token : false;
    }

    static setData(token: string, key: string) {
        if (typeof window == 'undefined') return false;
        return localStorage.setItem(key, token);
    }

    static deleteData(key: string) {
        if (typeof window == 'undefined') return false;
        return localStorage.removeItem(key);
    }

    static clearLocalStorage() {
        if (typeof window == 'undefined') return false;
        return localStorage.clear();
    }

}