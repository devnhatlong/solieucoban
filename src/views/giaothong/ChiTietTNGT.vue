<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Chi tiết vụ TNGT</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
          <li class="breadcrumb-item">Quản lý vụ TNGT</li>
          <li class="breadcrumb-item">Chi tiết vụ TNGT</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">
      <div class="card">
        <div class="card-body">
          <div class="row mb-3" :key="render_key">
            <TNGTDetailComponent v-model="tngt" id="tngt_detail_modal"> </TNGTDetailComponent>
          </div>
          <div class="row mb-3">
            <div class="d-flex justify-content-center gap-2 d-flex">
              <button type="button" class="btn btn-primary">
                <a :href="'/giaothong/suatngt/'+tngt.maTaiNanGiaoThong" style="color: white">
                  Sửa vụ TNGT
                </a></button>

              <button type="button" class="btn btn-info" @click="hienthi_lichsu_phienban">
                Xem lịch sử chỉnh sửa
              </button>
            </div>
          </div>
          <div class="row mt-5 mb-3">
            <div id="divphienbantngt" style="display:none">
              <h4 class="text-center">Lịch sử chỉnh sửa vụ TNGT</h4>
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
                  <template :key="index" v-for="(tngtphienban,index) in tngt.tngtPhienBans">
                    <tr>
                      <td>{{index+1}}</td>
                      <td>{{ tngtphienban.tenTaiKhoanThaoTac }}</td>
                      <td>{{ tngtphienban.thaoTac }}</td>
                      <td><button class="btn btn-primary btn-sm" @click="xemtngtphienban_onclick(tngtphienban.tngt)"
                          v-show="tngtphienban.tngt!=null"> Xem chi tiết </button></td>
                      <td>{{ tngtphienban.thoiGianGhiNhan }}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>

            <div class="modal fade modal-fullscreen modal-xl" id="phienbantngt_modal" tabindex="-1" aria-modal="true"
              role="dialog">
              <div class="modal-dialog " style="max-width: 80%;">

                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Chi tiết vụ TNGT (lịch sử chỉnh sửa)</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="row" :key="modal_render_key">
                      <TNGTDetailComponent v-model="tngtphienban_selected" id="tngt_detail_modal">
                      </TNGTDetailComponent>
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
  import GiaoThongService from "../../services/giaothong.service";

  export default {
    data() {
      return {
        tngt: {},
        tngtphienban_selected: {},
        render_key: 0,
        modal_render_key: 0,
      };
    },
    created() {
      this.getchitiettngt();
    },
    methods: {

      forceRerender() {
        this.render_key++;
      },
      forceModalRerender() {
        this.modal_render_key++;
      },
      getchitiettngt() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        let matngt_param = this.$route.params.maTaiNanGiaoThong;
        GiaoThongService.laychitiettngt(matngt_param).then(
          (res) => {
            loader.hide();
            if (res?.success) {
              this.tngt = res.data;
              console.log(this.tngt);
              this.tngt.tngtPhienBans?.forEach(element => {
                try {
                  element.tngt = JSON.parse(element.noiDungPhienBan);
                }
                catch {
                  element.tngt = null;
                }
              });
              this.forceRerender();
            }
            else {
              this.$swal.fire({ title: "Thông báo!", text: res ? res.message : "Lỗi máy chủ", icon: "error" });
            }
          },
          (error) => {
            loader.hide();
          }
        );
      },
      xemtngtphienban_onclick(obj_selected) {
        $("#phienbantngt_modal").modal('show');
        this.tngtphienban_selected = obj_selected;
        this.forceModalRerender();
        //console.log(obj_selected);
      },
      hienthi_lichsu_phienban() {
        $('#divphienbantngt').toggle(200, function () {
        });
      },
    },
  };
</script>