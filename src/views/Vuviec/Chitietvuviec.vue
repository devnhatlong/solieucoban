<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Chi tiết vụ việc</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
          <li class="breadcrumb-item">Quản lý vụ việc</li>
          <li class="breadcrumb-item">Chi tiết vụ việc</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">
      <div class="card">
        <div class="card-body">
          <div class="row mb-3" :key="render_key">
            <VuViecDetailComponent v-model="vuviec" id="vuviec_detail_modal"> </VuViecDetailComponent>
          </div>
          <div class="row mb-3">
            <div class="d-flex justify-content-center gap-2 d-flex">
              <button type="button" class="btn btn-primary">
                <a :href="'/vuviec/suavuviec/'+vuviec.maVuViec" style="color: white">
                  Sửa vụ việc
                </a></button>
              <button type="button" class="btn btn-success d-none" @click="toggleTimKiemMoRong">Phê duyệt</button>
              <button type="button" class="btn btn-info" @click="hienthi_lichsu_phienban">
                Xem lịch sử chỉnh sửa
              </button>
            </div>
          </div>
          <div class="row mt-5 mb-3">
            <div id="divphienbanvuviec" style="display:none">
              <h4 class="text-center">Lịch sử chỉnh sửa vụ việc</h4>
              <table class="table table-bordered table-sm text-center">
                <thead class="table-dark">
                  <tr>
                    <td>STT</td>
                    <td>Tài khoản </td>
                    <td>Thao tác</td>
                    <td>Nội dung </td>
                    <td>Thời gian ghi nhận</td>
                  </tr>
                </thead>
                <tbody>
                  <template :key="index" v-for="(vuviecphienban,index) in vuviec.vuViecPhienBans">
                    <tr>
                      <td>{{index+1}}</td>
                      <td>{{ vuviecphienban.tenTaiKhoanThaoTac }}</td>
                      <td>{{ vuviecphienban.thaoTac }}</td>
                      <td><button class="btn btn-primary btn-sm"
                          @click="xemvuviecphienban_onclick(vuviecphienban.vuViec)" v-show="vuviecphienban.vuViec!=null"> Xem chi tiết </button></td>
                      <td>{{ vuviecphienban.thoiGianGhiNhan }}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>

            <div class="modal fade modal-fullscreen modal-xl" id="phienbanvuviec_modal" tabindex="-1" aria-modal="true"
              role="dialog" >
              <div class="modal-dialog " style="max-width: 80%;">

                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Chi tiết vụ việc (theo phiên bản)</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="row" :key="modal_render_key">
                      <VuViecDetailComponent v-model="vuviecphienban_selected" id="vuviec_detail_modal">
                      </VuViecDetailComponent>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import VuViecService from "../../services/vuviec.service";

  export default {
    data() {
      return {
        vuviec: {},
        vuviecphienban_selected: {},
        render_key: 0,
        modal_render_key:0,
      };
    },
    created() {
      this.Getchitietvuviec();
    },
    methods: {

      forceRerender() {
        this.render_key++;
      },
      forceModalRerender() {
        this.modal_render_key++;
      },
      Getchitietvuviec() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        let mavuviec_param = this.$route.params.mavuviec;
        VuViecService.laychitietvuviec(mavuviec_param).then(
          (res) => {
            loader.hide();
            if (res.success) {
              this.vuviec = res.data;
              this.vuviec.vuViecPhienBans.forEach(element => {
                try{
                  element.vuViec = JSON.parse(element.noiDungPhienBan);
                }
                catch{
                  element.vuViec = null;
                }
              });
              this.forceRerender();
            }
          },
          (error) => {
            loader.hide();
          }
        );
      },
      xemvuviecphienban_onclick(obj_selected) {
        $("#phienbanvuviec_modal").modal('show');
        this.vuviecphienban_selected = obj_selected;
        this.forceModalRerender();
        //console.log(obj_selected);
      },
      hienthi_lichsu_phienban() {
        $('#divphienbanvuviec').toggle(200, function () {
        });
      },
    },
  };
</script>