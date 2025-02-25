<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Chi tiết vụ cháy/nổ</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
          <li class="breadcrumb-item">Quản lý vụ cháy/nổ</li>
          <li class="breadcrumb-item active">Chi tiết vụ cháy/nổ</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">
      <div class="card">
        <div class="card-body">
          <div class="row mb-3" :key="render_key">
            <VuChayNoDetailComponent v-model="vuchayno" id="vuchayno_detail_modal"> </VuChayNoDetailComponent>
          </div>
          <div class="row mb-3">
            <div class="d-flex justify-content-center gap-2 d-flex">
              <button type="button" class="btn btn-primary">
                <a :href="'/pccc/suavuchayno/'+vuchayno.maVuChayNo" style="color: white">
                  Sửa vụ cháy/nổ
                </a></button>

              <button type="button" class="btn btn-info" @click="hienthi_lichsu_phienban">
                Xem lịch sử chỉnh sửa
              </button>
            </div>
          </div>
          <div class="row mt-5 mb-3">
            <div id="divphienbanvuchayno" style="display:none">
              <h4 class="text-center">Lịch sử chỉnh sửa vụ cháy/nổ</h4>
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
                  <template :key="index" v-for="(vuchaynophienban,index) in vuchayno.vuChayNoPhienBans">
                    <tr>
                      <td>{{index+1}}</td>
                      <td>{{ vuchaynophienban.tenTaiKhoanThaoTac }}</td>
                      <td>{{ vuchaynophienban.thaoTac }}</td>
                      <td><button class="btn btn-primary btn-sm" @click="xemvuchaynophienban_onclick(vuchaynophienban.vuchayno)"
                          v-show="vuchaynophienban.vuchayno!=null"> Xem chi tiết </button></td>
                      <td>{{ vuchaynophienban.thoiGianGhiNhan }}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>

            <div class="modal fade modal-fullscreen modal-xl" id="phienbanvuchayno_modal" tabindex="-1" aria-modal="true"
              role="dialog">
              <div class="modal-dialog " style="max-width: 80%;">

                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Chi tiết vụ cháy/nổ (lịch sử chỉnh sửa)</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="row" :key="modal_render_key">
                      <VuChayNoDetailComponent v-model="vuchaynophienban_selected" id="vuchayno_detail_modal">
                      </VuChayNoDetailComponent>
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
  import PcccService from "../../services/pccc.service";

  export default {
    data() {
      return {
        vuchayno: {},
        vuchaynophienban_selected: {},
        render_key: 0,
        modal_render_key: 0,
      };
    },
    created() {
      this.getchitietvuchayno();
    },
    methods: {

      forceRerender() {
        this.render_key++;
      },
      forceModalRerender() {
        this.modal_render_key++;
      },
      getchitietvuchayno() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        let mavuchayno_param = this.$route.params.maVuChayNo;
        PcccService.laychitietvuchayno(mavuchayno_param).then(
          (res) => {
            loader.hide();
            if (res?.success) {
              this.vuchayno = res.data;
           
              this.vuchayno.vuChayNoPhienBans?.forEach(element => {
                try {
                  element.vuchayno = JSON.parse(element.noiDungPhienBan);
                }
                catch {
                  element.vuchayno = null;
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
      xemvuchaynophienban_onclick(obj_selected) {
        $("#phienbanvuchayno_modal").modal('show');
        this.vuchaynophienban_selected = obj_selected;
        this.forceModalRerender();
        //console.log(obj_selected);
      },
      hienthi_lichsu_phienban() {
        $('#divphienbanvuchayno').toggle(200, function () {
        });
      },
    },
  };
</script>