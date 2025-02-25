<template  >

    <nav v-if="currentUser" class="navbar navbar-expand navbar-light bg-light border-bottom shadow-sm">
      <a href="/" class="navbar-brand">Chấm điểm CCHC</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Trang chủ
          </router-link>
        </li>
          <li v-if="showAdminBoard" class="nav-item">
          <router-link v-if="currentUser" to="/taikhoan" class="nav-link">Quản lý Tài khoản</router-link>
        </li>
         <li v-if="showAdminBoard" class="nav-item">
          <router-link v-if="currentUser" to="/bieumau" class="nav-link">Quản lý Biểu mẫu</router-link>
        </li>
        <li v-if="showUserBoard" class="nav-item">
          <router-link v-if="currentUser" to="/chamdiemcchc" class="nav-link">Chấm điểm</router-link>
        </li>
    
         <li v-if="showUserBoard" class="nav-item">
          <router-link v-if="currentUser" to="/tracuu" class="nav-link">Thống kê, báo cáo</router-link>
        </li>
      </div>

      <!--<div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>-->

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.tenTaiKhoan }}
          </router-link>
        </li>
        <li class="nav-item">

          <a class="nav-link" href="#" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> Đăng xuất
          </a>
        </li>
      </div>
    </nav>
    
</template>

<script>
 export default {
  computed: {
    currentUser() {
      //console.log("0000", this.$store.state.auth.user);
      if(this.$store.state.auth.user){       
         return this.$store.state.auth.user;
      }
      return {}
    },
    showAdminBoard() {
    
      
      if (this.currentUser) 
      {
        return this.currentUser.isAdmin;
      }
      return false;
    
    },
    showUserBoard() {

      if (this.currentUser) 
      {
        return !this.currentUser.isAdmin;
      }
      return false;

    }
  },
  methods: {
   
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
