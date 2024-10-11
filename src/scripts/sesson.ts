export class Session {

    constructor(public key: string) { }

    get() {
       return sessionStorage.getItem(this.key);
    }
    set(user: any) {
        sessionStorage.setItem(this.key, JSON.stringify(user));
    }
    update(user: any) {
        debugger
        sessionStorage.clear();
        sessionStorage.setItem(this.key, JSON.stringify(user));
    }
    remove() {
        sessionStorage.removeItem(this.key);
    }
}