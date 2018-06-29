const Api = require('../services/Api')
//import Api from '@/services/Api'
//import api.js


//export obj that have register method with credintials attached

export default {
    register(credintials) {
        return Api().post('register', credintials)
    }
}

//this is how it would be called to pass creds to register endpoint
//AuthenticationService.register({
//    email: 'test@email.com',
//    password:'123456'
//})