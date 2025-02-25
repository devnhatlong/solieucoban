<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Thống kê</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
          <li class="breadcrumb-item">Giao thông</li>
          <li class="breadcrumb-item">Thống kê</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">
      <div class="card">
        <div class="card-body">
          <div class="mt-4 mb-2 text-center">
            <h3>
              <b>Thống kê số liệu TNGT</b>
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
              <td scope="col" width="30%" rowspan="2">Mức độ TNGT</td>
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
                <td class="text-start">{{thongkedata.tenMucDoTNGT}}</td>
                <template v-for="data in thongkedatas[index].soLieuQuanHuyens">
                  <td v-show="truongthongtin_current[0]?.checked" style="border-left: 0.13rem solid lightgray;">
                    {{data.soVu}}</td>

                  <td v-show="truongthongtin_current[1]?.checked">{{data.soNguoiChet}}</td>
                  <td v-show="truongthongtin_current[2]?.checked">{{data.soNguoiBiThuong}}</td>
                  <td v-show="truongthongtin_current[3]?.checked">{{data.soOtoHuHong}}</td>
                  <td v-show="truongthongtin_current[4]?.checked">{{data.soMotoHuHong}}</td>
                  <td v-show="truongthongtin_current[5]?.checked">{{data.soTienThietHai}}</td>
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
  import GiaoThongService from "../../services/giaothong.service";

  export default {
    data() {
      return {
        thongke_param_obj: {},
        thongkedatas: [],
        truongthongtin_current: [
          {
            title: "Số vụ ",
            id: "Số vụ",
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
            title: "Số người bị thương",
            id: "Số bị thương",
            index: 2,
            checked: true,
            readonly: 0
          },
          {
            title: "Số ô tô hư hỏng",
            id: "Ô tô hỏng",
            index: 3,
            checked: false,
            readonly: 0
          },
          {
            title: "Số mô tô hư hỏng",
            id: "Mô tô hỏng",
            index: 4,
            checked: false,
            readonly: 0
          },
          {
            title: "Số tiền thiệt hải",
            id: "Số tiền Thiệt hại",
            index: 5,
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
        
        GiaoThongService.thongke(this.thongke_param_obj).then(
          (res) => {
            loader.hide();
            if (res.success) {
              this.thongkedatas = res.data;
              let sum_data_obj;
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


                sum_data_obj = JSON.parse(JSON.stringify(this.thongkedatas[1]));
                sum_data_obj.tenMucDoTNGT = "Tổng TNGT (trừ va chạm)";
                for (let i = 2; i < this.thongkedatas.length; i++) {
                  for (let j = 0; j < this.thongkedatas[i].soLieuQuanHuyens.length; j++) {
                    let data = this.thongkedatas[i].soLieuQuanHuyens[j];
                    this.calculatevalue(sum_data_obj.soLieuQuanHuyens[j], data);
                  }
                  if (this.thongkedatas[i].soLieuQuanHuyens[0].soVu == 0) {

                    //this.thongkedatas.splice(i, 1);
                    //i--;
                  }
                }

                this.thongkedatas.push(sum_data_obj);

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
        sumdata.soNguoiBiThuong += data.soNguoiBiThuong;
        sumdata.soOtoHuHong += data.soOtoHuHong;
        sumdata.soMotoHuHong += data.soMotoHuHong;      

        sumdata.soTienThietHai += data.soTienThietHai;
        sumdata.soTienThietHai =  Math.round(data.soTienThietHai * 100) / 100; 
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