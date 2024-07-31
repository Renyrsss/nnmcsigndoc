import { makeAutoObservable } from "mobx";

class User {

      user = {}
      agreed = false 
      signed = ''
      submitBtn = false
      constructor(){
            makeAutoObservable(this)
      }

      changeUser(newUser){
            console.log(newUser);
            // console.log(this.user);
            this.user = {...newUser}
      }
      changeAgreed(agree){
            console.log(agree);
            this.agreed = agree;
      }
      changeSubmit(submit){
            console.log(this.submitBtn);
            this.submitBtn = submit
      }
}


export default new User();