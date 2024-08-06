import { makeAutoObservable } from "mobx";

class User {
    user = {};
    agreed = false;
    signed = "";
    submitBtn = false;
    loading = false;
    langs = "";
    constructor() {
        makeAutoObservable(this);
    }

    changeLangues(langsF) {
        this.langs = langsF;
        console.log(langsF);
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
