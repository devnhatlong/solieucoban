<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Danh sách vụ việc</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
          <li class="breadcrumb-item">Quản lý vụ việc</li>
          <li class="breadcrumb-item active">Danh sách vụ việc</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">
      <div class="card">
        <div class="card-body">
          <div class="mt-4 mb-2 text-center">
            <h3>
              <b>Danh sách vụ việc</b>
            </h3>
            <span>Hiển thị danh sách tất cả các vụ việc sắp xếp theo thời gian gần nhất</span>
          </div>

          <form @submit.prevent="timkiemvuviec">
            <div class="row mb-2">
              <div class="col-sm-12">
                <label>Nội dung tìm kiếm</label>
                <input type="text" class="form-control" v-model="timkiemobj.noiDung" />
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-sm-4">
                <label>Lĩnh vực</label>
                <select class="form-select" v-model="timkiemobj.maLinhVucVuViec" @change="linhvucvuviec_onchange"
                  id="select_linhvuc">
                  <option v-for="linhvuc in linhvucs" :key="linhvuc.maLinhVucVuViec" :value="linhvuc.maLinhVucVuViec">
                    {{ linhvuc.tenLinhVucVuViec }}
                  </option>
                </select>
              </div>
              <div class="col-sm-4 ">
                <label>Tội danh</label>              
                <model-list-select :list="toidanhs" v-model="timkiemobj.maToiDanh" option-value="maToiDanh"
                option-text="tenToiDanh" placeholder="Chọn tội danh vụ việc">
                </model-list-select>
              </div>
              <div class="col-sm-4">
                <label>Địa bàn</label>
                <select class="form-select" v-model="timkiemobj.maQuanHuyen">
                  <option v-for="quanhuyen in quanhuyens" :key="quanhuyen.maQuanHuyen" :value="quanhuyen.maQuanHuyen">
                    {{ quanhuyen.tenQuanHuyen }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4">
                <label>Từ ngày</label>
                <MyDatePicker id="datepicker_tungay" v-model="timkiemobj.tuNgay">
                </MyDatePicker>
              </div>
              <div class="col-sm-4">
                <label>Đến ngày</label>
                <MyDatePicker id="datepicker_denngay" v-model="timkiemobj.denNgay">
                </MyDatePicker>
              </div>
              <div class="col-sm-4">
                <label>Loại ngày tìm kiếm</label>
                <select class="form-select" v-model="timkiemobj.loaiNgayTimKiem">
                  <option value="1" selected>Ngày báo cáo</option>
                  <option value="2">Ngày xảy ra</option>
                </select>
              </div>
            </div>

            <div id="div_timkiemmorong" v-show="isDisplayTimKiemMoRong">
              <div class="row mb-2">
                <div class="col-sm-4">
                  <label>Kết quả điều tra</label>
                  <select class="form-select" v-model="timkiemobj.maKetQuaDieuTra">
                    <option v-for="ketquadieutra in ketquadieutras" :key="ketquadieutra.maKetQuaDieuTra"
                      :value="ketquadieutra.maKetQuaDieuTra">
                      {{ ketquadieutra.tenKetQuaDieuTra }}
                    </option>
                  </select>
                </div>
                <div class="col-sm-4">
                  <label>Kết quả xử lý</label>

                  <select class="form-select" v-model="timkiemobj.maKetQuaXuLy">
                    <option v-for="ketquaxuly in ketquaxulys" :key="ketquaxuly.maKetQuaXuLy"
                      :value="ketquaxuly.maKetQuaXuLy">
                      {{ ketquaxuly.tenKetQuaXuLy }}
                    </option>
                  </select>

                </div>
                <div class=" col-sm-4 ">
                  <label>Mức độ vụ việc</label>

                  <select class="form-select" v-model="timkiemobj.maMucDoVuViec">
                    <option v-for="mucdovuviec in mucdovuviecs" :key="mucdovuviec.maMucDoVuViec"
                      :value="mucdovuviec.maMucDoVuViec">
                      {{ mucdovuviec.tenMucDoVuViec }}
                    </option>
                  </select>

                </div>
              </div>
              <div class="row mb-2">
                <div class=" col-sm-4 ">
                  <label>Gửi Bộ (vụ theo dõi):</label>

                  <select class="form-select" v-model="timkiemobj.daGuiBo">
                    <option value="-1" selected>Tất cả</option>
                    <option value="1">Đã gửi</option>
                    <option value="0">Chưa gửi</option>
                  </select>

                </div>
                <div class=" col-sm-4 ">
                  <label>Đánh dấu chú ý</label>

                  <select class="form-select" v-model="timkiemobj.danhDau">
                    <option value="-1" selected>Tất cả</option>
                    <option value="1">Có</option>
                    <option value="0">Không</option>
                  </select>

                </div>
                <div class=" col-sm-4 ">
                  <label>Cấp xã thụ lý ban đầu:
                  </label>
                  <select class="form-select" v-model="timkiemobj.capXaThuLy">
                    <option value="-1" selected>Tất cả</option>
                    <option value="1">Có</option>
                    <option value="0">Không</option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-4 ">
                  <label>Trạng thái duyệt:</label>
                  <select class="form-select" v-model="timkiemobj.trangThaiDuyet">
                    <option value="-1" selected>Tất cả</option>
                    <option value="1">Chưa duyệt</option>
                    <option value="2">không duyệt</option>
                    <option value="3">Đã duyệt</option>
                  </select>
                </div>
                <div class="col-sm-4 ">
                  <label>Án mở rộng:</label>
                  <select class="form-select" v-model="timkiemobj.anMoRong">
                    <option value="-1" selected>Tất cả</option>
                    <option value="1">Có</option>
                    <option value="0">Không</option>
                  </select>
                </div>
                <div class="col-sm-4 ">
                  <label>Băng ổ nhóm:</label>
                  <select class="form-select" v-model="timkiemobj.bangONhom">
                    <option value="-1" selected>Tất cả</option>
                    <option value="1">Có</option>
                    <option value="0">Không</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center gap-2 d-flex">
              <button type="submit" class="btn btn-primary">Tìm kiếm</button>
              <button type="button" class="btn btn-secondary" @click="toggleTimKiemMoRong">Tìm kiếm mở rộng</button>
              <button type="button" class="btn btn-success">
                <a href="/Vuviec/Themvuviec" style="color: white">
                  Thêm vụ việc
                </a>
              </button>
              <button type="button" class="btn btn-info" @click="exportExcel">Xuất Excel</button>
            </div>
          </form>

          <div class="row mt-3">
            <div class="col-sm-7 d-flex justify-content-center  flex-column" style="font-size: 14px; line-height: 1">
              <p>Có <b>{{tongsovuviec}}</b> vụ việc được tìm thấy.</p>

            </div>
            <div class="col-sm-5 text-center d-none" style="font-size: 14px; line-height: 1">
              <p style="color: #6c757d; margin: 0">Ghi chú định dạng vụ việc</p>
              <p style="background-color: lightblue; margin: 0">
                Vụ việc chưa được duyệt
              </p>
              <p style="background-color: lightcoral; margin: 0">
                Vụ việc không được duyệt
              </p>
              <p style="color: blue; margin: 0">
                Vụ việc đang theo dõi (chưa gửi bộ)
              </p>
              <p style="
                  color: #dc1a1a;
                  font-weight: bold;
                  font-style: italic;
                  margin: 0;
                ">
                Vụ việc đánh dấu chú ý
              </p>
            </div>
          </div>
          <div class="row mt-3">
            <table class="table table-bordered table-sm table-striped small" id="tabledanhsach">
              <thead>
                <tr class="text-center align-middle">
                  <th scope="col" width="3%">#</th>
                  <th scope="col">Đơn vị thụ lý</th>
                  <th scope="col">Huyện, TX, TP</th>                 
                  <th scope="col">Ngày báo cáo</th>
                  <th scope="col">Ngày xảy ra</th>
                  <th scope="col">Tội danh</th>
                  <th scope="col">Nội dung vụ việc</th>
                  <th scope="col">Ghi chú</th>
                  <th scope="col" width="5%">Số đối tượng</th>
                  <th scope="col" width="7%">Phê duyệt của đơn vị</th>
                  <th scope="col" width="7%" v-show="is_PhuongXa_User">Phê duyệt của cấp trên</th>
                  <th scope="col" width="3%">Chi tiết</th>
                  <th scope="col" width="3%">Thao tác</th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="(vuviec, index) in vuviecs" :key="index">
                  <td class="text-center">{{index +1 }}</td>
                  <td>{{vuviec.tenDonViThuLy }}</td>
                  <td>{{vuviec.tenQuanHuyen }}</td>                
                  <td>{{vuviec.ngayBaoCao}}</td>
                  <td>{{vuviec.ngayXayRa}}</td>
                  <td>{{vuviec.tenToiDanh}}</td>
                  <td>{{getNoiDungTomTat(vuviec.noiDung)}}</td>
                  <td>{{vuviec.ghiChu }}</td>
                  <td class="text-center">{{vuviec.soDoiTuong }}</td>


                  <td class="text-center">


                    <template v-if="vuviec.trangThaiDonViPheDuyet=='Chưa duyệt' ">
                      {{vuviec.trangThaiDonViPheDuyet}}
                    </template>
                    <template v-if="vuviec.trangThaiDonViPheDuyet=='Đang theo dõi'">
                      <div class="text-danger">{{!is_PhuongXa_User?'Đang theo dõi':vuviec.trangThaiDonViPheDuyet}} </div>
                    </template>
                    <template v-if="vuviec.trangThaiDonViPheDuyet=='Đã duyệt'">
                      <div class="text-success">{{!is_PhuongXa_User?'Đã gửi bộ':vuviec.trangThaiDonViPheDuyet}}</div>
                    </template>
                    <div v-show="vuviec.trangThaiCapTrenPheDuyet=='Chưa duyệt' ">

                      <button @click="pheduyetvuviec_onclick(vuviec.maVuViec);" class="btn btn-sm btn-primary ">
                        Duyệt</button>

                    </div>

                  </td>
                  <td v-show="is_PhuongXa_User" class="text-center">
                    <template v-if="vuviec.trangThaiCapTrenPheDuyet=='Chưa duyệt'">
                      <div class="text-primary">{{vuviec.trangThaiCapTrenPheDuyet}} </div>
                    </template>
                    <template v-else-if="vuviec.trangThaiCapTrenPheDuyet=='Đang theo dõi'">
                      <div class="text-danger"> {{vuviec.trangThaiCapTrenPheDuyet}}</div>
                    </template>
                    <template v-else>
                      <div class="text-success">
                        {{vuviec.trangThaiCapTrenPheDuyet}}
                      </div>
                    </template>
                  </td>
                  <td class="text-center">
                    <a :href="'/vuviec/chitietvuviec/'+vuviec.maVuViec"><i class="bi bi-card-list"></i></a>
                  </td>

                  <td class="text-center">
                    <div v-show="vuviec.trangThaiCapTrenPheDuyet=='Chưa duyệt' || is_CAT_User">
                      <i class="bi bi-pencil-square" role="button" @click="suavuviec_onclick(vuviec.maVuViec);"></i>
                      <i class="bi bi-trash ms-1" role="button" @click="xoavuviec_onclick(vuviec.maVuViec);"></i>
                    </div>

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
    <div class="modal modal-xl fade" id="modal_pheduyetvuviec" tabindex="-1" aria-modal="true" role="dialog">
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header">

            <h5 class="modal-title">Phê duyệt vụ việc</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <label>Nội dung phê duyệt</label>
            <input type="text" class="form-control" v-model="vuviecpheduyet.noiDungPheDuyet" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="pheduyetvuviec(1)">Duyệt gửi cấp trên</button>
            <button type="button" class="btn btn-warning" @click="pheduyetvuviec(2)">Theo dõi</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VuViecService from "../../services/vuviec.service";
  import { ModelListSelect } from 'vue-search-select'
  export default {
    data() {
      return {
        linhvucs: [], // Mảng lưu trữ các lĩnh vực       
        toidanhs: [], // Mảng lưu trữ các lĩnh vực
        toidanh_alls: [],
        quanhuyens: [], // Mảng lưu trữ các lĩnh vực
        ketquadieutras: [], // Mảng lưu trữ các lĩnh vực
        ketquaxulys: [], // Mảng lưu trữ các lĩnh vực
        mucdovuviecs: [], // Biến lưu trữ lựa chọn hiện tại
        vuviecs: [],
        phan_trang_html: "",
        current_page_index: 1,
        num_row_one_page: 20,
        SoTrangTrenManHinh: 10,
        timkiemobj: {},
        tongsovuviec: 0,
        isDisplayTimKiemMoRong: false,
        vuviecpheduyet: {},
      };
    },
    created() {
      this.timkiemobj.tuNgay = '23/12/2020';
      this.timkiemobj.denNgay = moment().format(DEFAULT_DATE_FORMAT);
      this.laydulieubandau();

    },
    methods: {
      laydulieubandau() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        VuViecService.laydulieuformtimkiem().then(
          (res) => {

            loader.hide();
            if (res && res.success) {

             

              if (this.is_CAT_User || this.is_QuanHuyen_User || this.is_PhuongXa_User) {

                this.linhvucs = res.data.linhvucs;
                this.timkiemobj.maLinhVucVuViec = this.linhvucs[0].maLinhVucVuViec;
              }
              else if (this.is_PhongBan_User && this.get_current_user.phanQuyenLinhVucVuViecs?.length>0) {

                for (let i = 0; i < this.get_current_user.phanQuyenLinhVucVuViecs.length; i++) {

                  this.linhvucs.push(this.get_current_user.phanQuyenLinhVucVuViecs[i].linhVucVuViec);
                }
                this.timkiemobj.maLinhVucVuViec = this.get_current_user.phanQuyenLinhVucVuViecs[0].maLinhVucVuViec;

              }
              else {
                this.$swal.fire({
                  title: "Thông báo",
                  text: "Tài khoản không được phân quyền chức năng này?",
                  icon: "warning",

                }).then((result) => { 
                  this.$router.push("/home");
                 
                })
                return;
              }


              this.quanhuyens = res.data.quanhuyens;
              this.timkiemobj.maQuanHuyen = this.quanhuyens[0].maQuanHuyen;
              this.toidanh_alls = res.data.toidanhs;
              this.linhvucvuviec_onchange();

              this.ketquadieutras = res.data.ketquadieutras;
              this.timkiemobj.maKetQuaDieuTra = this.ketquadieutras[0].maKetQuaDieuTra;
              this.ketquaxulys = res.data.ketquaxulys;
              this.timkiemobj.maKetQuaXuLy = this.ketquaxulys[0].maKetQuaXuLy;
              this.mucdovuviecs = res.data.mucdovuviecs;
              this.timkiemobj.maMucDoVuViec = this.mucdovuviecs[0].maMucDoVuViec;
              this.timkiemobj.daGuiBo = -1;
              this.timkiemobj.danhDau = -1;
              this.timkiemobj.capXaThuLy = -1;
              this.timkiemobj.trangThaiDuyet = -1;
              this.timkiemobj.anMoRong = -1;
              this.timkiemobj.bangONhom = -1;
              this.timkiemobj.loaiNgayTimKiem = 1;

              this.timkiemvuviec();
            }
          },
          (error) => {
            loader.hide();
          }
        );
      },
      timkiemvuviec() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        this.timkiemobj.pageSize = this.num_row_one_page;
        this.timkiemobj.pageIndex = this.current_page_index;
        VuViecService.laydanhsachvuviec(this.timkiemobj).then(
          (res) => {
            loader.hide();
            if (res.success) {
              this.vuviecs = res.data;
              console.log(this.vuviecs);
              let total_row = parseInt(res.alt);
              this.tongsovuviec = total_row;
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
      suavuviec_onclick(mavuviec) {
        this.$router.push('/vuviec/suavuviec/' + mavuviec);
      },
      xoavuviec_onclick(mavuviec) {
        this.$swal.fire({
          title: "Thông báo",
          text: "Bạn có chắc muốn xóa vụ việc này không?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Không",
        }).then((result) => {
          if (result.isConfirmed) {
            let loader = this.$loading.show(this.LOADING_PARAM);
            VuViecService.xoavuviec(mavuviec).then(
              (res) => {
                loader.hide();
                if (res && res.success) {
                  this.$swal.fire({
                    title: "Thông báo",
                    text: "Xóa vụ việc thành công.",
                    icon: "success"
                  }).then((result) => {
                    this.timkiemvuviec();
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
      chitietvuviec_onclick(mavuviec) {
        this.$router.push('/vuviec/chitietvuviec/' + mavuviec);
      },
      pheduyetvuviec_onclick(mavuviec) {
        this.vuviecpheduyet = {
          maVuViecPheDuyet: 0,
          maVuViec: parseInt(mavuviec),
          noiDungPheDuyet: '',
          loaiPheDuyet: 1,
          ghiChu: ''
        }
        $('#modal_pheduyetvuviec').modal('show');
      },
      pheduyetvuviec(loaipheduyet) {
        this.vuviecpheduyet.loaiPheDuyet = loaipheduyet;
        let loader = this.$loading.show(this.LOADING_PARAM);
        VuViecService.pheduyetvuviec(this.vuviecpheduyet).then(
          (res) => {
            loader.hide();
            $('#modal_pheduyetvuviec').modal('hide');
            if (res && res.success) {
              this.$swal.fire({ title: "Thông báo!", text: "Thao tác thành công", icon: "success" }).then((result) => {
                this.timkiemvuviec();
              });;

            }
            else {
              this.$swal.fire({ title: "Thông báo!", text: res ? res.message : "Lỗi máy chủ", icon: "error" });
            }

          },
          (error) => {
            loader.hide();
          });

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

        console.log((pageIndex - 1) / this.SoTrangTrenManHinh);
        startIdx =
          Math.floor((pageIndex - 1) / this.SoTrangTrenManHinh) *
          this.SoTrangTrenManHinh +
          1;

        //thêm page trước
        if (startIdx <= this.SoTrangTrenManHinh) {
          result +=
            '<li class="page-vuviec disabled"><span class="page-link">Trước</span></li>';
        } else {
          result += '<li class="page-vuviec">';
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
              '<li class="page-vuviec active"><a class="page-link" href=\'#\'>' +
              i +
              "</a></li>";
          } else {
            result +=
              '<li class="page-vuviec "><a page-index="' +
              i +
              '" class="page-link page-button" href=\'#\'>' +
              i +
              "</a></li>";
          }
        }
        //thêm số page sau
        if (startIdx + this.SoTrangTrenManHinh <= numOfPage) {
          result += '<li class="page-vuviec">';
          result +=
            '<a class="page-link page-button" href="#" page-index="' +
            (startIdx + this.SoTrangTrenManHinh) +
            '">Sau</a></li>';
        } else {
          result +=
            '<li class="page-vuviec disabled"><span class="page-link">Sau</span></li>';
        }
        return result;
      },
      goto_page(page_index) {
        this.current_page_index = page_index;
        this.timkiemvuviec();
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
      , linhvucvuviec_onchange() {
       
        this.toidanhs = this.toidanh_alls.filter((toidanh_item) => (toidanh_item.maToiDanh == -1 || toidanh_item.maLinhVucVuViec == this.timkiemobj.maLinhVucVuViec));
        this.timkiemobj.maToiDanh = this.toidanhs[0].maToiDanh;
      },
      exportExcel() {
        $("#tabledanhsach").table2excel({
          exclude: ".noExl",
          name: "Worksheet Name",
          filename: "trichxuat_danhsachvuviec",
          fileext: ".xls", // file extension
          preserveColors: true

        });
      },
    },
    components: {
      ModelListSelect
    },
    computed: {
      get_current_user() {
        return this.$store.getters["auth/current_user"];
      },
      is_QuanHuyen_User() {
        return this.$store.getters["auth/is_QuanHuyen_User"];
      },
      is_CAT_User() {
        return this.$store.getters["auth/is_CAT_User"];
      },
      is_PhuongXa_User() {
        return this.$store.getters["auth/is_PhuongXa_User"];
      },
      is_PhongBan_User() {
        return this.$store.getters["auth/is_PhongBan_User"];
      }
    },
  };
</script>