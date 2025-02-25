<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Danh sách tội danh</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
          <li class="breadcrumb-item">Quản lý danh mục</li>
          <li class="breadcrumb-item active">Quản lý tội danh</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">
      <div class="row mb-3">
        <div class="col-auto align-middle pt-1">
          Chọn lĩnh vực vụ việc:
        </div>
        <div class="col-auto">
          <select class="form-select" v-model="linhvuc_selected" @change="linhvuc_onchange">
            <option v-for="item in linhvucs" :key="item" :value="item">
              {{ item.tenLinhVucVuViec }}
            </option>
          </select>
        </div>
        <div class="col-auto">
          <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#ModalEdit" @click="themtoidanh">
            <i class="bi bi-plus-circle"></i> Thêm tội danh
          </button>
        </div>

        <div class="container mt-3" :key="table_render_key">


          <table class="table table-bordered" >
            <thead >
              <tr>
                <th scope="col" class="text-center">STT</th>
             
                <th scope="col" class="text-center" width="50%">Tên tội danh</th>
                <th scope="col" class="text-center">Thứ tự hiển thị</th>
                <th scope="col" class="text-center">Ghi chú</th>

                <th scope="col" class="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(toidanhobj, index) in toidanhs" :key="index">
                <td class="text-center">{{ index+1 }}</td>
            
                <td class="border-1">{{ toidanhobj.tenToiDanh }}</td>
                <td class="text-center">{{ toidanhobj.thuTu }}</td>
                <td>{{ toidanhobj.ghiChu }}</td>
                <td class="text-center">
                  <i style="cursor: pointer" data-bs-toggle="modal" @click="suatoidanh(toidanhobj)" data-bs-target="#ModalEdit"
                    class="bi bi-pencil-square"></i>
                    | <i style="cursor: pointer"  @click="xoatoidanh(toidanhobj.maToiDanh)"
                    class="bi bi-trash"></i>

                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <div class="modal fade modal-lg" id="ModalEdit" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{toidanh_selected.maToiDanh==0?'Thêm':'Sửa'}} tội danh</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row mb-3">
                <label for="inputText" class="col-sm-3 col-form-label">Tên tội danh</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="toidanh_selected.tenToiDanh" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail" class="col-sm-3 col-form-label">Ghi chú</label>
                <div class="col-sm-9">
                  <input type="email" class="form-control" v-model="toidanh_selected.ghiChu" />
                </div>
              </div>
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Lĩnh vực vụ việc</label>
                <div class="col-sm-9">
                  <select class="form-select" v-model="toidanh_selected.maLinhVucVuViec">
                    <option v-for="item in linhvucs" :key="item.maLinhVucVuViec" :value="item.maLinhVucVuViec">
                      {{ item.tenLinhVucVuViec }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputNumber" class="col-sm-3 col-form-label">Thứ tự hiển thị</label>
                <div class="col-sm-9">
                  <input type="number" class="form-control" v-model="toidanh_selected.thuTu" />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Đóng
            </button>
            <button type="button" class="btn btn-primary" @click="luutoidanh">
              Lưu
            </button>
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
        toidanh_selected: {},
        toidanh_alls: [],
        toidanhs: [],
        table_render_key: 0,
        linhvuc_selected: {}
      };
    },
    created() {
      this.laydulieubandau();
    },
    methods: {
      laydulieubandau() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        DanhMucService.laydanhsachtoidanh().then(
          (res) => {
            loader.hide();
            if (res.success) {
              this.linhvucs = res.data.linhVucs;
              this.toidanh_alls = res.data.toiDanhs;
              console.log(res.data);
              if (this.linhvucs.length > 0) {
                this.linhvuc_selected = this.linhvucs[0];
                this.linhvuc_onchange();
              }

            }
          })
      },
      forceRerender() {
        this.table_render_key++;
      },
      linhvuc_onchange() {      
        this.toidanhs = this.toidanh_alls.filter((toidanh_item) => toidanh_item.maLinhVucVuViec == this.linhvuc_selected.maLinhVucVuViec);
      },
      themtoidanh() {
        this.toidanh_selected = {};
        this.toidanh_selected.maToiDanh = 0;
        this.toidanh_selected.maLinhVucVuViec = this.linhvuc_selected.maLinhVucVuViec;
      },
      suatoidanh(obj) {
        this.toidanh_selected = JSON.parse(JSON.stringify(obj));
        //this.selectedToidanh = { ...toidanh };
      },
      luutoidanh() {        
        let loader = this.$loading.show(this.LOADING_PARAM);
        DanhMucService.luutoidanh(this.toidanh_selected).then(
          (res) => {
            loader.hide();
            if (res && res.success) {
              this.$swal.fire({
                title: "Thông báo!",
                text: "Lưu tội danh thành công!",
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
      xoatoidanh(matoidanh){
        this.$swal.fire({
          title: "Thông báo",
          text: "Bạn có chắc muốn xóa tội danh này không?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Không",
        }).then((result) => {
          if (result.isConfirmed) {
            let loader = this.$loading.show(this.LOADING_PARAM);
            DanhMucService.xoatoidanh(matoidanh).then(
              (res) => {
                loader.hide();
                if (res && res.success) {
                  this.$swal.fire({
                    title: "Thông báo",
                    text: "Xóa tội danh thành công.",
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