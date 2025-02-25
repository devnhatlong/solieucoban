<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>{{mode_title}} vụ việc</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
          <li class="breadcrumb-item">Quản lý vụ việc</li>
          <li class="breadcrumb-item active">{{mode_title}} vụ việc</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">
      <div class="card">
        <div class="card-body" :key="render_vuviec">

          <div class="mt-4 mb-2 text-center">
            <h3>
              <b style=" text-transform: capitalize;">{{mode_title}} vụ việc</b>
            </h3>

          </div>

          <div class="row mt-1">
            <div class="col-sm-3">
              <label class="col-form-label">Đơn vị thụ lý:</label>
              <div class="">
                <select class="form-select" v-model="vuviec.maDonViThuLy" :disabled="!is_CAT_User">
                  <option v-for="donvi in donvithulys" :key="donvi.maDonVi" :value="donvi.maDonVi">
                    {{ donvi.tenDonVi }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-sm-3">
              <label class=" col-form-label ">Lĩnh vực vụ việc:</label>
              <div>
                <select class="form-select" v-model="vuviec.maLinhVucVuViec" @change="linhvucvuviec_onchange">
                  <option v-for="linhvuc in linhvucvuviecs" :key="linhvuc.maLinhVucVuViec"
                    :value="linhvuc.maLinhVucVuViec">
                    {{ linhvuc.tenLinhVucVuViec }}
                  </option>
                </select>
              </div>
            </div>

            <div class="col-sm-3">
              <label class="col-form-label">Địa bàn Huyện, TX, TP:</label>
              <div class="">
                <select class="form-select" v-model="vuviec.maQuanHuyen" id="select_quanhuyen"
                  @change="quanhuyen_onchange">
                  <option v-for="quanhuyen in quanhuyens" :key="quanhuyen.maQuanHuyen" :value="quanhuyen.maQuanHuyen">
                    {{ quanhuyen.tenQuanHuyen }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-sm-3">
              <label class=" col-form-label">Địa bàn Phường, xã, thị trấn:</label>
              <div class="">
                <select class="form-select" v-model="vuviec.maPhuongXa" id="select_phuongxa">
                  <option v-for="phuongxa in phuongxas" :key="phuongxa.maPhuongXa" :value="phuongxa.maPhuongXa">
                    {{ phuongxa.tenPhuongXa }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="row mt-1">
            <div class="col-sm-3">
              <label class="col-form-label">Tội danh:</label>
              <model-list-select :list="toidanhs" v-model="vuviec.maToiDanh" option-value="maToiDanh"
                option-text="tenToiDanh" placeholder="Chọn tội danh vụ việc">
              </model-list-select>

            </div>
            <div class="col-sm-3">
              <label class=" col-form-label ">Ngày báo cáo:</label>
              <div class="">
                <MyDatePicker id="datepicker_ngaybaocao" v-model="vuviec.ngayBaoCao"></MyDatePicker>
              </div>
            </div>
            <div class="col-sm-3">
              <label class=" col-form-label ">Ngày xảy ra:</label>
              <div class="">
                <MyDatePicker id="datepicker_ngayxayra" v-model="vuviec.ngayXayRa"></MyDatePicker>
              </div>
            </div>
            <div class="col-sm-3">
              <label class="col-form-label ">Ghi chú:</label>
              <div class="">
                <input class="form-control" id="floatingTextarea" v-model="vuviec.ghiChu" />
              </div>
            </div>
          </div>
          <div class="row pt-0 mt-0">
            <label class="col-form-label ">Nội dung:</label>
            <div>
              <textarea class="form-control" id="floatingTextarea" style="height: 100px"
                v-model="vuviec.noiDung"></textarea>
            </div>
          </div>
          <div class="row mt-1">
            <div class="col-sm-4">
              <label class="col-form-label">Kết quả điều tra:</label>
              <div>
                <select class="form-select" v-model="vuviec.maKetQuaDieuTra">
                  <option v-for="ketquadieutra in ketquadieutras" :key="ketquadieutra.maKetQuaDieuTra"
                    :value="ketquadieutra.maKetQuaDieuTra">
                    {{ ketquadieutra.tenKetQuaDieuTra }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-sm-4">
              <label class=" col-form-label ">Kết quả xử lý:</label>
              <div>
                <select class="form-select" v-model="vuviec.maKetQuaXuLy">
                  <option v-for="ketquaxuly in ketquaxulys" :key="ketquaxuly.maKetQuaXuLy"
                    :value="ketquaxuly.maKetQuaXuLy">
                    {{ ketquaxuly.tenKetQuaXuLy }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-sm-4">
              <label class=" col-form-label ">Mức độ vụ viêc:</label>
              <div class="">
                <select class="form-select" v-model="vuviec.maMucDoVuViec">
                  <option v-for="mucdovuviec in mucdovuviecs" :key="mucdovuviec.maMucDoVuViec"
                    :value="mucdovuviec.maMucDoVuViec">
                    {{ mucdovuviec.tenMucDoVuViec }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <!--
            <label class=" col-2 col-form-label d-none" for="gridCheck1">
              Đã gửi bộ <input class="ms-1 form-check-input" type="checkbox" id="gridCheck1" v-model="vuviec.daGuiBo" />
            </label>
            <label class=" col-2 col-form-label d-none" for="gridCheck2">
              Đánh dấu chú ý <input class=" ms-1 form-check-input" type="checkbox" id="gridCheck2"
                v-model="vuviec.danhDau" />
            </label>
            -->
            <label class="col-3 col-form-label " for="gridCheck3">
              Cấp xã thụ lý ban đầu <input class="ms-1 form-check-input" type="checkbox" id="gridCheck3"
                v-model="vuviec.capXaThuLy" />
            </label>
            <label class="col-3 col-form-label  " for="gridCheck4">
              Án mở rộng <input class="ms-1 form-check-input " type="checkbox" id="gridCheck4"
                v-model="vuviec.anMoRong" />
            </label>
            <label class="col-3 col-form-label " for="gridCheck5">
              Băng ổ nhóm <input class="ms-1 form-check-input col-sm-8" type="checkbox" id="gridCheck5"
                v-model="vuviec.bangONhom" />
            </label>

            <label class="col-3 col-form-label " for="gridCheck6">
              QĐ phân công (Hồ sơ AD) <input class="ms-1 form-check-input col-sm-8" type="checkbox" id="gridCheck6"
                v-model="vuviec.qdPhanCongHoSoAD" />
            </label>
          </div>

          <div class="row mt-4">
            <h4 class="text-center">Chi tiết đối tượng</h4>
            <table class="table table-bordered small text-center align-middle" :key="render_doituongs_key">
              <thead class="table-dark">
                <tr>
                  <td width="2%">#</td>
                  <td width="15%">Họ tên</td>
                  <td width="10%">Ngày sinh (dd/mm/yyyy)</td>
                  <td width="10%">Tội danh</td>
                  <td width="10%">Tỉnh HKTT</td>
                  <td width="10%">Huyện HKTT</td>
                  <td width="10%">Xã HKTT</td>
                  <td width="10%">Nghề nghiệp</td>
                  <td width="3%">Nữ giới</td>
                  <td width="3%">Nghiện ma túy</td>
                  <td width="5%">Tiền án tiền sự</td>
                  <td width="3%">Khởi tố</td>
                  <td width="3%">XLHC</td>
                  <td width="10%">Tiền phạt (tr đồng)</td>
                  <td width="2%">Xóa</td>
                </tr>
              </thead>
              <tbody>
                <template :key="idx" v-for="(doituong,idx) in vuviec.doiTuongs">
                  <tr>
                    <td>{{idx+1}}</td>
                    <td><input class="form-control form-control-sm" type="text" v-model="doituong.hoTen" /></td>
                    <td>
                      <input class="form-control form-control-sm" type="text" v-model="doituong.ngaySinh" size="12" />

                    </td>
                    <td>

                      <model-list-select :list="toidanhs" v-model="doituong.maToiDanh" option-value="maToiDanh"
                        option-text="tenToiDanh" placeholder="Chọn tội danh đối tượng">
                      </model-list-select>

                    </td>
                    <td>
                      <model-list-select :list="tinhthanhs" option-value="maTinhThanh" v-model="doituong.maTinhHKTT"
                        option-text="tenTinhThanh" placeholder="tỉnh HKTT">
                      </model-list-select>


                    </td>
                    <td>
                      <model-list-select :list="quanhuyenhktts" v-model="doituong.maHuyenHKTT"
                        option-value="maQuanHuyen" option-text="tenQuanHuyen" :select="quanhuyenhktt_onchange(idx)"
                        placeholder="huyện HKTT" v-show="doituong.maTinhHKTT==11">
                      </model-list-select>
                    </td>
                    <td>


                      <model-list-select :list="phuongxahktt_arraylist[idx]" v-model="doituong.maXaHKTT"
                      option-value="maPhuongXa" option-text="tenPhuongXa" placeholder="xã HKTT"
                      v-show="doituong.maTinhHKTT==11">
                    </model-list-select>
                    

                    </td>
                    <td>
                      <model-list-select :list="nghenghiepdoituongs" v-model="doituong.maNgheNghiepDoiTuong"
                        option-value="maNgheNghiepDoiTuong" option-text="tenNgheNghiepDoiTuong"
                        placeholder="Nghề nghiệp">
                      </model-list-select>
                    </td>
                    <td><input class="form-check-input" type="checkbox" v-model="doituong.nuGioi" /></td>
                    <td><input class="form-check-input" type="checkbox" v-model="doituong.nghienMaTuy" /></td>
                    <td><input class="form-check-input" type="checkbox" v-model="doituong.tienAnTienSu" /></td>
                    <td><input class="form-check-input" type="checkbox" v-model="doituong.khoiTo" /></td>
                    <td><input class="form-check-input" type="checkbox" v-model="doituong.xlhc" /></td>
                    <td><input class="form-control form-control-sm text-end" v-model="doituong.tienPhat" /></td>
                    <td>
                      <a href="#" @click.prevent="xoadoituong_onclick(idx)" class="btn btn-sm text-danger"
                        title="Xóa"><i class="bi bi-trash"></i></a>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <div>
              <button class="btn btn-sm btn-success" @click="themdoituong_onclick"><i class="bi bi-plus"></i>Thêm đối
                tượng</button>
            </div>
          </div>
          <div class="row mt-4">
            <h4 class="text-center">Phụ lục chung</h4>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <td>Số người chết</td>
                  <td>Số người bị thương</td>
                  <td>Số trẻ em bị xâm hại</td>
                  <td>Tài sản thiệt hại (tr đồng)</td>
                  <td>Tài sản thu hồi (tr đồng)</td>
                  <td>Súng (thu hồi)</td>
                  <td>Thuốc nổ (kg) thu hồi</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input class="text-end form-control" v-model="vuviec.phuLucVuViec.soNguoiChet" /></td>
                  <td><input class="text-end form-control" v-model="vuviec.phuLucVuViec.soNguoiBiThuong" /></td>
                  <td><input class="text-end form-control" v-model="vuviec.phuLucVuViec.soTreEmGaiBiXamHai" /></td>
                  <td><input class="text-end form-control" v-model="vuviec.phuLucVuViec.taiSanThietHai" /></td>
                  <td><input class="text-end form-control" v-model="vuviec.phuLucVuViec.taiSanThuHoi" /></td>
                  <td><input class="text-end form-control" v-model="vuviec.phuLucVuViec.sung" /></td>
                  <td><input class="text-end form-control" v-model="vuviec.phuLucVuViec.thuocNo" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Phụ lục ma túy -->
          <div class="row mt-4" v-show="vuviec.maLinhVucVuViec=='3'">
            <h4 class="text-center">Phụ lục ma túy</h4>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <td>Heroin (g)</td>
                  <td>Thuốc phiện (g)</td>
                  <td>Cần sa (g)</td>
                  <td>Cây có chứa chất ma túy (g)</td>
                  <td>Ma túy tổng hợp (g)</td>
                  <td>Ma túy tổng hợp (viên)</td>
                  <td>Loại ma túy khác (g)</td>
                  <td>Loại ma túy khác (ml)</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input class="text-end form-control" v-model="vuviec.phuLucVuViec.heroin" /></td>
                  <td><input class="text-end form-control" v-model="vuviec.phuLucVuViec.thuocPhien" /></td>
                  <td><input class="text-end form-control" v-model="vuviec.phuLucVuViec.canSa" /></td>
                  <td><input class="text-end form-control" v-model="vuviec.phuLucVuViec.cayCoChuaChatMaTuy" /></td>
                  <td><input class="text-end form-control" v-model="vuviec.phuLucVuViec.maTuyTongHopGram" /></td>
                  <td><input class="text-end form-control" v-model="vuviec.phuLucVuViec.maTuyTongHopVien" /></td>
                  <td><input class="text-end form-control" v-model="vuviec.phuLucVuViec.loaiMaTuyKhacGram" /></td>
                  <td><input class="text-end form-control" v-model="vuviec.phuLucVuViec.loaiMaTuyKhacMl" /></td>

                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-center mt-3">
            <button type="button" class="btn btn-primary" @click="luuvuviec">Lưu vụ việc</button>

            <button type="button" class="ms-2 btn btn-secondary" @click="danhsachvuviec_onclick">Danh sách vụ
              việc</button>
          </div>
        </div>
      </div>
    </section>
    <div class="modal fade" id="Modalchitietdoituong" tabindex="-1" style="--bs-modal-width: 1000px">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Sửa đối tượng</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row mb-3">
                <label for="inputText" class=" col-form-label">Nội dung vụ việc</label>
                <div class="0">
                  <input type="text" class="form-control" readonly value="Read-only input" />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-8">
                  <label for="inputEmail" class="col-form-label">Họ tên</label>
                  <input type="text" class="form-control" />
                </div>
                <div class="col-sm-4">
                  <label for="inputEmail" class=" col-form-label">Năm sinh</label>

                  <input type="number" class="form-control" />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-8">
                  <label for="inputEmail" class="col-form-label">Tội danh</label>
                  <select class="form-select" aria-label="Default select example">
                    <option selected>Ngày báo cáo</option>
                    <option value="1">Ngày xảy ra</option>
                  </select>
                </div>
                <div class="col-sm-4">
                  <label for="inputEmail" class="col-form-label">Nghề nghiệp</label>
                  <select class="form-select" aria-label="Default select example">
                    <option selected>Không có nghề nghiệp</option>
                    <option value="1">Lao động tự do</option>
                    <option value="2">Nghề khác</option>
                    <option value="3">Công nhân</option>
                    <option value="4">Học sinh, sinh viên</option>
                    <option value="5">
                      Công chức, viên chức
                    </option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-8">
                  <label for="inputEmail" class="col-form-label">Tỉnh, thành (HKTT):</label>
                  <select class="form-select" aria-label="Default select example">
                    <option selected></option>
                    <option value="1">Bình Thuận</option>
                  </select>
                </div>
                <div class="col-sm-4">
                  <label for="inputEmail" class="col-form-label">Huyện, TX, TP:
                  </label>
                  <select class="form-select" aria-label="Default select example">
                    <option selected></option>
                    <option value="1">Bình Thuận</option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-4">
                  <label class="form-check-label" for="gridCheck6">
                    Nữ giới:
                  </label>
                  <input class="form-check-input ms-3" type="checkbox" id="gridCheck6" />
                </div>
                <div class="col-sm-4">
                  <label class="form-check-label" for="gridCheck7">
                    Nghiện ma túy:
                  </label>
                  <input class="form-check-input ms-3" type="checkbox" id="gridCheck7" />
                </div>
                <div class="col-sm-4">
                  <label class="form-check-label" for="gridCheck8">
                    Xử lý hành chính:
                  </label>
                  <input class="form-check-input ms-3" type="checkbox" id="gridCheck8" />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-4">
                  <label class="form-check-label" for="gridCheck9">
                    Khởi tố:
                  </label>
                  <input class="form-check-input ms-3" type="checkbox" id="gridCheck9" />
                </div>
                <div class="col-sm-4">
                  <label class="form-check-label" for="gridCheck10">
                    Tiền án, tiền sự:
                  </label>
                  <input class="form-check-input ms-3" type="checkbox" id="gridCheck10" />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Đóng
            </button>
            <button type="button" class="btn btn-primary">
              Lưu
            </button>
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
        linhvucvuviecs: [],
        toidanhs: [],
        quanhuyens: [],
        phuongxas:[],
        quanhuyenhktts: [],
        phuongxahktt_arraylist: [],

        donvis: [],
        ketquadieutras: [],
        ketquaxulys: [],
        mucdovuviecs: [],
        donvithulys: [],
        nghenghiepdoituongs: [],
        vuviec: {
          maVuViec: '',
          maDonViThuLy: '',
          maLinhVucVuViec: '',
          maToiDanh: '',
          maQuanHuyen: '',
          maPhuongXa: 0,
          ngayBaoCao: moment().format(DEFAULT_DATE_FORMAT),
          ngayXayRa: moment().format(DEFAULT_DATE_FORMAT),
          noiDung: '',
          maKetQuaDieuTra: '',
          maKetQuaXuLy: '',
          maMucDoVuViec: '',
          ghiChu: '',
          daGuiBo: true,
          danhDau: false,
          capXaThuLy: false,
          anMoRong: false,
          bangONhom: false,
          doiTuongs: [],
          phuLucVuViec: {
            soNguoiChet: 0,
            soNguoiBiThuong: 0,
            soTreEmGaiBiXamHai: 0,
            taiSanThietHai: 0,
            taiSanThuHoi: 0,
            sung: 0,
            thuocNo: 0,
          },
        },
        render_vuviec: 0,
        render_doituongs_key: 0,
        form_mode: 1,
        mode_title: '',
        toidanh_alls: [],
        phuongxa_alls: [],
      };
    },
    created() {
      this.form_mode = this.$route.meta.form_mode;
      if (this.form_mode == FORM_MODE_NEW) {
        this.mode_title = 'Thêm';
      }
      else if (this.form_mode == FORM_MODE_EDIT) {

        this.mode_title = 'Sửa';
      }
      let mavuviec = 0;
      if (this.$route.params.mavuviec) {
        mavuviec = this.$route.params.mavuviec;

      }
      this.load_data(mavuviec);
    },
    methods: {
      load_data(mavuviec) {
        let current_date_string = moment().format(DEFAULT_DATE_FORMAT);

        let loader = this.$loading.show(this.LOADING_PARAM);
        VuViecService.laydulieuformvuviec(mavuviec).then(
          (res) => {
            loader.hide();
            if (res.success) {

              let list_danhmuc = res.data.danhmuc;

              this.donvithulys = list_danhmuc.donvithulys;

              //  this.linhvucvuviecs = list_danhmuc.linhvucs;

              if (this.is_CAT_User || this.is_QuanHuyen_User || this.is_PhuongXa_User) {
                this.linhvucvuviecs = list_danhmuc.linhvucs;
              }
              else if (this.is_PhongBan_User && this.get_current_user.phanQuyenLinhVucVuViecs?.length > 0) {
                for (let i = 0; i < this.get_current_user.phanQuyenLinhVucVuViecs.length; i++) {
                  this.linhvucvuviecs.push(this.get_current_user.phanQuyenLinhVucVuViecs[i].linhVucVuViec);
                }
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


              this.toidanh_alls = list_danhmuc.toidanhs;


              this.tinhthanhs = list_danhmuc.tinhthanhs;
              this.quanhuyens = list_danhmuc.quanhuyens;
              this.phuongxa_alls = list_danhmuc.phuongxas;
              this.quanhuyenhktts = JSON.parse(JSON.stringify(this.quanhuyens));

              this.quanhuyenhktts.forEach(element => {
                element.phuongxas = this.phuongxa_alls.filter((phuongxa_item) => phuongxa_item.maQuanHuyen == element.maQuanHuyen);
              });

              this.ketquadieutras = list_danhmuc.ketquadieutras;
              this.ketquaxulys = list_danhmuc.ketquaxulys;
              this.mucdovuviecs = list_danhmuc.mucdovuviecs;
              this.nghenghiepdoituongs = list_danhmuc.nghenghiepdoituongs;


              if (this.get_current_user.donVi.capDo == "3") {
                $("#select_phuongxa").prop('disabled', true);
                $("#select_quanhuyen").prop('disabled', true);
              }
              if (this.get_current_user.donVi.capDo == 2 && this.get_current_user.donVi.quanHuyen) {
                this.phuongxas = this.phuongxas.filter((phuongxa_item) => phuongxa_item.maQuanHuyen == this.get_current_user.donVi.quanHuyen.maQuanHuyen);
                $("#select_quanhuyen").prop('disabled', true);
              }
              if (this.form_mode == FORM_MODE_NEW) {
                this.vuviec.maDonViThuLy = this.get_current_user.donVi.maDonVi;
                this.vuviec.maLinhVucVuViec = this.linhvucvuviecs[0].maLinhVucVuViec;
              
                if (this.get_current_user.donVi.capDo == 3) {                 
                  this.vuviec.maPhuongXa = this.get_current_user.donVi.phuongXa.maPhuongXa;                 
                  this.vuviec.maQuanHuyen = this.get_current_user.donVi.phuongXa.quanHuyen.maQuanHuyen;
                }
                else if (this.get_current_user.donVi.capDo == 2 && this.get_current_user.donVi.quanHuyen) {
                  this.vuviec.maQuanHuyen = this.get_current_user.donVi.quanHuyen.maQuanHuyen;
                  this.vuviec.maPhuongXa = this.phuongxas[0]?.maPhuongXa;
                }
                else {
                  this.vuviec.maQuanHuyen = this.quanhuyens[0]?.maQuanHuyen;
                }
              
               
                
                this.vuviec.maKetQuaDieuTra = this.ketquadieutras[0].maKetQuaDieuTra;
                this.vuviec.maKetQuaXuLy = this.ketquaxulys[0].maKetQuaXuLy;
                this.vuviec.maMucDoVuViec = this.mucdovuviecs[0].maMucDoVuViec;
                this.linhvucvuviec_onchange();
                this.quanhuyen_onchange();
                console.log( this.vuviec.maPhuongXa);
              }
              else {
                this.vuviec = res.data.vuviec;
                let maToiDanh_prev = parseInt(this.vuviec.maToiDanh);
                let maPhuongXa_prev = this.vuviec.maPhuongXa;
                this.linhvucvuviec_onchange();
                this.quanhuyen_onchange();
                let i = 0;
                this.vuviec.doiTuongs.forEach(doituongobj => {

                  doituongobj.maToiDanh = parseInt(doituongobj.maToiDanh);
                  doituongobj.maTinhHKTT = parseInt(doituongobj.maTinhHKTT);
                  doituongobj.maHuyenHKTT = parseInt(doituongobj.maHuyenHKTT);
                  this.phuongxahktt_arraylist.push([]);
                 
                  this.quanhuyenhktt_onchange(i);
                  doituongobj.maXaHKTT = parseInt(doituongobj.maXaHKTT);
                  doituongobj.maNgheNghiepDoiTuong = parseInt(doituongobj.maNgheNghiepDoiTuong);
                  i++;
                });
                this.vuviec.maToiDanh = maToiDanh_prev;
                if (maPhuongXa_prev.length > 0) {
                  this.vuviec.maPhuongXa = maPhuongXa_prev;
                }
                //this.forceRerenderVuViec();             
              }
              
            }
          },
          (error) => {
            loader.hide();
          }
        );
      },
      forceRerenderVuViec() {
        this.render_vuviec++;
      },
      forceRerender(index) {
        if (index == -1) {
          this.render_doituongs_key++;
        }
      },
      danhsachvuviec_onclick() {
        this.$router.push('/vuviec/danhsachvuviec');
      },
      xoadoituong_onclick(index) {
        this.vuviec.doiTuongs.splice(index, 1);
        this.forceRerender();
      },
      themdoituong_onclick() {
        let doituong_new_default = {
          maDoiTuong: "0",
          hoTen: "",
          ngaySinh: "01/01/1990",
          maToiDanh: this.vuviec.maToiDanh,
          maTinhHKTT: 11,
          maHuyenHKTT: this.quanhuyenhktts[0].maQuanHuyen,
          maNgheNghiepDoiTuong: this.nghenghiepdoituongs[0].maNgheNghiepDoiTuong,
          phuongxas: this.quanhuyenhktts[0].phuongxas,
          nuGioi: false,
          nghienMaTuy: false,
          tienAnTienSu: false,
          khoiTo: false,
          xLHC: false,
          tienPhat: 0,

        }

        this.vuviec.doiTuongs.push(doituong_new_default);
        this.forceRerender();
      },
      luuvuviec() {
        let is_validated_vuiec = true;
        let string_validated = "";
        if (this.vuviec.noiDung.length == 0) {
          is_validated_vuiec = false;
          string_validated += "Nội dung vụ việc không được để trống.<br>";
        }
        this.vuviec.tenDonViThuLy = this.donvithulys.find((element) => element.maDonVi == this.vuviec.maDonViThuLy)?.tenDonVi;

        this.vuviec.tenToiDanh = this.toidanhs.find((element) => element.maToiDanh == this.vuviec.maToiDanh)?.tenToiDanh;
        this.vuviec.tenQuanHuyen = this.quanhuyens.find((element) => element.maQuanHuyen == this.vuviec.maQuanHuyen)?.tenQuanHuyen;
        this.vuviec.tenPhuongXa = this.phuongxas.find((element) => element.maPhuongXa == this.vuviec.maPhuongXa)?.tenPhuongXa;
        this.vuviec.tenKetQuaDieuTra = this.ketquadieutras.find((element) => element.maKetQuaDieuTra == this.vuviec.maKetQuaDieuTra)?.tenKetQuaDieuTra;
        this.vuviec.tenKetQuaXuLy = this.ketquaxulys.find((element) => element.maKetQuaXuLy == this.vuviec.maKetQuaXuLy)?.tenKetQuaXuLy;
        this.vuviec.tenMucDoVuViec = this.mucdovuviecs.find((element) => element.maMucDoVuViec == this.vuviec.maMucDoVuViec)?.tenMucDoVuViec;
        var pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        this.vuviec.doiTuongs.forEach(doituongObj => {
          if (doituongObj.hoTen.length == 0) {
            is_validated_vuiec = false;
            string_validated += "Tên đối tượng không được để trống.<br>";
          }
          if (doituongObj.ngaySinh == null || doituongObj.ngaySinh == "" || !pattern.test(doituongObj.ngaySinh)) {
            is_validated_vuiec = false;
            string_validated += "Ngày sinh sai cú pháp dd/mm/yyyy.<br>";
          }

          var birthday = moment(doituongObj.ngaySinh, DEFAULT_DATE_FORMAT);
          if (!birthday.isValid()) {
            is_validated_vuiec = false;
            string_validated += "Ngày sinh " + doituongObj.ngaySinh + " không đúng.<br>";
          }
          if (doituongObj.xlhc == true && doituongObj.tienPhat <= 0) {
            is_validated_vuiec = false;
            string_validated += "Đối tượng có XLHC, Tiền phạt phải lớn hơn 0.<br>";
          }
          doituongObj.tenToiDanh = this.toidanhs.find((element) => element.maToiDanh == doituongObj.maToiDanh)?.tenToiDanh;
          doituongObj.tenTinhHKTT = this.tinhthanhs.find((element) => element.maTinhThanh == doituongObj.maTinhHKTT)?.tenTinhThanh;
          doituongObj.tenHuyenHKTT = this.quanhuyenhktts.find((element) => element.MaQuanHuyen == doituongObj.maHuyenHKTT)?.tenQuanHuyen;
          doituongObj.tenXaHKTT = this.phuongxas.find((element) => element.maPhuongXa == doituongObj.maXaHKTT)?.tenPhuongXa;
          doituongObj.tenNgheNghiepDoiTuong = this.nghenghiepdoituongs.find((element) => element.maNgheNghiepDoiTuong == doituongObj.maNgheNghiepDoiTuong).tenNgheNghiepDoiTuong;
        });
        if (is_validated_vuiec == false) {
          this.$swal.fire({ title: "Thông báo!", html: string_validated, icon: "warning" });
          return;
        }
        let loader = this.$loading.show(this.LOADING_PARAM);

        VuViecService.luuvuviec(this.vuviec).then(
          (res) => {
            loader.hide();
            if (res && res.success) {
              this.$swal.fire({
                title: "Thông báo!",
                html: "Lưu vụ việc thành công!<br>Bạn có muốn xem chi tiết vụ việc không?",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Không",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.$router.push('/vuviec/chitietvuviec/' + res.data);
                }
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
      luudoituong(maDoiTuong) {
        if (this.vuviec.maVuViec == 0 || this.vuviec.maVuViec == "0") {
          this.$swal.fire({ title: "Thông báo!", text: 'Chưa lưu vụ việc', icon: "warning" });
          return;
        }
        //get value
        let doituongObj;
        if (maDoiTuong == 0 || maDoiTuong == "0") {
          doituongObj = {
            maDoiTuong: "0",
            maVuViec: this.vuviec.maVuViec + "",
            hoTen: $('#input_new_hoten').val(),
            namSinh: $('#input_new_namsinh').val()
          }
        }
        else {
          for (let i = 0; i < this.doituongs.length; i++) {
            if (this.doituongs[i].maDoiTuong == maDoiTuong) {
              doituongObj = this.doituongs[i];
            }
          }
        }
        //console.log( this.doituongs);
        let loader = this.$loading.show(this.LOADING_PARAM);
        VuViecService.luudoituong(doituong).then(
          (res) => {
            if (res.success) {
              doituongObj.maDoiTuong = res.data;
              for (let i = 0; i < this.doituongs.length; i++) {
                if (this.doituongs[i].maDoiTuong == maDoiTuong) {
                  // this.forceRerender(i);
                  if (maDoiTuong == 0 || maDoiTuong == "0") {
                    this.doituongs.push(doituongObj);
                  }
                }
              }
            }
            else {
              this.$swal.fire({ title: "Thông báo!", text: res.message, icon: "error" });
            }
            loader.hide();
          },
          (error) => {
            loader.hide();
          });
      },
      linhvucvuviec_onchange() {
        this.toidanhs = this.toidanh_alls.filter((toidanh_item) => toidanh_item.maLinhVucVuViec == this.vuviec.maLinhVucVuViec);
        if (this.toidanhs.length > 0) {
          this.vuviec.maToiDanh = this.toidanhs[0].maToiDanh;
        }
        else {
          this.vuviec.maToiDanh = '';
        }

      },
      quanhuyen_onchange() {
        this.phuongxas = this.phuongxa_alls.filter((phuongxa_item) => phuongxa_item.maQuanHuyen == this.vuviec.maQuanHuyen);
        console.log(this.vuviec.maPhuongXa);
         if(this.vuviec.maPhuongXa>0){
          return;
        }
        if (this.phuongxas.length > 0 ) {

          this.vuviec.maPhuongXa = this.phuongxas[0].maPhuongXa;
         
        }
        else {
          this.vuviec.maPhuongXa = '';
        }
      },
      quanhuyenhktt_onchange(idx) {     
       
        this.quanhuyenhktts.forEach(element => {
          if (element.maQuanHuyen == this.vuviec.doiTuongs[idx].maHuyenHKTT) {
            this.phuongxahktt_arraylist[idx] = element.phuongxas;
            return;
          }
        });
      },
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
    }, components: {
      ModelListSelect
    }

  }
</script>