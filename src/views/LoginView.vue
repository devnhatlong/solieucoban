<template>
  <main class="main ">
    <section class="section  ">
      <div class="row min-vh-100 m-0 bg-login">
        <div class="col-lg-8 bg">
          <div class="circle-login"></div>
          <div class="text-login"></div>
        </div>
        <div class="col-sm-4 text-center my-auto">

          <div class="logo align-items-center w-auto text-center ">

            <span class="d-none d-lg-block text-white text-center fs-2 mb-2">SỐ LIỆU CƠ BẢN</span>

            <!--<span class="d-none d-lg-block text-white text-center ">Công an tỉnh Bình Thuận</span>-->
          </div>
          <div class="row justify-content-center align-middle">
            <div class="col-lg-9 col-md-12 d-flex flex-column align-items-center justify-content-center">
              <div class="card mb-2">
                <div class="card-body">
                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">Đăng nhập</h5>
                  </div>

                  <form class="row g-3 needs-validation" novalidate @submit.prevent="submit()" ref="formSignin">

                    <div class="col-12">
                      <label for="yourUsername" class="form-label">Tên tài khoản</label>
                      <div class="input-group has-validation">

                        <input type="text" class="form-control" v-model="user.tentaikhoan"
                          v-bind:class="{'is-invalid': errors.tentaikhoan}" required />
                        <div class="invalid-feedback">Vui lòng nhập tên tài khoản.</div>
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourPassword" class="form-label">Mật khẩu</label>
                      <input type="password" class="form-control" v-model="user.matkhau"
                        v-bind:class="{'is-invalid': errors.matkhau}" />
                      <div class="invalid-feedback">Vui lòng nhập mật khẩu!</div>
                    </div>


                    <div class="col-12 pb-lg-4">
                      <button class="btn btn-primary w-100" type="submit">Đăng nhập</button>
                      <br />
                    </div>

                  </form>

                </div>
              </div>

              <div class="credits text-white text-center fs-5">
                <!-- All the links in the footer should remain intact. -->
                <!-- You can delete the links only if you purchased the pro version. -->
                <!-- Licensing information: https://bootstrapmade.com/license/ -->
                <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ -->
                Phòng Tham mưu
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>


<script>
  export default {
    name: 'logingForm',
    data() {
      return {

        errors: {
          tentaikhoan: '',
          matkhau: '',
        },
        user: {
          mataikhoan: 0,
          tentaikhoan: '',
          matkhau: '',
        }
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
    },
    created() {
      if (this.loggedIn) {
        this.$router.push({ name: 'home' })
      }
    },
    methods: {
      submit() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        this.$store.dispatch("auth/login", this.user).then(
          (res) => {
            if (res.success) {
              this.$router.push({ name: 'home' })
            }
            else {
              this.$swal.fire({ title: 'Lỗi đăng nhập', html: res.message, icon: 'question' });
            }
            loader.hide();

          },
          (error) => {
            // console.log(error);
            loader.hide();
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            message = "Vui lòng đăng nhập lại!";
            this.$swal.fire(message, '', 'error');

          }
        );
      },
      validate() {
        this.errors = {
          tentaikhoan: '',
          matkhau: '',
        }
        var isValid = true;
        if (!this.user.taikhoan) {
          this.errors.taikhoan = 'Tài khoản không được bỏ trống';
          isValid = false;
        }
        if (!this.user.matkhau) {
          this.errors.matkhau = 'Mật khẩu không được bỏ trống';
          isValid = false;
        }
        return isValid;
      },


    }

  }
</script>