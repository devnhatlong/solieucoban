<template>
  <main id="main" class="main">
  <div class="pagetitle">
    <h1>Đổi mật khẩu</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
        <li class="breadcrumb-item">Tài khoản</li>
        <li class="breadcrumb-item active">Đổi mật khẩu</li>
      </ol>
    </nav>
  </div>
  <section class="section">
    <div class="card col-6">
    <div class="card-body">
      <h5 class="card-title ">Đổi mật khẩu  
      </h5>
      <form>
          <!-- Form Group (current password)-->
          <div class="mb-3">
            <label class="small mb-1" for="currentPassword">Mật khẩu hiện tại</label>
            <input class="form-control" type="password" v-model="password">
          </div>
          <!-- Form Group (new password)-->
          <div class="mb-3">
            <label class="small mb-1" for="newPassword">Mật khẩu mới</label>
            <input class="form-control" type="password" v-model="newpassword">
          </div>
          <!-- Form Group (confirm password)-->
          <div class="mb-3">
            <label class="small mb-1" for="confirmPassword">Nhập lại Mật khẩu mới</label>
            <input class="form-control" type="password" v-model="newpasswordretype">
          </div>
          <button class="btn btn-primary" type="button" @click="changepassword()">Thay đổi</button>

      </form>

    </div>
  </div>
  </section>
</main>
</template>

<script>

  import UserService from "../../services/user.service";
  export default {
    name: 'ProfileBieuMau',
    
    data() {
      return {
        user: {},
        password: '',
        newpassword: '',
        newpasswordretype: '',
      }
    },
    created() {
      this.user = this.$store.state.auth.user;

    },
    methods: {
      changepassword() {
        if (this.newpasswordretype != this.newpassword) {
          this.$swal.fire('Nhập lại mật khẩu mới chưa khớp');
          return;
        }
        let loader = this.$loading.show({ loader: "spinner", color: "#007BFF", opacity: 0.5, width: 120, height: 120 });
      
        UserService.changePassword(this.password, this.newpassword).then(
          (success) => {
            if (success) {
              this.$swal.fire('Đổi mật khẩu thành công').then((result) => {
                this.$router.push({ name: 'home' });
                this.$store.dispatch('auth/logout');
                this.$router.push('/login');
              });

            }
            else {
              this.$swal.fire('Không thành công');
            }
            loader.hide();
          },
          (error) => {
            loader.hide();
            console.log(erorr);
          });

      }
    },
    mounted() {
      if (!this.user) {
        this.$router.push('/login');
      }
    }
  }
</script>