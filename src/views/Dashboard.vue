<template>
  <main id="main" class="main">

    <div class="pagetitle">
      <h1>Bảng điều khiển</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
          <li class="breadcrumb-item active">Bảng điều khiển</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">


      <!-- Dashboard old -->
      <div class="d-none">
        <div class="row" v-show="is_PhanQuyenVuViecTTXH">

          <!-- Sales Card -->
          <div class="col-xxl-2 col-md-3">
            <div class="card info-card sales-card">
              <div class="card-body">
                <h5 class="card-title">Danh sách vụ việc</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="bi bi-layout-text-sidebar-reverse"></i>
                  </div>
                  <div class="ps-3">
                    <h6><a class="btn btn-sm btn-outline-primary" href="/vuviec/danhsachvuviec">Chọn</a></h6>
                  </div>
                </div>
              </div>

            </div>
          </div><!-- End Sales Card -->
          <div class="col-xxl-2 col-md-3 d-none">
            <div class="card info-card revenue-card">
              <div class="card-body">
                <h5 class="card-title">Thêm vụ việc</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="bi bi-journal-plus"></i>
                  </div>
                  <div class="ps-3">
                    <h6><a class="btn btn-sm btn-outline-primary" href="/vuviec/themvuviec">Chọn</a></h6>
                  </div>
                </div>
              </div>

            </div>
          </div><!-- End Sales Card -->
          <div class="col-xxl-2 col-md-3">
            <div class="card info-card customers-card">
              <div class="card-body">
                <h5 class="card-title">Thống kê</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="bi bi-kanban-fill"></i>
                  </div>
                  <div class="ps-3">
                    <h6><a class="btn btn-sm btn-outline-primary" href="/vuviec/thongke">Chọn</a></h6>
                  </div>
                </div>
              </div>

            </div>
          </div><!-- End Sales Card -->
          <div class="col-xxl-2 col-md-3">
            <div class="card info-card chart-card">
              <div class="card-body">
                <h5 class="card-title">Tra cứu đối tượng</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="bi bi-search"></i>
                  </div>
                  <div class="ps-3">
                    <h6><a class="btn btn-sm btn-outline-primary" href="/doituong/tracuu">Chọn</a></h6>
                  </div>
                </div>
              </div>

            </div>
          </div><!-- End Sales Card -->
        </div>
        <div class="row" v-show="is_PhanQuyenGiaoThong">
          <div class="col-xxl-2 col-md-3">
            <div class="card info-card sales-card">
              <div class="card-body">
                <h5 class="card-title">Danh sách TNGT</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ri ri-bus-2-line"></i>
                  </div>
                  <div class="ps-3">
                    <h6><a class="btn btn-sm btn-outline-primary" href="/giaothong/danhsachtngt">Chọn</a></h6>
                  </div>
                </div>
              </div>

            </div>
          </div><!-- End Sales Card -->
          <div class="col-xxl-2 col-md-3 d-none">
            <div class="card info-card revenue-card">
              <div class="card-body">
                <h5 class="card-title">Thêm TNGT</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ri ri-inbox-archive-line"></i>
                  </div>
                  <div class="ps-3">
                    <h6><a class="btn btn-sm btn-outline-primary" href="/giaothong/themtngt">Chọn</a></h6>
                  </div>
                </div>
              </div>

            </div>
          </div><!-- End Sales Card -->
          <div class="col-xxl-2 col-md-3">
            <div class="card info-card revenue-card">
              <div class="card-body">
                <h5 class="card-title">Biểu mẫu số liệu</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ri ri-inbox-archive-line"></i>
                  </div>
                  <div class="ps-3">
                    <h6><a class="btn btn-sm btn-outline-primary" href="/giaothong/danhsachbieumausolieu">Chọn</a>
                    </h6>
                  </div>
                </div>
              </div>

            </div>
          </div><!-- End Sales Card -->
        </div>
        <div class="row" v-show="is_PhanQuyenPCCC">
          <div class="col-xxl-2 col-md-3">
            <div class="card info-card sales-card">
              <div class="card-body">
                <h5 class="card-title">Danh sách vụ cháy/nổ</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ri ri-bus-2-line"></i>
                  </div>
                  <div class="ps-3">
                    <h6><a class="btn btn-sm btn-outline-primary" href="/pccc/danhsachvuchayno">Chọn</a></h6>
                  </div>
                </div>
              </div>

            </div>
          </div><!-- End Sales Card -->
          <div class="col-xxl-2 col-md-3 d-none">
            <div class="card info-card revenue-card">
              <div class="card-body">
                <h5 class="card-title">Thêm vụ cháy/nổ</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ri ri-inbox-archive-line"></i>
                  </div>
                  <div class="ps-3">
                    <h6><a class="btn btn-sm btn-outline-primary" href="/pccc/themvuchayno">Chọn</a></h6>
                  </div>
                </div>
              </div>

            </div>
          </div><!-- End Sales Card -->
          <div class="col-xxl-2 col-md-3">
            <div class="card info-card revenue-card">
              <div class="card-body">
                <h5 class="card-title">Biểu mẫu số liệu</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ri ri-inbox-archive-line"></i>
                  </div>
                  <div class="ps-3">
                    <h6><a class="btn btn-sm btn-outline-primary" href="/pccc/danhsachbieumausolieu">Chọn</a>
                    </h6>
                  </div>
                </div>
              </div>

            </div>
          </div><!-- End Sales Card -->
        </div>
        <div class="row">
          <div class="col-xxl-2 col-md-3">
            <div class="card info-card sales-card">
              <div class="card-body">
                <h5 class="card-title">Gửi báo cáo</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ri ri-upload-cloud-line"></i>
                  </div>
                  <div class="ps-3">
                    <h6><a class="btn btn-sm btn-outline-primary" href="/baocao/guibaocao">Chọn</a></h6>
                  </div>
                </div>
              </div>

            </div>
          </div><!-- End Sales Card -->
          <div class="col-xxl-2 col-md-3" v-show="is_PhanQuyenTongHopBaoCao">
            <div class="card info-card revenue-card">
              <div class="card-body">
                <h5 class="card-title">Tổng hợp báo cáo</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ri ri-inbox-archive-line"></i>
                  </div>
                  <div class="ps-3">
                    <h6><a class="btn btn-sm btn-outline-primary" href="/baocao/tonghopbaocao">Chọn</a></h6>
                  </div>
                </div>
              </div>

            </div>
          </div><!-- End Sales Card -->
        </div>
      </div>
      <!-- Dashboard đơn vị, địa phương -->
      <div class="card">

        <div class="card-body">

          <ul class="nav nav-tabs pt-4" id="myTab" role="tablist" :key="render_key">

            <li :key="idx" v-for="(loaikybaocao,idx) in loaikybaocaos" class="nav-item" role="presentation">

              <button :class="(idx==0)?'nav-link active':'nav-link'" :id="'loaikybaocao-tab'+idx" data-bs-toggle="tab"
                :data-bs-target="'#loaikybaocao'+idx" type="button" role="tab" :aria-controls="'loaikybaocao'+idx"
                aria-selected="true"
                @click="loaikybaocao_onchange(loaikybaocao.maLoaiKyBaoCao)">{{loaikybaocao.tenLoaiKyBaoCao}}</button>
            </li>

          </ul>
          <div class="tab-content pb-2" id="myTabContent">
            <div class="tab-pane fade active show" id="baocaongay" role="tabpanel" aria-labelledby="baocaongay-tab">
              <h5 class="card-title text-center text-muted">Báo cáo {{kybaocao_select?.tenKyBaoCao}}
                <br>
                <span v-show="!is_BaoCaoNgay">(từ ngày {{kybaocao_select.ngayBatDau}} đến
                  {{kybaocao_select.ngayKetThuc}})</span>
              </h5>
              <table class="table table-sm table-striped text-center table-bordered align-middle">
                <thead>
                  <tr>
                    <th scope="col" width="3%">STT</th>
                    <th scope="col" width="15%">Đơn vị</th>
                    <th scope="col" width="15%">Địa bàn</th>
                    <th scope="col" width="40%" class="text-start">File báo cáo</th>
                    <th scope="col" width="10%" v-show="is_BaoCaoNgay">Thêm mới vụ việc</th>
                    <th scope="col" width="10%" v-show="is_BaoCaoNgay">Phê duyệt vụ viêc</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="index" v-for="(baocaodinhky,index) in baocaodinhkys">
                    <td class="text-center">{{index+1}}</td>
                    <td>{{baocaodinhky.tenDonVi}}</td>
                    <td>{{baocaodinhky.donViVM?.phuongXa?.quanHuyen?.tenQuanHuyen}}</td>
                    <td class="text-start">
                      <div v-show="baocaodinhky.files?.length>0">

                        <div :key="idx" v-for="(fileinfo,idx) in baocaodinhky.files">
                          <template v-if="get_current_user?.donVi?.maDonVi == baocaodinhky.maDonVi || is_CAT_User">
                           <!--  <a :href="fileinfo.path" target='_blank'>{{idx+1}}.{{fileinfo.name}}</a>-->
                            <button class="btn btn-link p-0 m-0" @click="download(fileinfo.path)" :style="fileinfo.isdownloaded=='1'?'color:gray':'color:blue'">{{idx+1}}.{{fileinfo.name}}</button>
                                          
                          </template>
                          <template v-else>
                            {{idx+1}}.{{fileinfo.name}}
                          </template>


                          <span class="text-muted small ms-2">{{convertToClientTime(baocaodinhky.thoiGianGui)}}</span>
                        </div>
                      </div>
                      <div class="text-start my-auto" v-show="get_current_user?.donVi?.maDonVi == baocaodinhky.maDonVi">
                        <button class="btn btn-success btn-sm" @click="guibaocao_onclick"
                          v-show="(!is_BaoCaoNgay || !is_not_baocaongay(baocaodinhky.maDonVi))"><i
                            class="bi bi-plus-circle"></i>
                          Gửi báo cáo</button>
                      </div>

                    </td>
                    <td class="text-start" v-show="is_BaoCaoNgay">
                      <div v-show="get_current_user?.donVi?.maDonVi == baocaodinhky.maDonVi && is_PhanQuyenVuViecTTXH">
                        <a class="btn btn-primary btn-sm  mt-1" href="/vuviec/themvuviec"><i
                            class="bi bi-plus-circle"></i> Thêm vụ việc TTXH </a>

                      </div>
                      <div v-show="get_current_user?.donVi?.maDonVi == baocaodinhky.maDonVi && is_PhanQuyenGiaoThong">
                        <a class="btn btn-success btn-sm  mt-1" href="/giaothong/themtngt"><i
                            class="bi bi-plus-circle"></i> Thêm vụ TNGT</a>
                      </div>
                      <div v-show="get_current_user?.donVi?.maDonVi == baocaodinhky.maDonVi && is_PhanQuyenPCCC">
                        <a class="btn btn-warning btn-sm  mt-1" href="/pccc/themvuchayno"><i
                            class="bi bi-plus-circle"></i> Thêm vụ cháy nổ</a>
                      </div>

                    </td>
                    <td class="text-start" v-show="is_BaoCaoNgay">
                      <div
                        v-show="get_current_user?.donVi?.maDonVi== baocaodinhky.maDonVi && is_PhanQuyenVuViecTTXH && !is_QuanHuyen_User && !is_PhuongXa_User">
                        <a class="btn btn-primary btn-sm mt-1" href="/vuviec/danhsachvuviec">
                          <i class="bi bi-check-circle"></i> Phê duyệt vụ việc TTXH</a>
                      </div>
                      <div
                        v-show="get_current_user?.donVi?.maDonVi == baocaodinhky.maDonVi && is_PhanQuyenGiaoThong && !is_QuanHuyen_User && !is_PhuongXa_User">
                        <a class="btn btn-success btn-sm mt-1" href="/giaothong/danhsachtngt">
                          <i class="bi bi-check-circle"></i> Phê duyệt vụ TNGT</a>
                      </div>
                      <div
                        v-show="get_current_user?.donVi?.maDonVi == baocaodinhky.maDonVi && is_PhanQuyenPCCC && !is_QuanHuyen_User && !is_PhuongXa_User">
                        <a class="btn btn-warning btn-sm mt-1" href="/pccc/danhsachvuchayno">
                          <i class="bi bi-check-circle"></i> Phê duyệt vụ cháy nổ</a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


    </section>
  </main>
</template>
<script>

  import BaoCaoService from "../services/baocao.service";
  import CauHinhService from "../services/cauhinh.service";
  export default {
    data() {
      return {
        loaikybaocaos: [],
        baocaodinhkys: [],
        nambaocaos: [],
        thangbaocaos: [],
        maLoaiKyBaoCaoSelected: 0,
        namBaoCaoSelected: 2024,
        thangBaoCaoSelected: 1,
        ngaybaocao: '',
        files_prepare_upload: [],
        files_uploaded: [],
        baocaodinhky_current: {},
        baocaodinhky_select: {},
        kybaocao_select: {},
        kybaocaos: [],
        linhvucchuyendebaocaos: [],
        maLinhVucChuyenDeBaoCaoSelected: 0,
        isDashboard: true,
        render_key: 0,

      }
    },
    created() {
      this.ngaybaocao = moment().format(DEFAULT_DATE_FORMAT);
      this.laydulieubandau();
    },
    methods: {
      download(path) {
        let loader = this.$loading.show(this.LOADING_PARAM);
        BaoCaoService.download(path).then(
          (res) => {
            loader.hide();
            this.tonghopbaocao();
            window.open(process.env.VUE_APP_ROOT_API + "baocao/" + path, '_target');
          },
          (error) => {
            loader.hide();
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            this.$swal.fire(message, '', 'error');
          }
        );
      },
      laydulieubandau() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        BaoCaoService.laydulieubandau().then(
          (res) => {
            loader.hide();
            try {
              this.loaikybaocaos = res.data.loaiKyBaoCaos;
              this.linhvucchuyendebaocaos = res.data.linhVucChuyenDeBaoCaos;
              if (this.linhvucchuyendebaocaos.length > 0) {
                this.maLinhVucChuyenDeBaoCaoSelected = this.linhvucchuyendebaocaos[0].maLinhVucChuyenDeBaoCao;
              }
              if (this.loaikybaocaos.length > 0) {
                this.maLoaiKyBaoCaoSelected = this.loaikybaocaos[0].maLoaiKyBaoCao;
              }
              let namBaoCaoHienTai = res.data.namHienTai;
              this.ngaybaocao = res.data.ngayHienTai;
              this.nambaocaos = [namBaoCaoHienTai - 1, namBaoCaoHienTai, namBaoCaoHienTai + 1, namBaoCaoHienTai + 2]
              for (let imonth = 1; imonth <= 12; imonth++) {
                this.thangbaocaos.push(imonth);
              }
              let currentdate = moment(this.ngaybaocao, DEFAULT_DATE_FORMAT);
              this.namBaoCaoSelected = currentdate.year();
              this.thangBaoCaoSelected = currentdate.month() + 1;
              this.laydanhsachkybaocao(this.namBaoCaoSelected);
            }
            catch {
            }
          },
          (error) => {
            loader.hide();
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);

          }

        )
      },
      laydanhsachkybaocao(nambaocao_param) {

        let loader = this.$loading.show(this.LOADING_PARAM);
        BaoCaoService.laydanhsachkybaocao(this.maLoaiKyBaoCaoSelected, nambaocao_param, this.thangBaoCaoSelected).then(
          (res) => {
            if (res.success) {
              this.kybaocaos = res.data;
              this.kybaocao_select = {};
              let ngayhientai_moment = moment(this.ngaybaocao, DEFAULT_DATE_FORMAT);
              this.kybaocaos.forEach(kybaocao_item => {
                let ngaybatdau_moment = moment(kybaocao_item.ngayBatDau, DEFAULT_DATE_FORMAT);
                let ngayketthuc_moment = moment(kybaocao_item.ngayKetThuc, DEFAULT_DATE_FORMAT);
                kybaocao_item.laKyBaoCaoHienTai = false;

                if (ngayhientai_moment >= ngaybatdau_moment && ngayhientai_moment <= ngayketthuc_moment) {
                  kybaocao_item.laKyBaoCaoHienTai = true;
                  this.kybaocao_select = kybaocao_item;
                }
              });
              if (this.kybaocao_select.maKyBaoCao) {
                this.laydulieudashboard();
              }
              else {

                if (nambaocao_param <= ngayhientai_moment.year() + 1) {

                  this.laydanhsachkybaocao(nambaocao_param + 1);

                }
                else {
                  this.$swal.fire("Chưa đến kỳ báo cáo", '', 'warning').then((result) => {

                    this.loaikybaocao_onchange(this.loaikybaocaos[0]?.maLoaiKyBaoCao);
                    this.render_key++;
                  })
                }
              }
            }
            else {
              console.log(res.message);
              //this.$swal.fire(res.message, '', 'error');
            }
            loader.hide();
          },
          (error) => {
            loader.hide();
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          });
      },
      tonghopbaocao() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        BaoCaoService.tonghopbaocao(this.kybaocao_select.maKyBaoCao, this.namBaoCaoSelected).then(
          (res) => {
            if (res.success) {
              this.baocaodinhkys = res.data;

              let ngayhientai_moment = moment(this.ngaybaocao, DEFAULT_DATE_FORMAT);
              this.baocaodinhkys.forEach(baocaodinhky_item => {
                let ngaybatdau_moment = moment(baocaodinhky_item.ngayBatDau, DEFAULT_DATE_FORMAT);
                let ngayketthuc_moment = moment(baocaodinhky_item.ngayKetThuc, DEFAULT_DATE_FORMAT);
                baocaodinhky_item.laKyBaoCaoHienTai = false;
                if (ngayhientai_moment >= ngaybatdau_moment && ngayhientai_moment <= ngayketthuc_moment) {
                  baocaodinhky_item.laKyBaoCaoHienTai = true;
                  this.baocaodinhky_current = baocaodinhky_item;
                }
                if (baocaodinhky_item.tepDinhKem.length > 0) {
                  let fileObjs = JSON.parse(baocaodinhky_item.tepDinhKem);
                  for (var j = 0; j < fileObjs.length; j++) {
                    fileObjs[j].path = process.env.VUE_APP_ROOT_API + "baocao/download/" + encodeURIComponent(fileObjs[j].path);
                  }
                  baocaodinhky_item.files = fileObjs;
                }
              });

              let list_download = [];
              if (this.baocaodinhky_current.tepDinhKem?.length > 0) {
                list_download = JSON.parse(this.baocaodinhky_current.tepDinhKem);
              }
              this.files_uploaded = [];
              for (let i = 0, f; f = list_download[i]; i++) {
                if (this.findIndexIfExist(this.files_uploaded, f.name) < 0) {
                  this.files_uploaded.push(f);
                }
              }
              this.load_list_file_to_form();
            }
            else {
              //this.$swal.fire(res.message, '', 'error');
              console.log(res.message);
            }
            loader.hide();
          },
          (error) => {
            loader.hide();
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

          });
      },


      laydulieudashboard() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        BaoCaoService.laydulieudashboard(this.kybaocao_select.maKyBaoCao, this.namBaoCaoSelected).then(
          (res) => {
            if (res.success) {
              this.baocaodinhkys = res.data;
              //
              console.log(this.baocaodinhkys);
              let ngayhientai_moment = moment(this.ngaybaocao, DEFAULT_DATE_FORMAT);
              this.baocaodinhkys.forEach(baocaodinhky_item => {
                let ngaybatdau_moment = moment(baocaodinhky_item.ngayBatDau, DEFAULT_DATE_FORMAT);
                let ngayketthuc_moment = moment(baocaodinhky_item.ngayKetThuc, DEFAULT_DATE_FORMAT);
                baocaodinhky_item.laKyBaoCaoHienTai = false;
                if (ngayhientai_moment >= ngaybatdau_moment && ngayhientai_moment <= ngayketthuc_moment) {
                  baocaodinhky_item.laKyBaoCaoHienTai = true;
                  this.baocaodinhky_current = baocaodinhky_item;
                }
                if (baocaodinhky_item.tepDinhKem.length > 0) {
                  let fileObjs = JSON.parse(baocaodinhky_item.tepDinhKem);
                  for (var j = 0; j < fileObjs.length; j++) {
                    fileObjs[j].path = process.env.VUE_APP_ROOT_API + "baocao/download/" + encodeURIComponent(fileObjs[j].path);
                  }
                  baocaodinhky_item.files = fileObjs;
                }
              });

              let list_download = [];
              if (this.baocaodinhky_current.tepDinhKem?.length > 0) {
                list_download = JSON.parse(this.baocaodinhky_current.tepDinhKem);
              }
              this.files_uploaded = [];
              for (let i = 0, f; f = list_download[i]; i++) {
                if (this.findIndexIfExist(this.files_uploaded, f.name) < 0) {
                  this.files_uploaded.push(f);
                }
              }

              //this.load_list_file_to_form();

            }
            else {
              console.log(res.message);
              //this.$swal.fire(res.message, '', 'error');
            }
            loader.hide();
          },
          (error) => {
            loader.hide();
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

          });
      },

      load_list_file_to_form() {
        $("#div_display_prepare_files").html('');
        $("#div_display_uploaded_files").html('');

        var output = [];
        for (var i = 0; i < this.files_uploaded.length; i++) {
          let pathfiledownload = process.env.VUE_APP_ROOT_API + "vanban/download/" + this.get_current_user.maDonVi + "/" + encodeURIComponent(this.files_uploaded[i].path);
          var iframestring = "<a href='" + pathfiledownload + "' target='_blank'>" + this.files_uploaded[i].name + "</a>";
          output.push('<div class="alert alert-primary alert-dismissible fade show w-75 border-0 p-1 m-2">', iframestring,
            '<button type="button" class="btn-close close-updated p-1" data-bs-dismiss="alert" aria-label="Close" text-value="', this.files_uploaded[i].name, '">',
            '</button>',
            '</div>');
          $("#div_display_uploaded_files").html(output.join(''));
          const vm = this;
          $('button.close-updated').click(function (evt) {
            let file_name_compare = $(this).attr("text-value");
            for (let i = 0; i < vm.files_uploaded.length; i++) {
              if (file_name_compare.localeCompare(vm.files_uploaded[i].name) == 0) {
                vm.files_uploaded.splice(i, 1);
                break;
              }
            }
          });
          $("#div_display_prepare_files").html('');
          this.files_prepare_upload = [];
        }
      },
      guibaocao_onclick() {
        this.$router.push('/baocao/guibaocao/' + this.maLoaiKyBaoCaoSelected);
      },
      themvuviec_onclick() {
        this.$router.push('/vuviec/themvuviec');
      },
      pheduyet_onclick() {
        this.$router.push('/vuviec/danhsach');
      },
      loaikybaocao_onchange(maLoaiKyBaoCao) {
        this.maLoaiKyBaoCaoSelected = maLoaiKyBaoCao;
        this.laydanhsachkybaocao(this.namBaoCaoSelected);
        /*for (let i = 0; i < this.danhsachloaivanban.length; i++) {
          if (this.danhsachloaivanban[i].maLoaiVanBan == maloaivanban) {
            this.loaivanban_selected = this.danhsachloaivanban[i];
            if (this.danhsachloaivanban[i].cauHinhTruongThongTin.length > 0) {
              this.cauhinhtruongthongtin = JSON.parse(this.danhsachloaivanban[i].cauHinhTruongThongTin);
            }
            let timkiemTempObject = JSON.parse(JSON.stringify(this.timkiemobj));
            this.timkiemobj = {};
            this.timkiemobj.soVanBan = timkiemTempObject.soVanBan;
            this.timkiemobj.trichYeu = timkiemTempObject.trichYeu;
            this.timkiemobj.donViBanHanh = timkiemTempObject.donViBanHanh;
            this.timkiem();
          }
        }*/
      },

      is_not_baocaongay(maDonVi_param) {
        let madonvi = parseInt(maDonVi_param);
        let isHave = false;
        for (var j = 0; j < UNITS_NO_BCN.length; j++) {
          var jcurrent = UNITS_NO_BCN[j];
          if (madonvi == jcurrent) {
            isHave = true;

          }
        }
        return isHave;

      },
      convertToClientTime(dateString) {
        if (!dateString) return "";

        // Thêm 'Z' để xác định đây là giờ UTC
        const date = new Date(dateString + "Z");

        // Kiểm tra nếu Date không hợp lệ
        if (isNaN(date.getTime())) return "Ngày không hợp lệ";

        // Format thành dd/mm/yyyy hh:mm
        return new Intl.DateTimeFormat("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // Sử dụng định dạng 24h
        }).format(date).replace(",", "");
      },
    },
    computed: {
      is_CAT_User() {
        return this.$store.getters['auth/is_CAT_User'];
      },
      is_QuanHuyen_User() {
        return this.$store.getters['auth/is_QuanHuyen_User'];
      },
      is_PhuongXa_User() {
        return this.$store.getters['auth/is_PhuongXa_User'];
      },
      get_current_user() {
        return this.$store.getters['auth/current_user'];
      },
      is_PhanQuyenGiaoThong() {
        return this.$store.getters["auth/is_PhanQuyenGiaoThong"];
      },
      is_PhanQuyenPCCC() {
        return this.$store.getters["auth/is_PhanQuyenPCCC"];
      },
      is_PhanQuyenVuViecTTXH() {
        return this.$store.getters["auth/is_PhanQuyenVuViecTTXH"];
      },
      is_PhanQuyenTongHopBaoCao() {
        return this.$store.getters["auth/is_PhanQuyenTongHopBaoCao"];
      },
      is_BaoCaoNgay() {
        return (this.maLoaiKyBaoCaoSelected == 1)
      }
    }

  }


</script>