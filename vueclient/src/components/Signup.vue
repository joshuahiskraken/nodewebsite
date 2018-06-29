<template>
<div class="container">
<form>
  <div class='well'>
    <h4>User Sign up</h4>
    <div class='form-group'>
      
      <input type="text" class="form-control" placeholder="Email" v-model="User.email">
    </div>
    <div class='form-group'>
      
      <input type="text" class="form-control" placeholder="Password" v-model="User.password">
    </div>
  </div>
  <button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="addToAPI">Submit</button>
  
  <form method="get" action="/?#/login">
    <button class="btn btn-large btn-block btn-success full-width" type="submit">Continue</button>
</form>
</form>

</div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      msg: 'Welcome to signup',
      User: {email:'', password:''}
    }
  }, methods: {
    addToAPI(){
      let newUser = {
        email: this.User.email,
        password: this.User.password
      }
      console.log(newUser);
      axios.post('http://localhost:8081/user/signup', newUser)
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


