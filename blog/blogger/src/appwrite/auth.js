// this is the code from docs of appwrite in order to implement auth service in our app:-------------------------
// import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setProject('<PROJECT_ID>'); // Your project ID

// const account = new Account(client);

// const promise = account.create('[USER_ID]', 'email@example.com', '');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });

// but for vendor independency we will write custom code , we will be using classes adn each class has a particualr object
// that can be further used by other methods to access services 
// using classes also provides us abstraction inorder to  hide code and prenting it from injecting in UI

// 1st step
import { Client, Account, ID } from "appwrite";

// required for getting env variables 
import conf from '../conf/conf.js';

//step 2 , create and export a class first

export class AuthService {
    //step4 , create a client by using new () method
    client = new Client();
    account;

    //step 5 , provide env varibles value by using a costructor

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            
        this.account = new Account(this.client);
            
    }

    // // step 6 , frist line of code will be written to remove vendor dependency , this
    // line or part of code will remain consistent and under the hood worl will remain
    //hidden , also indoendent of the vendor or service used

    //****** 
    //destructure email,password , name from object
    async createAccount({email, password, name}) {
       // step 7 , open try catch block , as it may fail 
       try {

        //step 8, create userAccount , accepting id, name , email ... accordiing to docs
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        if (userAccount) {
            // call another method , login user if once he creates account
            // will do this later
           
        } else {
           return  userAccount;
        }
       } catch (error) {
          throw error
       }
    }

    // step 8 , create login service by taking refrence from appwrite docs
    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    //step 9 , create a method get current user detail whether he is authorized or not 
    // so as there is no unauthrized access to the webpage
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    //step 10 , logout method
    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }


}

//step 3 , create object of class and export it
const authService = new AuthService();
export default authService



