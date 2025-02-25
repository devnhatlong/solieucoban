<template>
  <main id="main" class="main">
   
   
  <div class="pagetitle">
    <h1>Thông tin tài khoản</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
        <li class="breadcrumb-item">Tài khoản</li>
        <li class="breadcrumb-item active">Thông tin tài khoản</li>
      </ol>
    </nav>
  </div>
  <section class="section">
    <div class="card col-6">
    <div class="card-body">
      <h5 class="card-title ">Thông tin       
      </h5>
      <form>
        <!-- Form Group (username)-->
        <div class="mb-3 text-left">
          <label class="small mb-1 " for="inputUsername">Tên tài khoản</label>
          <div class="form-control" id="inputUsername" type="text" placeholder="">{{get_current_user.tenTaiKhoan}}</div>
        </div>
        <div class="mb-3 text-left">
          <label class="small mb-1 " for="inputUsername">Đơn vị</label>
          <div class="form-control" id="inputUsername" type="text" placeholder="">{{get_current_user.donVi.tenDonVi}}</div>
        </div>
        <div class="mb-3 text-left">
          <label class="small mb-1 " for="inputUsername">Loại tài khoản</label>
          <div class="form-control" id="inputUsername" type="text" placeholder="">{{get_current_user.tenLoaiTaiKhoan}}</div>
        </div>

      </form>
    </div>
  </div>
  </section>
  </main>
</template>

<script>

  import UserService from "../../services/user.service";
  export default {
    name: 'ProfileInfo',
 
    data() {
      return {
        user: {}
      }
    },
    created() {

    },
    computed: {
      is_CAT_User() {
        console.log(this.$store.getters['auth/is_CAT_User']);
        return this.$store.getters['auth/is_CAT_User'];
      },
      get_current_user() {
        return this.$store.getters['auth/current_user'];
      }
    }
  };
</script>