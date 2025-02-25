<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Thống kê</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
          <li class="breadcrumb-item">Phòng cháy chữa cháy</li>
          <li class="breadcrumb-item">Thống kê</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">
      <div class="card">
        <div class="card-body">
          <div class="mt-4 mb-2 text-center">
            <h3>
              <b>Thống kê số liệu vụ cháy nổ</b>
            </h3>
          </div>
          <div class="row mt-3">

            <div class="col-3">
              Từ ngày: <MyDatePicker id="datepicker_tungay" v-model="thongke_param_obj.tuNgay"></MyDatePicker>
            </div>
            <div class="col-3">
              đến ngày <MyDatePicker id="datepicker_denngay" v-model="thongke_param_obj.denNgay"> </MyDatePicker>
            </div>
            <div class="col-3">
              Loại ngày:
              <select id="cmbLoaiNgay" class="form-select" v-model="thongke_param_obj.loaiNgayTimKiem">
                <option value="1">Ngày báo cáo</option>
                <option value="2">Ngày xảy ra</option>
              </select>
            </div>

          </div>
        </div>
      </div>

      <div class="row mb-3">

        <div class="col-12 text-center">
          <button id="Button1" class="btn btn-primary px-4 mx-1" type="button" @click="thongke">Xem thống
            kê</button>
          <button class="btn btn-info  mx-1" type="button" onclick="PrintElem('divThongkeVuViec')">In thống kê
            <i class="bi bi-printer"></i></button>

          <button type="button" class="btn btn-success mx-1" data-bs-toggle="modal" data-bs-target="#danhmuc_backdrop">
            Chọn trường thông tin
          </button>
          <div class="modal fade" id="danhmuc_backdrop" tabindex="-1" aria-modal="true" role="dialog">
            <div class="modal-dialog modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">

                  <h5 class="modal-title">Chọn trường hiển thị</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                  <ul class="list-group">
                    <template :key="index" v-for="(truongthongtin,index) in truongthongtin_choose">
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        {{truongthongtin.title}}
                        <input type="checkbox" class="form-check-input" :id="truongthongtin.id"
                          v-model="truongthongtin.checked" :disabled="(truongthongtin.readonly)?true:false" />
                      </li>
                    </template>
                  </ul>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
                  <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="apdung_onclick">Áp
                    dụng</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="row mb-3" id="divThongkeVuViec">
        <table class="table table-sm table-bordered small table-striped text-center">
          <thead>
            <tr class="text-center align-middle">
              <td scope="col" rowspan="2">#</td>
              <td scope="col" rowspan="2">Loại</td>
              <td scope="col" rowspan="2" width="25%">Mức độ vụ cháy/nổ</td>
              <template v-for="data in thongkedatas[0]?.soLieuQuanHuyens">
                <td :colspan="get_count_of_display_field" style="border-left: 0.13rem solid lightgray">
                  {{data.tenQuanHuyen}}</td>
              </template>

            </tr>
            <tr class="text-center align-middle">
              <template v-for="data in thongkedatas[0]?.soLieuQuanHuyens">
                <template v-for="(truongthongtin, index) in truongthongtin_current">
                  <td v-show="truongthongtin.checked" :style="index==0?'border-left: 0.13rem solid lightgray':''">
                    {{truongthongtin.id}}</td>
                </template>
              </template>
            </tr>
          </thead>
          <tbody>
            <template v-for="(thongkedata, index) in thongkedatas" :key="index">
              <tr>
                <td>{{index+1}}</td>
                <td>{{thongkedata.loai}}</td>
                <td class="text-start">{{thongkedata.tenMucDoVuChayNo}}</td>
                <template v-for="data in thongkedatas[index].soLieuQuanHuyens">
                  <td v-show="truongthongtin_current[0]?.checked" style="border-left: 0.13rem solid lightgray;">
                    {{data.soVu}}</td>
                  <td v-show="truongthongtin_current[1]?.checked">{{data.soNguoiChet}}</td>
                  <td v-show="truongthongtin_current[2]?.checked">{{data.soNguoiBiThuongNang}}</td>
                  <td v-show="truongthongtin_current[3]?.checked">{{data.soNguoiBiThuongNhe}}</td>
                  <td v-show="truongthongtin_current[4]?.checked">{{data.taiSanThietHai}}</td>
                </template>
              </tr>
            </template>
          </tbody>
        </table>
      </div>



    </section>
  </div>
</template>
<script>
  import PcccService from "../../services/pccc.service";

  export default {
    data() {
      return {
        thongke_param_obj: {},
        thongkedatas: [],
        truongthongtin_current: [
          {
            title: "Số vụ xảy ra",
            id: "Số vụ xảy ra",
            index: 0,
            checked: true,
            readonly: 1
          },
          {
            title: "Số người chết",
            id: "Số người chết",
            index: 1,
            checked: true,
            readonly: 0
          },
          {
            title: "Số người bị thương nặng",
            id: "Số bị thương nặng",
            index: 2,
            checked: true,
            readonly: 0
          },
          {
            title: "Số người bị thương nhẹ",
            id: "Số bị thương nhẹ",
            index: 3,
            checked: false,
            readonly: 0
          },
          {
            title: "Tài sản thiệt hại",
            id: "Tài sản thiệt hại",
            index: 4,
            checked: false,
            readonly: 0
          },


        ],
        truongthongtin_choose: [],
        applied: false
      };
    },
    created() {
      this.thongke_param_obj.tuNgay = '15/06/2021';
      this.thongke_param_obj.denNgay = moment().format(DEFAULT_DATE_FORMAT);
      this.thongke_param_obj.loaiNgayTimKiem = "1";
      this.truongthongtin_choose = JSON.parse(JSON.stringify(this.truongthongtin_current));
      this.thongke();
      this.$nextTick(function () {
        var myModalEl = document.getElementById('danhmuc_backdrop');
        const vm = this;
        myModalEl.addEventListener('hidden.bs.modal', function (event) {
          vm.apdungchontruonghienthi();
        })
      });
    },
    methods: {
      thongke() {
        this.thongkedatas = [];
        let loader = this.$loading.show(this.LOADING_PARAM);

        PcccService.thongke(this.thongke_param_obj).then(
          (res) => {
            loader.hide();
            if (res.success) {
              this.thongkedatas = res.data;

              let sum_data_chay_obj, sum_data_no_obj;
              let sum_quanhuyen_obj;
              if (this.thongkedatas.length > 0) {
                for (let m = 0; m < this.thongkedatas.length; m++) {
                  sum_quanhuyen_obj = JSON.parse(JSON.stringify(this.thongkedatas[m].soLieuQuanHuyens[0]));
                  sum_quanhuyen_obj.tenQuanHuyen = "Toàn tỉnh";
                  for (let n = 1; n < this.thongkedatas[m].soLieuQuanHuyens.length; n++) {
                    let data = this.thongkedatas[m].soLieuQuanHuyens[n];
                    this.calculatevalue(sum_quanhuyen_obj, data);
                  }
                  this.thongkedatas[m].soLieuQuanHuyens.unshift(sum_quanhuyen_obj);
                }

                sum_data_chay_obj = JSON.parse(JSON.stringify(this.thongkedatas[0]));
                sum_data_chay_obj.loai = "";
                sum_data_chay_obj.tenMucDoVuChayNo = "Tổng số vụ cháy";

                for (let j = 0; j < sum_data_chay_obj.soLieuQuanHuyens.length; j++) {
                  this.resetvalue(sum_data_chay_obj.soLieuQuanHuyens[j]);
                }

                sum_data_no_obj = JSON.parse(JSON.stringify(sum_data_chay_obj));
                sum_data_no_obj.loai = "";
                sum_data_no_obj.tenMucDoVuChayNo = "Tổng số vụ nổ";
                let index_of_no = -1;
                for (let i = 0; i < this.thongkedatas.length; i++) {
                  for (let j = 0; j < this.thongkedatas[i].soLieuQuanHuyens.length; j++) {
                    let data = this.thongkedatas[i].soLieuQuanHuyens[j];
                    if (this.thongkedatas[i].loai == "Cháy") {
                      this.calculatevalue(sum_data_chay_obj.soLieuQuanHuyens[j], data);
                    }
                    else if (this.thongkedatas[i].loai == "Nổ") {
                      if (index_of_no == -1) {
                        index_of_no = i;
                      }
                      this.calculatevalue(sum_data_no_obj.soLieuQuanHuyens[j], data);
                    }
                    else {
                    }
                  }
                }

                this.thongkedatas.splice(index_of_no, 0, sum_data_no_obj);
                this.thongkedatas.unshift(sum_data_chay_obj);

              }
            }
            else {
              this.$swal.fire({ title: "Thông báo!", text: res.message, icon: "warning" }).then((result) => {
                this.$router.push("/home");
              });;

            }
          },
          (error) => {
            loader.hide();
          }
        );
      },
      calculatevalue(sumdata, data) {
        sumdata.soVu += data.soVu;
        sumdata.soNguoiChet += data.soNguoiChet;
        sumdata.soNguoiBiThuongNang += data.soNguoiBiThuongNang;
        sumdata.soNguoiBiThuongNhe += data.soNguoiBiThuongNhe;
        sumdata.taiSanThietHai += data.taiSanThietHai;
        sumdata.taiSanThietHai = Math.round(sumdata.taiSanThietHai * 100) / 100;
      },
      resetvalue(sumdata) {

        sumdata.soVu = 0;
        sumdata.soNguoiChet = 0;
        sumdata.soNguoiBiThuongNang = 0;
        sumdata.soNguoiBiThuongNhe = 0;
        sumdata.taiSanThietHai = 0;
      },
      apdung_onclick() {
        $("#danhmuc_backdrop").modal('hide');
        this.applied = true;
      },
      apdungchontruonghienthi() {
        if (this.applied == true) {
          this.$nextTick(function () {
            this.truongthongtin_current = JSON.parse(JSON.stringify(this.truongthongtin_choose));
          });
          this.applied = false;
        }
        else {
          this.truongthongtin_choose = JSON.parse(JSON.stringify(this.truongthongtin_current));

        }
      }
    },
    computed: {
      get_count_of_display_field() {
        let result = 0;
        this.truongthongtin_current.forEach(element => {
          if (element.checked) {
            result++;
          }
        });
        return result;
      }
    }

  };
</script>