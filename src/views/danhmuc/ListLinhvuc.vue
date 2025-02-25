<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Danh sách lĩnh vực</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
          <li class="breadcrumb-item">Quản lý danh mục</li>
          <li class="breadcrumb-item active">Quản lý lĩnh vực</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">
      <div class="row">

        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên lĩnh vực vụ việc</th>
        
              <th scope="col">Ghi chú</th>
              <th scope="col">Thứ tự</th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in linhvucs" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.tenLinhVucVuViec }}</td>
           
              <td>{{ item.ghiChu }}</td>
              <td>{{ item.thuTu }}</td>
              <td>
                <i data-bs-toggle="modal" data-bs-target="#ModalEdit" class="bi bi-pencil-square"
                  @click="sualinhvuc(item)"></i>
                |
                <i class="bi bi-trash" @click="xoalinhvuc(item.maLinhVucVuViec)"></i>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#ModalEdit"
            @click="themlinhvuc"><i class="bi bi-plus-circle"></i>
            Thêm lĩnh vực
          </button>
        </div>
      </div>
    </section>
    <div class="modal fade modal-lg" id="ModalEdit" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{linhvuc_selected.maLinhVucVuViec==0?'Thêm':'Sửa'}} lĩnh vực vụ việc</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row mb-3">
              <label for="inputText" class="col-sm-3 col-form-label">Tên lĩnh vực vụ việc</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="linhvuc_selected.tenLinhVucVuViec" />
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputEmail" class="col-sm-3 col-form-label">Ghi chú</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="linhvuc_selected.ghiChu" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="inputNumber" class="col-sm-3 col-form-label">Thứ tự</label>
              <div class="col-sm-9">
                <input type="number" class="form-control" v-model="linhvuc_selected.thuTu" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
              <button type="button" class="btn btn-primary" @click="luulinhvuc">
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import DanhMucService from "../../services/danhmuc.service";

  export default {
    data() {
      return {
        linhvucs: [],
        linhvuc_selected: {}
      };
    },
    created() {
      this.laydulieubandau();
    },
    methods: {
      laydulieubandau() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        DanhMucService.laydanhsachlinhvuc().then(
          (res) => {
            loader.hide();
            if (res.success) {
              this.linhvucs = res.data;
            }
          })
      },
      
      themlinhvuc() {
        this.linhvuc_selected = {};
        this.linhvuc_selected.maLinhVucVuViec = 0;
     
      },
      sualinhvuc(obj) {
        //console.log(obj);
        this.linhvuc_selected = JSON.parse(JSON.stringify(obj));
        //this.selectedToidanh = { ...linhvuc };
      },
      luulinhvuc() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        DanhMucService.luulinhvuc(this.linhvuc_selected).then(
          (res) => {
            loader.hide();
            if (res && res.success) {
              this.$swal.fire({
                title: "Thông báo!",
                text: "Lưu lĩnh vực thành công!",
                icon: "success"
              }).then((result) => {
                $("#ModalEdit").modal('hide');
                this.laydulieubandau();
              });
            }
            else {
              this.$swal.fire({ title: "Thông báo!", text: res ? res.message : "Lỗi máy chủ", icon: "error" });
            }

          },
          (error) => {
            loader.hide();
          });
      },
      xoalinhvuc(malinhvuc) {
        this.$swal.fire({
          title: "Thông báo",
          text: "Bạn có chắc muốn xóa lĩnh vực này không?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Không",
        }).then((result) => {
          if (result.isConfirmed) {
            let loader = this.$loading.show(this.LOADING_PARAM);
            DanhMucService.xoalinhvuc(malinhvuc).then(
              (res) => {
                loader.hide();
                if (res && res.success) {
                  this.$swal.fire({
                    title: "Thông báo",
                    text: "Xóa lĩnh vực thành công.",
                    icon: "success"
                  }).then((result) => {
                    this.laydulieubandau();
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
      }

    },
  };
</script>