<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Danh sách đối tượng</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
          <li class="breadcrumb-item">Quản lý vụ việc</li>
          <li class="breadcrumb-item">Tra cứu đối tượng</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">
      <div class="card">
        <div class="card-body">
          <div class="mt-4 mb-2 text-center">
            <h3>
              <b>Tra cứu đối tượng</b>
            </h3>
          </div>

          <form @submit.prevent="timkiemdoituong">
            <div class="row mb-2">
              <div class="col-sm-3">
                <label>Họ tên</label>
                <input type="text" class="form-control" v-model="timkiemobj.hoTen" />
              </div>
              <div class="col-sm-3">
                <label>Tội danh</label>
                <select class="form-select" v-model="timkiemobj.maToiDanh">
                  <option v-for="toidanh in toidanhs" :key="toidanh.maToiDanh" :value="toidanh.maToiDanh">
                    {{toidanh.tenToiDanh}}
                  </option>
                </select>
              </div>
              <div class="col-sm-3">
                <label>Tỉnh HKTT</label>
                <select class="form-select" v-model="timkiemobj.maTinhHKTT">
                  <option v-for="tinhthanh in tinhthanhs" :key="tinhthanh.maTinhThanh" :value="tinhthanh.maTinhThanh">
                    {{ tinhthanh.tenTinhThanh }}
                  </option>
                </select>
              </div>
              <div class="col-sm-3">
                <label>Huyện HKTT</label>
                <select class="form-select" v-model="timkiemobj.maHuyenHKTT">
                  <option v-for="quanhuyen in quanhuyens" :key="quanhuyen.maQuanHuyen" :value="quanhuyen.maQuanHuyen">
                    {{ quanhuyen.tenQuanHuyen }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-sm-3">
                <label>Vụ việc từ ngày</label>
                <MyDatePicker id="datepicker_tungay" v-model="timkiemobj.tuNgay">
                </MyDatePicker>
              </div>
              <div class="col-sm-3">
                <label>Vụ việc đến ngày</label>
                <MyDatePicker id="datepicker_denngay" v-model="timkiemobj.denNgay">
                </MyDatePicker>
              </div>
              <div class="col-sm-3">
                <label>Loại ngày tìm kiếm</label>
                <select class="form-select" v-model="timkiemobj.loaiNgayTimKiem">
                  <option value="1" selected>Ngày báo cáo</option>
                  <option value="2">Ngày xảy ra</option>
                </select>
              </div>


              <div class="col-sm-3">
                <label>Nghề nghiệp đối tượng</label>
                <select class="form-select" v-model="timkiemobj.maNgheNghiepDoiTuong">
                  <option v-for="nghenghiepdoituong in nghenghiepdoituongs"
                    :key="nghenghiepdoituong.maNgheNghiepDoiTuong" :value="nghenghiepdoituong.maNgheNghiepDoiTuong">
                    {{ nghenghiepdoituong.tenNgheNghiepDoiTuong }}
                  </option>
                </select>
              </div>
              </div>
              <div class="row mb-2">
                <div class="col-sm-3">
                  <label>Năm sinh từ</label>
                  <input type="number" class="form-control" v-model="timkiemobj.tuNamSinh" />
                </div>
                <div class="col-sm-3">
                  <label>Năm sinh đến</label>
                  <input type="number" class="form-control" v-model="timkiemobj.denNamSinh" />
                </div>
                <div class="col-sm-3 ">
                  <label>Giới tính:</label>
                  <select class="form-select" v-model="timkiemobj.nuGioi">
                    <option value="-1" selected>Tất cả</option>
                    <option value="1">Nữ</option>
                    <option value="0">Nam</option>
                  </select>
                </div>
                <div class="col-sm-3 ">
                  <label>Nghiện ma túy:</label>
                  <select class="form-select" v-model="timkiemobj.tienAnTienSu">
                    <option value="-1" selected>Tất cả</option>
                    <option value="1">Có</option>
                    <option value="0">Không</option>
                  </select>
                </div>

              </div>
              <div class="row mb-2">
                <div class="col-sm-3 ">
                  <label>Tiền án tiền sự:</label>
                  <select class="form-select" v-model="timkiemobj.tienAnTienSu">
                    <option value="-1" selected>Tất cả</option>
                    <option value="1">Có</option>
                    <option value="0">Không</option>
                  </select>
                </div>
                <div class="col-sm-3 ">
                  <label>Khởi tố:</label>
                  <select class="form-select" v-model="timkiemobj.khoiTo">
                    <option value="-1" selected>Tất cả</option>
                    <option value="1">Có</option>
                    <option value="0">Không</option>
                  </select>
                </div>
                <div class="col-sm-3 ">
                  <label>XLHC:</label>
                  <select class="form-select" v-model="timkiemobj.xlhc">
                    <option value="-1" selected>Tất cả</option>
                    <option value="1">Có</option>
                    <option value="0">Không</option>
                  </select>
                </div>

              </div>

              <div class="d-flex justify-content-center gap-2 d-flex">
                <button type="submit" class="btn btn-primary">Tìm kiếm</button>
                <button type="button" class="btn btn-info">Trích xuất</button>
              </div>
          </form>

          <div class="row mt-3">
            <div class="col-sm-7 d-flex justify-content-center  flex-column" style="font-size: 14px; line-height: 1">
              <p>Có <b>{{tongsodoituong}}</b> đối tượng được tìm thấy.</p>
            </div>
          </div>
          <div class="row mt-3">
            <table class="table table-bordered table-striped">
              <thead>
                <tr class="text-center align-middle">
                  <th>#</th>
                  <th>Họ tên</th>
                  <th>Năm sinh</th>
                  <th>HKTT</th>
                  <th>Nghề nghiệp</th>              
                  <th>Nữ giới</th>
                  <th>Nghiện ma túy</th>
                  <th>Tiền án tiền sự</th>
                  <th>Khởi tố</th>
                  <th>XLHC</th>
                  <th>Ngày báo cáo - Ngày xảy ra</th>
                  <th>Vụ việc</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in doituongs" :key="index">
                  <td class="text-center">{{ index +1 }}</td>
                  <td>{{ item.hoTen }}</td>
                  <td class="text-center">{{ item.namSinh }}</td>
                  <td>{{ item.tenHuyenHKTT }} - {{ item.tenTinhHKTT }}</td>
                  <td>{{ item.tenNgheNghiepDoiTuong }}</td>
                  <td class="text-center"><i class="bi bi-check-square" v-show="item.nuGioi == 'True'"></i></td>
                  <td class="text-center"><i class="bi bi-check-square" v-show="item.nghienMaTuy == 'True'"></i></td>
                  <td class="text-center"><i class="bi bi-check-square" v-show="item.tienAnTienSu == 'True'"></i></td>
                  <td class="text-center"><i class="bi bi-check-square" v-show="item.khoiTo == 'True'"></i></td>
                  <td class="text-center"><i class="bi bi-check-square" v-show="item.xlhc == 'True'"></i></td>
           
                  <td class="text-center">{{ item.ngayBaoCao}} - {{item.ngayXayRa }}</td>
                  <td class="text-center">
                   <i class="bi bi-card-list" role="button"></i> Chi tiết
                  </td>
                </tr>
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-start" id="divSoTrang" v-html="phan_trang_html"></ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import DoiTuongService from "../../services/doituong.service";

  export default {
    data() {
      return {
        toidanhs: [],
        quanhuyens: [],
        tinhthanhs: [],
        nghenghiepdoituongs: [],
        phan_trang_html: "",
        current_page_index: 1,
        num_row_one_page: 20,
        SoTrangTrenManHinh: 10,
        timkiemobj: {},
        tongsodoituong: 0,
      };
    },
    created() {
      this.timkiemobj.tuNgay = '23/12/2010';
      this.timkiemobj.denNgay = moment().format(DEFAULT_DATE_FORMAT);
      this.laydulieubandau();
    },
    methods: {
      laydulieubandau() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        DoiTuongService.laydulieudanhmuc().then(
          (res) => {

            loader.hide();
            if (res.success) {
              let list_danhmuc = res.data;
              this.toidanhs = list_danhmuc[0];
              this.timkiemobj.maToiDanh = this.toidanhs[0].maToiDanh;
              this.tinhthanhs = list_danhmuc[1];
              this.timkiemobj.maTinhHKTT = this.tinhthanhs[0].maTinhThanh;
              this.quanhuyens = list_danhmuc[2];
              this.timkiemobj.maHuyenHKTT = this.quanhuyens[0].maQuanHuyen;
              this.nghenghiepdoituongs = list_danhmuc[3];
              this.timkiemobj.maNgheNghiepDoiTuong = this.nghenghiepdoituongs[0].maNgheNghiepDoiTuong;
              this.timkiemobj.loaiNgayTimKiem = 1;
              //this.timkiemdoituong();
            }
          },
          (error) => {
            loader.hide();
          }
        );
      },
      timkiemdoituong() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        this.timkiemobj.pageSize = this.num_row_one_page;
        this.timkiemobj.pageIndex = this.current_page_index;

        DoiTuongService.laydanhsachdoituong(this.timkiemobj).then(
          (res) => {
            console.log(res.data);
            loader.hide();
            if (res.success) {
              this.doituongs = res.data;
              let total_row = parseInt(res.alt);
              this.tongsodoituong = total_row;
              this.phan_trang_html = this.getHTMLOfPageSplitter(
                total_row,
                this.current_page_index,
                ""
              );
              this.$nextTick(function () {
                const vm = this;
                $(".page-button").on("click", function (event) {
                  vm.goto_page($(this).attr("page-index"));
                  event.preventDefault();
                });
              });

            }
          },
          (error) => {
            loader.hide();
          }
        );
      },
      getNumberOfPage(numOfRecord) {
        let numOfPage = Math.round(
          (numOfRecord - 1) / this.num_row_one_page + 0.501
        );
        return numOfPage;
      },
      getHTMLOfPageSplitter(numOfRecord, pageIndex, pageURL) {
        let numOfPage = this.getNumberOfPage(numOfRecord);

        let result = "";
        //int startIdx = (pageIndex - 1) / (PageSize) * PageSize + 1;
        let startIdx = 0;
        startIdx = Math.floor((pageIndex - 1) / this.SoTrangTrenManHinh) * this.SoTrangTrenManHinh + 1;

        //thêm page trước
        if (startIdx <= this.SoTrangTrenManHinh) {
          result +=
            '<li class="page-item disabled"><span class="page-link">Trước</span></li>';
        } else {
          result += '<li class="page-item">';
          result +=
            '<a class="page-link page-button" href="#" page-index="' +
            (startIdx - 1) +
            '">Trước</a></li>';
        }

        //thêm số page giữa
        for (let i = startIdx; i < startIdx + this.SoTrangTrenManHinh; i++) {
          if (i > numOfPage) {
            break;
          }
          if (i == pageIndex) {
            result +=
              '<li class="page-item active"><a class="page-link" href=\'#\'>' +
              i +
              "</a></li>";
          } else {
            result +=
              '<li class="page-item "><a page-index="' +
              i +
              '" class="page-link page-button" href=\'#\'>' +
              i +
              "</a></li>";
          }
        }
        //thêm số page sau
        if (startIdx + this.SoTrangTrenManHinh <= numOfPage) {
          result += '<li class="page-item">';
          result +=
            '<a class="page-link page-button" href="#" page-index="' +
            (startIdx + this.SoTrangTrenManHinh) +
            '">Sau</a></li>';
        } else {
          result +=
            '<li class="page-item disabled"><span class="page-link">Sau</span></li>';
        }
        return result;
      },
      goto_page(page_index) {
        this.current_page_index = page_index;
        this.timkiemdoituong();
      },
      getNoiDungTomTat(noidung) {
        let minLength = 200;
        if (noidung.length > minLength) {
          for (let i = minLength; i < noidung.length; i++) {
            if (noidung[i] == ' ') {
              noidung = noidung.substring(0, i);
              noidung += " ..."
              break;
            }
          }
        }
        return noidung;

      }
      , toggleTimKiemMoRong() {
        this.isDisplayTimKiemMoRong = !this.isDisplayTimKiemMoRong;
      }
    },

  };
</script>