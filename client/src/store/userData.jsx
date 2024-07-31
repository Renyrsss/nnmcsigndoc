import { makeAutoObservable } from "mobx";

class User {
    user = {};
    agreed = false;
    signed = "";
    submitBtn = false;
    loading = true;
    constructor() {
        makeAutoObservable(this);
    }

    changeUser(newUser) {
        console.log(newUser);
        // console.log(this.user);
        this.user = { ...newUser };
    }
    changeAgreed(agree) {
        console.log(agree);
        this.agreed = agree;
    }
    changeSubmit(submit) {
        console.log(this.submitBtn);
        this.submitBtn = submit;
    }

    chagneLoading(loadingState) {
        this.loading = loadingState;
    }
}

export default new User();
