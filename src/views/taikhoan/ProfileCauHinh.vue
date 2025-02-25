<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Cấu hình</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
          <li class="breadcrumb-item">Tài khoản</li>
          <li class="breadcrumb-item active">Cấu hình</li>
        </ol>
      </nav>
    </div>
    <section class="section">
      <div class="card col-8" v-show="is_CAT_User">
        <div class="card-body">
          <h5 class="card-title">
          </h5>
          <form>
            <div class="row mb-3">
              <label for="inputDate" class="col-sm-4 col-form-label">Ngày hết hạn tự đánh giá</label>
              <div class="col-sm-8">
     
                <input type="date" class="form-control" v-model="date1">
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputDate" class="col-sm-4 col-form-label">Ngày hết hạn thẩm định</label>
              <div class="col-sm-8">
                <input type="date" class="form-control" v-model="date2">
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-sm-4 col-form-label"></label>
              <div class="col-sm-10">
                <button type="button" class="btn btn-primary" @click="luuthaydoi">Lưu thay đổi</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>


  import CauHinhService from "../../services/cauhinh.service";
  export default {
    name: 'ProfileCauHinh',

    data() {
      return {
        cauhinhs: [],
        date1:{},
        date2:{}
      }
    },

    created() {

      this.get_from_server();
    },

    methods: {
      get_from_server() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        CauHinhService.getAll().then(
          (res) => {
            if (res.success) {
              this.cauhinhs = res.data;             
              if (this.cauhinhs.length > 1) {
                this.date1 = this.cauhinhs[0].giaTri;
                this.date2 = this.cauhinhs[1].giaTri;                
              }
              else {
                this.$swal.fire('Lỗi tải dữ liệu');
                this.$router.push('/home');
              }
              loader.hide();

            }
          },
          (error) => {
            loader.hide();
            this.$router.push('/home');
          })
      },
      luuthaydoi() {
        let loader = this.$loading.show(this.LOADING_PARAM);     
      
        this.cauhinhs[0].giaTri = this.date1;
        this.cauhinhs[1].giaTri = this.date2;
        
        CauHinhService.update_value(this.cauhinhs).then(
          (res) => {
            if (res.success) {
              this.$swal.fire('Lưu giá trị thành công');
              loader.hide();
            }
          },
          (error) => {
            loader.hide();
          })
      },
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

  }
</script>