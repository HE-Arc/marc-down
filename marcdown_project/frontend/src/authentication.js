import query from "./helpers.js";

class Authentication {
    constructor() {
        this._loggedIn = false;
        this._username = "";
        this._loaded = false;
    }

    _loadInfo() {
        return new Promise((resolve, reject) => {
            if (this._loaded) {
                resolve();
            } else {
                query("/api/user").then((result) => {
                    if (result.id !== undefined) {
                        this._loggedIn = true;
                        this._username = result.name;
                    }

                    resolve();
                }).catch((err) => {
                    console.error(err);
                    reject();
                });
            }
        });
    }

    getUsername() {
        // Would look way better with async but need to install more dependencies for react to be able to use it
        // I'm not bothering with that now, maybe later
        // The whole authentication thing is trash anyway, because we're mixing 2 frameworks not the correct way
        return new Promise((resolve, reject) => {
            if (this._loaded) {
                resolve(this._username);
            } else {
                this._loadInfo().then(() => {
                    resolve(this._username);
                });
            }
        });
    }

    loggedIn() {
        return new Promise((resolve, reject) => {
            if (this._loaded) {
                resolve(this._loggedIn);
            } else {
                this._loadInfo().then(() => {
                    resolve(this._loggedIn);
                }).catch(console.error)
            }
        });
    }
}
const auth = new Authentication();
export { auth }
