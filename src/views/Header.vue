<template>

   <!-- <nav v-if="currentUser" class="navbar navbar-expand navbar-light bg-light border-bottom shadow-sm">
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
        <li v-if="showUserBoard" class="nav-item" hidden>
          <router-link v-if="currentUser" to="/chamdiemcchc" class="nav-link">Chấm điểm</router-link>
        </li>
    
         <li v-if="showUserBoard" class="nav-item" hidden>
          <router-link v-if="currentUser" to="/tracuu" class="nav-link">Thống kê, báo cáo</router-link>
        </li>
      </div>

    

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
    </nav>-->
    <header id="header" class="header fixed-top d-flex align-items-center"  v-if="currentUser">

      <div class="d-flex align-items-center justify-content-between">
        <a href="/home" class="logo d-flex align-items-center">
          <img src="/assets/img/logo.png" alt="">
          <span class="d-none d-lg-block" style="font-size: larger;">Hệ thống thông tin</span>
        </a>
        <i class="bi bi-list toggle-sidebar-btn" @click="toggle_sidebar_onclick"></i>
      </div><!-- End Logo -->
      <nav class="header-nav ms-auto">
        <ul class="d-flex align-items-center">
          <li class="nav-item dropdown pe-3">
  
            <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <i class="bi bi-person-fill"></i>
              <span class="d-none d-md-block dropdown-toggle ps-2">{{ currentUser.mota }}</span>
            </a><!-- End Profile Iamge Icon -->
  
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li>
                <a class="dropdown-item d-flex align-items-center" href="/taikhoan/thongtin">
                  <i class="bi bi-person"></i>
                  <span>Thông tin</span>
                </a>
              </li>
            
  
              <li class="d-none">
                <a class="dropdown-item d-flex align-items-center"  href="/taikhoan/cauhinh">
                  <i class="bi bi-gear"></i>
                  <span>Cấu hình</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
  
              <li>
                <a class="dropdown-item d-flex align-items-center"  href="/taikhoan/doimatkhau">
                  <i class="bi bi-question-circle"></i>
                  <span>Đổi mật khẩu</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
  
              <li>
                <a class="dropdown-item d-flex align-items-center" href="#" @click.prevent="logOut">
                  <i class="bi bi-box-arrow-right"></i>
                  <span>Đăng xuất</span>
                </a>
              </li>
  
            </ul><!-- End Profile Dropdown Items -->
          </li><!-- End Profile Nav -->
         
        </ul>
      </nav><!-- End Icons Navigation -->
  
    </header><!-- End Header -->
    
</template>

<script>
 export default {
  created(){

    $('.search-bar-toggle').on("click", function (e) {
          $('.search-bar').classList.toggle('search-bar-show');
      })
     
  },
  computed: {
    currentUser() {
      if(this.$store.state.auth.user){       
          return this.$store.state.auth.user;
      }
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
    toggle_sidebar_onclick() {
      document.querySelector('body').classList.toggle('toggle-sidebar');
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
