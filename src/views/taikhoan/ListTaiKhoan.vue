<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Danh sách tài khoản</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
          <li class="breadcrumb-item">Tài khoản</li>
          <li class="breadcrumb-item active">Danh sách</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">
      <div class="card">
        <div class="card-body">
          <div class="row  card-title">
            <div class="col-6">Danh sách tài khoản trong đơn vị </div>
            <div class="col-6 text-end"><button class="btn btn-success btn-sm" type="button" @click="goto_themtaikhoan"
                data-bs-toggle="modal" data-bs-target="#modal_edit_taikhoan"><i class="bi bi-plus-circle"></i> Thêm tài
                khoản</button></div>
          </div>
          <div class="mb-3">
            <table class="table table-bordered table-sm text-center">
              <thead class="table-bordered">
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col" class="text-start">Tài khoản</th>
                  <th scope="col" class="text-start">Tên đầy đủ</th>
                  <th scope="col" class="text-start">Tên đơn vị</th>

                  <th scope="col">Đặt lại mật khẩu</th>
                  <th scope="col">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="index" v-for="(account,index) in list_accounts">
                  <td>{{index + 1}}</td>
                  <td class="text-start">{{account.tenTaiKhoan}}</td>
                  <td class="text-start">{{account.tenDayDu}}</td>
                  <td class="text-start">{{account.tenDonVi}}</td>
                
                  <td ><button class="btn text-primary btn-sm"><i class="ri ri-lock-password-line" @click="goto_khoiphucmatkhau(account.maTaiKhoan)"></i></button></td>
                  <td ><button class="btn text-warning btn-sm" data-bs-toggle="modal"
                      data-bs-target="#modal_edit_taikhoan"><i class="bi bi-pencil-square"
                        @click="goto_suataikhoan(account)"></i></button>
                    <button class="btn text-danger btn-sm"><i class="ri ri-delete-bin-5-line"
                        @click="goto_xoataikhoan(account.maTaiKhoan)"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-body">

          <div class="row  card-title">
            <div class="col-6">Danh sách đơn vị tổ chức trực thuộc </div>
            <div class="col-6 text-end">
              <button class="btn btn-primary btn-sm" type="button" data-bs-toggle="modal"
                data-bs-target="#modal_edit_donvi" @click="goto_themdonvi">
                <i class="bi bi-plus-circle"></i> Thêm đơn vị</button>
            </div>
          </div>


          <div class="mb-3">
            <table class="table table-bordered table-sm text-center">
              <thead class="table-bordered">
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên Đơn vị</th>
                  <th scope="col">Tên Đơn vị đầy đủ</th>
                  <th scope="col">Loại Đơn vị</th>
                  <th scope="col">Mã định danh</th>
                  <th scope="col">Tên định danh</th>                
                  <th scope="col">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="index" v-for="(donvi,index) in list_child_donvis">
                  <td>{{index + 1}}</td>
                  <td class="text-start">{{donvi.tenDonVi}}</td>
                  <td class="text-start">{{donvi.tenDayDu}}</td>
                  <td>{{donvi.tenLoaiDonVi}}</td>
                  <td>{{donvi.maDinhDanh}}</td>
                  <td>{{donvi.tenDinhDanh}}</td>               
                  <td><button class="btn text-warning btn-sm "><i class="bi bi-pencil-square" data-bs-toggle="modal"
                        data-bs-target="#modal_edit_donvi" @click="goto_suadonvi(donvi)"></i></button>
                    <button class="btn text-danger btn-sm"><i class="ri ri-delete-bin-5-line" @click="goto_xoadonvi(donvi.maDonVi)"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    <div class="modal fade" id="modal_edit_donvi" tabindex="-1" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">

            <h5 class="modal-title">Thông tin đơn vị</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label>Tên đơn vị</label>
            <input type="text" class="form-control" v-model="donvi_selected.tenDonVi" />
            <label class="mt-2">Tên đầy đủ</label>
            <input type="text" class="form-control" v-model="donvi_selected.tenDayDu" />
            <label class="mt-2">Mã định danh</label>
            <input type="text" class="form-control" v-model="donvi_selected.maDinhDanh" />
            <label class="mt-2">Tên định danh (ví dụ: pv01.doi1) là tên đăng nhập của tài khoản đơn vị</label>
            <input type="text" class="form-control" v-model="donvi_selected.tenDinhDanh" />
            <label class="mt-2">Loại đơn vị</label>
            <select id="select_loaidonvi" class="form-select" v-model="donvi_selected.maLoaiDonVi">
              <template v-for="loaidonvi in list_loaidonvi">
                <option :value="loaidonvi.maLoaiDonVi">
                  {{loaidonvi.tenLoaiDonVi}}
                </option>
              </template>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
            <button type="button" class="btn btn-primary" @click="luudonvi">Lưu</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modal_edit_taikhoan" tabindex="-1" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">

            <h5 class="modal-title">Thông tin tài khoản</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label>Tên tài khoản</label>
            <input type="text" class="form-control" v-model="taikhoan_selected.tenTaiKhoan" />

            <label>Tên đầy đủ (hiện thị)</label>
            <input type="text" class="form-control" v-model="taikhoan_selected.tenDayDu" />

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
            <button type="button" class="btn btn-primary" @click="luutaikhoan">Lưu</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AccountService from "../../services/account.service";
  export default {
    name: 'TaiKhoan.DanhSach',

    data() {
      return {
        user: {},
        list_accounts: [],
        list_child_donvis: [],
        list_loaidonvi: [],
        donvi_selected: {},
        taikhoan_selected: {}
      }
    },
    created() {
      this.user = this.$store.state.auth.user;
      this.get_data_from_server()
    },
    methods: {
      get_data_from_server() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        AccountService.get_data_List_Accounts_View().then(
          (res) => {
            if (res) {
              loader.hide();
              if (res.success) {
                this.list_accounts = res.data[0];
                this.list_child_donvis = res.data[1];
                this.list_loaidonvi = res.data[2];
              }
            }
            else {
            }
          })
      },
      goto_suadonvi(donvi) {
        this.donvi_selected = donvi;
      },
      goto_themdonvi() {
        this.donvi_selected = {};
        this.donvi_selected.maDonVi = "";
        this.donvi_selected.maLoaiDonVi = this.list_loaidonvi[0]?.maLoaiDonVi;
      },
      goto_xoadonvi(madonvi) {
        this.$swal.fire({
          title: "Thông báo",
          text: "Bạn có chắc muốn xóa đơn vị này không?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Không",
        }).then((result) => {
          if (result.isConfirmed) {
            let loader = this.$loading.show(this.LOADING_PARAM);
            AccountService.xoadonvi(madonvi).then(
              (res) => {
                loader.hide();
                if (res && res.success) {
                  this.$swal.fire({
                    title: "Thông báo",
                    text: "Xóa đơn vị thành công.",
                    icon: "success"
                  }).then((result) => {
                    this.get_data_from_server();
                  });
                }

                else {               
                  this.$swal.fire({ title: "Thông báo!", text: res ? res.message : "Lỗi máy chủ", icon: "warning" });
                }
              },
              (error) => {
                console.log(
                  (error.response && error.response.data && error.response.data.message) || error.message || error.toString());
                loader.hide();
              }
            );
          }
        })
      },
      luudonvi() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        AccountService.luudonvi(this.donvi_selected).then(
          (res) => {
            loader.hide();
            if (res) {
              if (res.success) {
                this.$swal.fire({
                  title: "Thông báo",
                  text: "Lưu đơn vị thành công.",
                  icon: "success"
                });
                this.get_data_from_server();
              }
              else {
                $('#modal_edit_donvi').modal('hide');
                this.$swal.fire({ title: "Thông báo!", text: res.message, icon: "warning" });

              }
            }
            else {
              $('#modal_edit_donvi').modal('hide');
              this.$swal.fire({ title: "Thông báo!", text: "Lỗi máy chủ", icon: "warning" });

            }
          },
          (error) => {
            console.log(
              (error.response && error.response.data && error.response.data.message) || error.message || error.toString());
            loader.hide();
          }
        );
      },
      goto_suataikhoan(taikhoanobj) {
        this.taikhoan_selected = taikhoanobj;
      },
      goto_themtaikhoan() {
        this.taikhoan_selected = {};
      },
      goto_xoataikhoan(mataikhoan) {
        this.$swal.fire({
          title: "Thông báo",
          text: "Bạn có chắc muốn xóa tài khoản này không?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Không",
        }).then((result) => {
          if (result.isConfirmed) {
            let loader = this.$loading.show(this.LOADING_PARAM);
            AccountService.xoataikhoan(mataikhoan).then(
              (res) => {
                loader.hide();
                if (res && res.success) {
                  this.$swal.fire({
                    title: "Thông báo",
                    text: "Xóa tài khoản thành công.",
                    icon: "success"
                  }).then((result) => {
                    this.get_data_from_server();
                  });
                }

                else {                 
                  this.$swal.fire({ title: "Thông báo!", text: res ? res.message : "Lỗi máy chủ", icon: "warning" });
                }
              },
              (error) => {
                console.log(
                  (error.response && error.response.data && error.response.data.message) || error.message || error.toString());
                loader.hide();
              }
            );
          }
        })
      },
      goto_khoiphucmatkhau(mataikhoan){
        this.$swal.fire({
          title: "Thông báo",
          text: "Bạn có chắc muốn đặt lại mật khẩu mặc định tài khoản này không?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Không",
        }).then((result) => {
          if (result.isConfirmed) {
            let loader = this.$loading.show(this.LOADING_PARAM);
            AccountService.khoiphucmatkhau(mataikhoan).then(
              (res) => {
                loader.hide();
                if (res && res.success) {
                  this.$swal.fire({
                    title: "Thông báo",
                    text: "Đặt lại mật khẩu mặc định thành công.",
                    icon: "success"
                  }).then((result) => {
                    this.get_data_from_server();
                  });
                }

                else {                 
                  this.$swal.fire({ title: "Thông báo!", text: res ? res.message : "Lỗi máy chủ", icon: "warning" });
                }
              },
              (error) => {
                console.log(
                  (error.response && error.response.data && error.response.data.message) || error.message || error.toString());
                loader.hide();
              }
            );
          }
        })
      },
      luutaikhoan() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        AccountService.luutaikhoan(this.taikhoan_selected).then(
          (res) => {
            loader.hide();
            if (res && res.success) {
              this.$swal.fire({
                title: "Thông báo",
                text: "Lưu tài khoản thành công.",
                icon: "success"
              }).then((result) => {
                this.get_data_from_server();
              });
            }
            else {
              $('#modal_edit_taikhoan').modal('hide');
              this.$swal.fire({ title: "Thông báo!", text: res ? res.message : "Lỗi máy chủ", icon: "warning" });
            }
          },
          (error) => {
            console.log(
              (error.response && error.response.data && error.response.data.message) || error.message || error.toString());
            loader.hide();
          }
        );
      }
    }
  }
</script>