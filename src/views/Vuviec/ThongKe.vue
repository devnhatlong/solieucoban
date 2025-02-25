<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Thống kê</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
          <li class="breadcrumb-item">Quản lý vụ việc</li>
          <li class="breadcrumb-item">Thống kê</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">
      <div class="card">
        <div class="card-body">
          <div class="mt-4 mb-2 text-center">
            <h3>
              <b>Thống kê số liệu vụ việc</b>
            </h3>
          </div>

          <div class="row mb-3">

            <div class="col-2">
              Từ ngày: <MyDatePicker id="datepicker_tungay" v-model="thongke_param_obj.tuNgay"></MyDatePicker>
            </div>
            <div class="col-2">
              đến ngày <MyDatePicker id="datepicker_denngay" v-model="thongke_param_obj.denNgay"> </MyDatePicker>
            </div>
            <div class="col-2">
              Loại ngày:
              <select id="cmbLoaiNgay" class="form-select" v-model="thongke_param_obj.loaiNgayTimKiem">
                <option value="1">Ngày báo cáo</option>
                <option value="2">Ngày xảy ra</option>
              </select>
            </div>

            <div class="col-2">
              Lĩnh vực:
              <select class="form-select" v-model="thongke_param_obj.maLinhVucVuViec" @change="linhvucvuviec_onchange"
                id="select_linhvuc">
                <option v-for="linhvuc in linhvucs" :key="linhvuc.maLinhVucVuViec" :value="linhvuc.maLinhVucVuViec">
                  {{ linhvuc.tenLinhVucVuViec }}
                </option>
              </select>
            </div>

            <div class="col-2 mt-auto">
              <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal"
                data-bs-target="#toidanh_quanhuyen_backdrop">
                Chọn tội danh, địa bàn
              </button>

            </div>

          </div>
          <div class="row mb-3">

            <div class="col-12 text-center">
              <button id="Button1" class="btn btn-primary px-4 mx-1" type="button" @click="thongke">Xem thống
                kê</button>
              <button class="btn btn-info  mx-1" type="button" @click="exportExcel">Xuất excel
                <i class="bi bi-printer"></i></button>
              <button type="button" class="btn btn-success mx-1" data-bs-toggle="modal"
                data-bs-target="#truongthongtin_backdrop">
                Chọn trường hiển thị (số vụ rõ, số đt...)
              </button>
            </div>
          </div>
          <div class="row mb-3" id="divThongkeVuViec" style="display: none">
            <table id="tableThongKe" class="table table-sm table-bordered small table-striped text-center">
              <thead>
                <tr class="text-center align-middle">
                  <th scope="col" rowspan="2">#</th>
                  <th scope="col" width="20%" rowspan="2">Tên tội danh</th>
                  <template v-for="data in thongkedatas[0]?.soLieuQuanHuyens">
                    <th :colspan="get_count_of_display_field" style="border-left: 0.13rem solid lightgray">
                      {{data.tenQuanHuyen}}</th>
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
                    <td>{{index==0?'':index}}</td>
                    <td class="text-start">{{thongkedata.tenToiDanh}}</td>
                    <template v-for="data in thongkedatas[index].soLieuQuanHuyens" :class="data.checked?'':'d-none'">
                      <td v-show="truongthongtin_current[0]?.checked" style="border-left: 0.13rem solid lightgray;">
                        {{data.soVu}}</td>
                      <td v-show="truongthongtin_current[1]?.checked">{{data.soVuRo}}</td>
                      <td v-show="truongthongtin_current[2]?.checked">{{data.soDoiTuong}}</td>
                      <td v-show="truongthongtin_current[3]?.checked">{{data.soDoiTuongDuoi13}}</td>
                      <td v-show="truongthongtin_current[4]?.checked">{{data.soDoiTuongDuoi16}}</td>
                      <td v-show="truongthongtin_current[5]?.checked">{{data.soNguoiChet}}</td>
                      <td v-show="truongthongtin_current[6]?.checked">{{data.soNguoiBiThuong}}</td>
                      <td v-show="truongthongtin_current[7]?.checked">{{data.soTreEmBiXamHai}}</td>
                      <td v-show="truongthongtin_current[8]?.checked">{{data.taiSanThietHai}}</td>
                      <td v-show="truongthongtin_current[9]?.checked">{{data.taiSanThuHoi}}</td>
                    </template>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <!--
          <div class="row mb-3 d-none">
            <div class="col-md-3">
              <button id="btnExportExcel" class="btn btn-info " @click="btnExportExcel_Click">Xuất
                Excel</button>
              <button id="btnDrawChart" class="btn btn-success mx-2" type="button" title="Xem biểu đồ"
                @click="drawChart();">Xem biểu đồ</button>
            </div>
            <div class="col-md-3">
              Chọn loại biểu đồ:
              <select id="selectChartType" class="form-select" title="Loại biểu đồ">
                <option value="1">Hình Cột</option>
                <option value="2">Đường thẳng</option>
                <option value="3">Hình tròn</option>

              </select>
            </div>
            <div class="col-md-3">
              <label class="text-right">Chọn cột giá trị: </label>

              <select id="selectChartType" class="form-select" title="Loại biểu đồ">
                <option value="1">Hình Cột</option>
                <option value="2">Đường thẳng</option>

                <option value="3">Hình tròn</option>

              </select>
            </div>
            <div class="col-md-3">
              <button type="button" class="btn btn-info" data-toggle="modal" data-target="#showListModal">
                Chọn trường hiển thị
              </button>

            </div>

          </div>
          <div class="row mb-3">
            <div class="col-md-10 mx-auto mt-5" id="chartContainer">
             <canvas class="w-100" id="myChart" hidden></canvas>
            </div>

          </div>
        -->
        </div>
      </div>
    </section>
    <div class="modal fade " id="truongthongtin_backdrop" tabindex="-1" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">

            <h5 class="modal-title">Chọn trường hiển thị</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                Cột số liệu
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

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="apdung_onclick">Áp
              dụng</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade modal-xl" id="toidanh_quanhuyen_backdrop" tabindex="-2" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">

            <h5 class="modal-title">Chọn tội danh, địa bàn thống kê</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="apdungtoidanh_quanhuyen_onclick"></button>
          </div>
          <div class="modal-body">
            <div class="row small">
              <div class="col-6">
                <div class="row mb-2">
                  <div class="col-6 text-start"> Chọn Tội danh </div>
                  <div class="col-6 text-end "><label>Chọn tất cả <input type="checkbox" class="form-check-input"
                        checked @change="checkall_toidanh($event)" /></label></div>
                </div>

                <ul class="list-group">
                  <template :key="index" v-for="(toidanh,index) in toidanhs">

                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      {{index+1}}. {{toidanh.tenToiDanh}}
                      <input type="checkbox" class="form-check-input" v-model="toidanh.checked" />
                    </li>
                  </template>
                </ul>
              </div>
              <div class="col-6">
               
                
                <div class="row mb-2">
                  <div class="col-6 text-start">  Chọn huyện, TX, TP </div>
                  <div class="col-6 text-end "><label>Chọn tất cả <input type="checkbox" class="form-check-input"
                        checked @change="checkall_quanhuyen($event)" /></label></div>
                </div>
                <ul class="list-group">
                  <template :key="index2" v-for="(quanhuyen,index2) in quanhuyens">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      {{quanhuyen.tenQuanHuyen}}
                      <input type="checkbox" class="form-check-input" v-model="quanhuyen.checked" />
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"  @click="apdungtoidanh_quanhuyen_onclick">Thoát</button>
         
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VuViecService from "../../services/vuviec.service";

  export default {
    data() {
      return {
        thongke_param_obj: {},
        thongkedatas: [],
        truongthongtin_current: [
          {
            title: "Số vụ việc",
            id: "Số vụ",
            index: 0,
            checked: true,
            readonly: 1
          },
          {
            title: "Số vụ việc rõ",
            id: "Số vụ rõ",
            index: 1,
            checked: true,
            readonly: 0
          },
          {
            title: "Số đối tượng",
            id: "Số ĐT",
            index: 2,
            checked: true,
            readonly: 0
          },
          {
            title: "Số đối tượng dưới 13t",
            id: "Số ĐT dưới 13t",
            index: 3,
            checked: false,
            readonly: 0
          },
          {
            title: "Số đối tượng dưới 16t",
            id: "Số ĐT dưới 16t",
            index: 4,
            checked: false,
            readonly: 0
          },
          {
            title: "Số người chết",
            id: "SN chết",
            index: 5,
            checked: false,
            readonly: 0
          },
          {
            title: "Số người bị thương",
            id: "SN bị thương",
            index: 6,
            checked: false,
            readonly: 0
          },
          {
            title: "Số trẻ em bị xâm hại",
            id: "Trẻ bị xâm hại",
            index: 7,
            checked: false,
            readonly: 0
          },
          {
            title: "Tài sản thiệt hại",
            id: "TS thiệt hại",
            index: 8,
            checked: false,
            readonly: 0
          },
          {
            title: "Tài sản thu hồi",
            id: "TS thu hồi",
            index: 9,
            checked: false,
            readonly: 0
          }
        ],
        truongthongtin_choose: [],
        toidanhs: [],
        toidanh_alls: [],
        quanhuyens: [],
        linhvucs: [],
        applied: false
      };
    },
    created() {
      this.thongke_param_obj.tuNgay = '16/11/2024';
      this.thongke_param_obj.denNgay = moment().format(DEFAULT_DATE_FORMAT);
      this.thongke_param_obj.loaiNgayTimKiem = "1";
      this.thongke_param_obj.chonDiaBanNgoaiTinh = false;
      this.truongthongtin_choose = JSON.parse(JSON.stringify(this.truongthongtin_current));

      this.thongkedatas = [];

      this.laydulieuformthongke();

      this.$nextTick(function () {
        var myModalEl = document.getElementById('truongthongtin_backdrop');
        const vm = this;
        myModalEl.addEventListener('hidden.bs.modal', function (event) {
          vm.apdungchontruonghienthi();
        })
      });
    },
    methods: {
      laydulieuformthongke() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        const vm = this;
        VuViecService.laydulieuformthongke().then(
          (res) => {
            loader.hide();
            if (res && res.success) {
              this.linhvucs = res.data.linhvucs;
              this.thongke_param_obj.maLinhVucVuViec = this.linhvucs[0].maLinhVucVuViec;
              this.toidanh_alls = res.data.toidanhs;

              this.toidanh_alls.forEach(element => {
                element.checked = true;
              });
              this.linhvucvuviec_onchange();
              this.quanhuyens = res.data.quanhuyens;
              this.quanhuyens.forEach(element => {
                element.checked = true;
              })
              //this.thongke();
            }
          },
          (error) => {
            loader.hide();
          }
        )
      },
      linhvucvuviec_onchange() {

        this.toidanhs = this.toidanh_alls.filter((toidanh_item) => (toidanh_item.maToiDanh == -1 || toidanh_item.maLinhVucVuViec == this.thongke_param_obj.maLinhVucVuViec));
        //this.timkiemobj.maToiDanh = this.toidanhs[0].maToiDanh;
      },
      thongke() {
     
        this.thongke_param_obj.maToiDanhs = [];
        this.thongke_param_obj.maQuanHuyens = [];
        this.toidanhs.forEach(element => {
          if (element.checked) {
            this.thongke_param_obj.maToiDanhs.push(element.maToiDanh);
          }
        });
      
        this.quanhuyens.forEach(element => {
          if (element.checked) {
            this.thongke_param_obj.maQuanHuyens.push(element.maQuanHuyen);
          }
        });
      
        let loader = this.$loading.show(this.LOADING_PARAM);
        VuViecService.thongkevuviec(this.thongke_param_obj).then(
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

                  for (let n = 0; n < this.thongkedatas[m].soLieuQuanHuyens.length; n++) {
                    let data = this.thongkedatas[m].soLieuQuanHuyens[n];
                    if (n > 0) {
                      this.calculatevalue(sum_quanhuyen_obj, data);
                    }
                  }
                  this.thongkedatas[m].soLieuQuanHuyens.unshift(sum_quanhuyen_obj);
                }
                sum_data_obj = JSON.parse(JSON.stringify(this.thongkedatas[0]));
                sum_data_obj.tenToiDanh = "Tổng cộng";
                for (let i = 1; i < this.thongkedatas.length; i++) {
                  if (i > 0) {
                    for (let j = 0; j < this.thongkedatas[i].soLieuQuanHuyens.length; j++) {
                      let data = this.thongkedatas[i].soLieuQuanHuyens[j];
                      this.calculatevalue(sum_data_obj.soLieuQuanHuyens[j], data);
                    }
                  }
                }
                for (let i = 0; i < this.thongkedatas.length; i++) {
                  if (this.thongkedatas[i].soLieuQuanHuyens[0].soVu == 0) {
                    this.thongkedatas.splice(i, 1);
                    i--;
                  }
                }
                this.thongkedatas.unshift(sum_data_obj);
              }
              $('#divThongkeVuViec').show(500, function () {

              });
            }
          },
          (error) => {
            loader.hide();
          }
        );
      },
      calculatevalue(sumdata, data) {
        sumdata.soVu += data.soVu;
        sumdata.soVuRo += data.soVuRo;
        sumdata.soDoiTuong += data.soDoiTuong;
        sumdata.soDoiTuongDuoi13 += data.soDoiTuongDuoi13;
        sumdata.soDoiTuongDuoi16 += data.soDoiTuongDuoi16;
        sumdata.soNguoiChet += data.soNguoiChet;
        sumdata.soNguoiBiThuong += data.soNguoiBiThuong;
        sumdata.soTreEmBiXamHai += data.soTreEmBiXamHai;
        sumdata.taiSanThietHai += data.taiSanThietHai;
        sumdata.taiSanThietHai = Math.round(sumdata.taiSanThietHai * 100) / 100;
        sumdata.taiSanThuHoi += data.taiSanThuHoi;
        sumdata.taiSanThuHoi = Math.round(data.taiSanThuHoi * 100) / 100;
      },

      exportExcel() {
        $("#tableThongKe").table2excel({
          exclude: ".noExl",
          name: "Worksheet Name",
          filename: "trichxuat_thongkevuviec",
          fileext: ".xls", // file extension
          preserveColors: true

        });
      },
      apdung_onclick() {
        $("#truongthongtin_backdrop").modal('hide');
        this.applied = true;
      },
      apdungtoidanh_quanhuyen_onclick(){
        this.thongke_param_obj.maToiDanhs = [];
        this.thongke_param_obj.maQuanHuyens = [];
        this.toidanhs.forEach(element => {
          if (element.checked) {
            this.thongke_param_obj.maToiDanhs.push(element.maToiDanh);
          }
        });
        if( this.thongke_param_obj.maToiDanhs.length == 0){
          this.$swal.fire({ title: "Thông báo!", text: "Chọn ít nhất một tội danh để thống kê.", icon: "warning" });
          return;
        }
        this.quanhuyens.forEach(element => {
          if (element.checked) {
            this.thongke_param_obj.maQuanHuyens.push(element.maQuanHuyen);
          }
        });
        if( this.thongke_param_obj.maQuanHuyens.length == 0){
          this.$swal.fire({ title: "Thông báo!", text: "Chưa ít nhất một quận huyện để thống kê.", icon: "warning" });
          return;
        }
        $("#toidanh_quanhuyen_backdrop").modal('hide');
      },
      checkall_toidanh(obj) {
        this.toidanhs.forEach(element => {
        
          element.checked = obj.target.checked;
        });

      },
      checkall_quanhuyen(obj) {
        this.quanhuyens.forEach(element => {
         
          element.checked = obj.target.checked;
        });

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