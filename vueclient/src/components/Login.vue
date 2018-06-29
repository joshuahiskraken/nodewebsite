<template>
<div class="container">
<form>
  <div class='well'>
    <h4>User Login</h4>
    <div class='form-group'>
      
      <input type="text" class="form-control" placeholder="Email" v-model="User.email">
    </div>
    <div class='form-group'>
      
      <input type="text" class="form-control" placeholder="Password" v-model="User.password">
    </div>
  </div>
  <button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="addToAPI">Submit</button>
  <button class="btn btn-large btn-block btn-success full-width">next</button>
</form>

</div>
</template>

<script>
import axios from '../services/Api.js';
export default {
  data () {
    return {
      msg: 'Welcome to signup',
      User: {email:'', password:''}
    }
  }, methods: {
    addToAPI(){
      let existUser = {
        email: this.User.email,
        password: this.User.password
      }
      console.log(existUser);
      axios.post(process.env.API_URL, existUser)
      .then((response) => {
          console.log(response);
      })
      .catch((error)=>{
          console.log(error);
      });
    }
  }
}
</script>