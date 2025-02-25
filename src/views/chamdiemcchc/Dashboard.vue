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

      <div class="row">

        <template v-if="!is_CAT_User">
          <div class="col-lg-8">
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <div class="col-xxl-4 col-xl-6">
                    <div class="card" :style="'background-color:' + color_remain_tudanhgia">
                      <div class="card-body m-0 p-0">

                        <div class="d-flex align-items-center info-card pt-2">
                          <div class=" mx-4 d-flex align-items-center justify-content-center pb-0 mb-0">
                            <div
                              class="card-icon card-icon-small rounded-circle d-flex align-items-center justify-content-center">
                              <i class="bi bi-alarm"></i>
                            </div>
                            <div class="ps-3" style="font-size: 0.95rem;">
                              {{date_tudanhgia_result}}
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xxl-4 col-xl-6">
                    <div class="card" :style="'background-color:' + color_remain_thamdinh">
                      <div class="card-body p-0 m-0">

                        <div class="d-flex align-items-center info-card pt-2 ">
                          <div class=" mx-4 d-flex align-items-center justify-content-center pb-0 mb-0">
                            <div
                              class="card-icon card-icon-small rounded-circle d-flex align-items-center justify-content-center">
                              <i class="bi bi-alarm"></i>
                            </div>
                            <div class="ps-3" style="font-size: 0.95rem;">
                            
                              {{date_thamdinh_result}}
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Điểm tự đánh giá và thẩm định -->
              <div class="col-xxl-4 col-xl-6" v-if="!is_CAT_User">
                <div class="card info-card sales-card">
                  <div class="card-body">
                    <h5 class="card-title">Kết quả tự đánh giá</h5>
                    <div class="d-flex align-items-center">
                      <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-ui-checks-grid"></i>
                      </div>
                      <div class="ps-3">
                        <h6>{{my_ketquadanhgia.diemTuDanhGia}} / {{my_ketquadanhgia.boTieuChi?.tongDiem}} </h6>

                        <button v-if="!is_hethantudanhgia" type="button"
                          class="btn btn-block btn-outline-primary btn-sm" @click="goto_TuDanhGia_View"> <i
                            class="bi bi-pencil-square"></i> Tự đánh giá</button>
                        <button v-else type="button" class="btn btn-block btn-outline-primary btn-sm"
                          @click="goto_XemChiTiet_View"> <i class="bi bi-pencil-square"></i> Xem chi tiết </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="col-xxl-4 col-xl-6" v-if="!is_CAT_User">
                <div class="card info-card revenue-card">
                  <div class="card-body">
                    <h5 class="card-title">Kết quả thẩm định</h5>
                    <div class="d-flex align-items-center">
                      <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-file-earmark-check"></i>
                      </div>
                      <div class="ps-3">
                        <h6>{{my_ketquadanhgia.diemThamDinh}} / {{my_ketquadanhgia.boTieuChi?.tongDiem}}</h6>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <!-- Lĩnh vực -->
              <div class="col-12" v-show="linhvucs.length > 0">
                <div class="card info-card">
                  <div class="filter">
                    <a class="icon-collapse collapsed" href="#" data-bs-toggle="collapse"
                      data-bs-target="#collapse_100">
                      <i class="bi bi-chevron-down ms-auto"></i>
                    </a>

                  </div>
                  <div class="card-body">
                    <h5 class="card-title">Kết quả chi tiết từng lĩnh vực</h5>

                    <div class="collapse" id="collapse_100">
                      <table class="table table-sm text-center">
                        <thead>
                          <tr>
                            <th scope="col" width="5%">STT</th>
                            <th scope="col" width="50%">Tên lĩnh vực</th>
                            <th scope="col" width="15%">Điểm tối đa</th>
                            <th scope="col" width="15%">Tự đánh giá</th>
                            <th scope="col" width="15%">Thẩm định</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template :key="index" v-for="(object,index) in linhvucs">
                            <tr>
                              <td>{{index + 1}}</td>
                              <td class="text-start">{{object.tieude}}</td>
                              <td>{{object.diemtoida}}</td>
                              <td>{{object.diemtudanhgia}}</td>
                              <td class="text-danger"><b>{{object.diemthamdinh}}</b></td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Thẩm định đơn vị con -->
              <div class="col-12" v-show="list_donvi_con_thamdinh.length > 0">
                <div class="card info-card">
                  <div class="filter">
                    <a class="icon-collapse collapsed" href="#" data-bs-toggle="collapse"
                      data-bs-target="#collapse_101">
                      <i class="bi bi-chevron-down ms-auto"></i>
                    </a>

                  </div>
                  <div class="card-body">
                    <h5 class="card-title ">Danh sách đơn vị cần thẩm định</h5>
                    <div class="collapse" id="collapse_101">
                      <table class="table table-striped text-center datatable">
                        <thead>
                          <tr>
                            <th scope="col">STT</th>
                            <th scope="col" class="text-center">Tên đơn vị</th>
                            <th scope="col">Tự đánh giá</th>
                            <th scope="col">Thẩm định</th>

                          </tr>
                        </thead>
                        <tbody>
                          <template :key="index" v-for="(object,index) in list_donvi_con_thamdinh">
                            <tr>
                              <td class="text-center">{{index + 1}}</td>
                              <td>{{object.donVi.tenDonVi}} </td>
                              <td>{{object.diemTuDanhGia}}</td>
                              <td>{{object.diemThamDinh}}</td>

                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Bảng xếp hạng -->
          <div class="col-xl-4">
            <div class="card" v-show="list_donvi_ranking_in_local.length > 0">
              <div class="filter" v-show="list_donvi_ranking_in_local.length>number_of_top_local">
                <a class="icon-collapse collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapse_102">
                  <i class="bi bi-chevron-down ms-auto"></i>
                </a>
              </div>
              <div class="card-body">
                <h5 class="card-title">Xếp hạng trong địa phương</h5>

                <div class="activity">
                  <template :key="index"
                    v-for="(object, index) in list_donvi_ranking_in_local.slice(0,number_of_top_local)">
                    <div class="activity-item d-flex">
                      <div class="activite-label text-center">{{index+1}}</div>
                      <i class="bi bi-circle-fill activity-badge  align-self-start text-info"
                        v-bind:class="{'text-danger': object.maDonVi==my_ketquadanhgia.maDonVi }"></i>
                      <div class="activity-content pt-0 p-2">
                        {{object.donVi.tenDonVi}}
                      </div>
                    </div>

                  </template>
                  <div id="collapse_102" class="collapse">
                    <template :key="index"
                      v-for="(object, index) in list_donvi_ranking_in_local.slice(number_of_top_local,list_donvi_ranking_in_local.length)">

                      <div class="activity-item d-flex">
                        <div class="text-center activite-label">{{index+number_of_top_local+1}}</div>
                        <i class="bi bi-circle-fill activity-badge  align-self-start text-info"
                          v-bind:class="{'text-danger': object.maDonVi==my_ketquadanhgia.maDonVi }"></i>

                        <div class="activity-content pt-0 p-2">
                          {{object.donVi.tenDonVi}}
                        </div>
                      </div><!-- End activity item-->

                    </template>
                  </div>
                </div><!-- End activity item-->
              </div>
            </div>

            <div class="card">
              <div class="filter" v-show="list_donvi_ranking.length>number_of_top">
                <a class="icon-collapse collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapse_103">
                  <i class="bi bi-chevron-down ms-auto"></i>
                </a>

              </div>
              <div class="card-body">
                <h5 class="card-title">Xếp hạng theo bộ tiêu chí</h5>
                <div class="activity">
                  <template :key="index" v-for="(object, index) in list_donvi_ranking.slice(0,number_of_top)">
                    <div class="activity-item d-flex">
                      <div class="activite-label text-center">{{index+1}}</div>
                      <i class="bi bi-circle-fill activity-badge  align-self-start text-info"
                        v-bind:class="{'text-danger': object.maDonVi==my_ketquadanhgia.maDonVi }"></i>

                      <div class="activity-content pt-0 p-2">
                        {{object.donVi.tenDonVi}}
                      </div>
                    </div><!-- End activity item-->

                  </template>
                  <div id="collapse_103" class="collapse">
                    <template :key="index"
                      v-for="(object, index) in list_donvi_ranking.slice(number_of_top,list_donvi_ranking.length)">

                      <div class="activity-item d-flex">
                        <div class="text-center activite-label">{{index+number_of_top+1}}</div>
                        <i class="bi bi-circle-fill activity-badge  align-self-start text-info"
                          v-bind:class="{'text-danger': object.maDonVi==my_ketquadanhgia.maDonVi }"></i>

                        <div class="activity-content pt-0 p-2">
                          {{object.donVi.tenDonVi}}
                        </div>
                      </div><!-- End activity item-->

                    </template>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </template>
        <!-- Tài khoản CAT -->
        <template v-else>
       
            <div class="row accordion" id="accordion">
              <template :key="idx" v-for="(object,idx) in list_botieuchi_donvi">
              <div class="card overflow-auto">
                <div class="filter">
                  <a class="icon-collapse collapsed"   href="#" data-bs-toggle="collapse"
                    :data-bs-target="'#collapse_' + idx">
                    <i class="bi bi-chevron-down ms-auto"></i>
                  </a>

                </div>

                <div class="card-body">
                  <h5 class="card-title pb-1">{{object.boTieuChi?.tenBoTieuChi}}</h5>
                  <h6 class="text-muted">{{object.boTieuChi?.mota}}</h6>
                  <div class="d-flex align-items-center info-card ">
                    <div class="mx-4 d-flex align-items-center justify-content-center sales-card">
                      <div class="card-icon rounded-circle  d-flex align-items-center justify-content-center">
                        <i class="bi bi-ui-checks-grid"></i>
                      </div>
                      <div class="ps-3 ">
                        Tự đánh giá <span class="fs-5 fw-bold">{{get_number_of(object.danhSachDonVi,'tudanhgia')}} /
                          {{object.danhSachDonVi.length}}</span>
                      </div>
                    </div>
                    <div class="mx-4 d-flex align-items-center justify-content-center revenue-card">
                      <div class=" card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-file-earmark-check"></i>
                      </div>
                      <div class="ps-3 ">
                        Thẩm định <span class="fs-5 fw-bold">{{get_number_of(object.danhSachDonVi,'thamdinh')}} /
                          {{object.danhSachDonVi.length}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="collapse"  :id="'collapse_'+idx" data-bs-parent="#accordion">
                    <table class="table table-striped datatable text-center">
                      <thead>
                        <tr>
                          <th scope="col" class="text-center">STT</th>
                          <th scope="col" class="text-center">Tên đơn vị</th>
                          <th scope="col" class="text-center">Điểm tự đánh giá</th>
                          <th scope="col" class="text-center">Điểm thẩm định</th>
                        </tr>
                      </thead>
                      <tbody>
                        <template :key="index" v-for="(obj,index) in object.danhSachDonVi">
                          <tr>
                            <td class="text-center">{{index + 1}}</td>
                            <td>{{obj.donVi.tenDonVi}} </td>
                            <td>{{obj.diemTuDanhGia}}</td>
                            <td >{{obj.diemThamDinh}}</td>

                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </template>
            </div>

         

        </template>
      </div>


      <div v-html="legacySystemHTML" hidden></div>
    </section>
  </main>
</template>
<script>

  import BaoCaoService from "../../services/baocao.service";
  import CauHinhService from "../../services/cauhinh.service";


  export default {
    name: 'Dashboard',
    data() {
      return {
        legacySystemHTML: '',
        my_ketquadanhgia: {},
        list_donvi_ranking: [],
        list_donvi_ranking_in_local: [],
        list_donvi_con_thamdinh: [],
        linhvucs: [],
        list_botieuchi_donvi: [],
        number_of_top: 10,
        number_of_top_local: 5,
        date_tudanhgia_result: '',
        date_thamdinh_result: '',
        is_hethantudanhgia: false,
        color_remain_tudanhgia: '#fff',
        color_remain_thamdinh: '#fff',
      }
    },
    created() {
      this.load_dashboard_data_from_server();
      this.load_cauhinh_from_server();    
      public_active_sidebar_item(this.$route.path);
    },
    methods: {
      load_dashboard_data_from_server() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        BaoCaoService.get_dashboard_data().then((res) => {
          loader.hide();
          try {
            if (res.data.length > 0) {
              this.list_botieuchi_donvi = res.data;

              this.list_botieuchi_donvi.forEach(element_botieuchi => {
                element_botieuchi.danhSachDonVi.sort(this.sort_diem_tham_dinh);
                element_botieuchi.danhSachDonVi.forEach(element => {
                  if (element.maDonVi == this.get_current_user.maDonVi) {
                    this.my_ketquadanhgia = element;
                  }
                  if (this.get_current_user.levelDonVi == 3) {
                    if (element.donVi.maDonViCha == this.get_current_user.maDonViCha) {
                      this.list_donvi_ranking_in_local.push(element);
                    }
                    this.list_donvi_ranking.push(element);
                  }
                  if (this.get_current_user.levelDonVi == 2) {

                    if (element_botieuchi.viewMode == "thamdinh") {
                      this.list_donvi_con_thamdinh.push(element);
                    }
                    else {
                      this.list_donvi_ranking.push(element);
                    }
                  }
                 
                });
              })


              this.list_donvi_ranking.sort(this.sort_diem_tham_dinh);
              this.list_donvi_ranking_in_local.sort(this.sort_diem_tham_dinh);
              console.log(1224);
              this.display_botieuchi_template_HTML();
              console.log(1225);
              this.$nextTick(function () {

                const datatables = document.getElementsByClassName('datatable');
              
                for (let i = 0; i < datatables.length; i++) {
                  let datatable = new simpleDatatables.DataTable(datatables[i], {
                    searchable: false,
                    paging: false,
                    footer: false,
                    classes: {
                      container: "datatable-container border-0",
                      bottom: "",
                    }
                  });
                }
              })
            }
          }
          catch {
            new Error('lỗi kết nối máy chủ');
          }
        },
          (error) => {
            console.log((error.response && error.response.data && error.response.data.message) || error.message || error.toString()); loader.hide()
          });
      },
      load_cauhinh_from_server() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        CauHinhService.getAll().then(
          (res) => {
            if (res.success) {
              this.cauhinhs = res.data;
              let date1 = moment(this.cauhinhs[0].giaTri, 'yyyy-MM-DD');

              let date2 = moment(this.cauhinhs[1].giaTri, 'yyyy-MM-DD');

              let current_date = moment(this.cauhinhs[2].giaTri, 'yyyy-MM-DD');
            
              if (current_date.isAfter(date1)) {
                this.is_hethantudanhgia = true;
                this.date_tudanhgia_result = "Đã hết thời gian tự đánh giá";
              }
              else {
                var temp_diff = date1.diff(current_date, 'days');
                let percent = temp_diff/60.0;
                percent = percent>1?1:percent;
                this.color_remain_tudanhgia= this.getColorForPercentage(percent);       
                

                
                this.date_tudanhgia_result = "Ngày hết hạn tự đánh giá " + date1.format('DD/MM/yyyy') + ". Còn " + temp_diff + " ngày";
             
              }
              if (current_date.isAfter(date2)) {
                this.date_thamdinh_result = "Đã hết thời gian thẩm định";
              }
              else {

                var temp_diff = date2.diff(current_date, 'days');
                let percent = temp_diff/60.0;
                percent = percent>1?1:percent;
                this.color_remain_thamdinh= this.getColorForPercentage(percent);    
                this.date_thamdinh_result = "Ngày hết hạn thẩm định " + date2.format('DD/MM/yyyy') + ". Còn " + temp_diff + " ngày";
              }
              loader.hide();
            }
          },
          (error) => {
            loader.hide();
            this.$router.push('/home');
          })
      },
      display_botieuchi_template_HTML() {
        if(!this.my_ketquadanhgia.boTieuChi){
          return;
        }
        fetch(this.my_ketquadanhgia.boTieuChi.duongDan, {
          headers: {
            'Content-Type': 'text/html',
            'Accept': 'text/html'
          }
        })
          .then((res) => {

            return res.text();
          })
          .then((data) => {

            this.legacySystemHTML = data;
            this.$nextTick(function () {
              this.linhvucs = [];
              this.collect_linhvuc_from_template();

              let kq_tu_danh_gia_obj = [];
              let kq_tham_dinh_obj = [];
              if (this.my_ketquadanhgia.ketQuaTuDanhGia.length > 0) {
                kq_tu_danh_gia_obj = JSON.parse(this.my_ketquadanhgia.ketQuaTuDanhGia);
              }
              if (this.my_ketquadanhgia.ketQuaThamDinh.length > 0) {
                kq_tham_dinh_obj = JSON.parse(this.my_ketquadanhgia.ketQuaThamDinh);
              }

              this.linhvucs.forEach(linhvuc => {

                if (kq_tu_danh_gia_obj.length > 0) {
                  kq_tu_danh_gia_obj.forEach(obj => {
                    if (obj.id.split("_")[0] == linhvuc.id) {
                      linhvuc.diemtudanhgia += parseFloat(obj.giatri);
                    }
                  });
                }
                if (kq_tham_dinh_obj.length > 0) {
                  kq_tham_dinh_obj.forEach(obj => {
                    if (obj.id.split("_")[0] == linhvuc.id) {
                      linhvuc.diemthamdinh += parseFloat(obj.giatri);
                    }
                  });
                }

              });
            })
              .catch((data) => {
                this.legacySystemHTML = 'An error occured, please try again.'
              })
          })
      },
      collect_linhvuc_from_template() {
        for (let i = 1; i <= STEP_MAX; i++) {

          if (!$('#td_linhvuc_' + i).html()) {

            continue;
          }

          let temp = $('#td_linhvuc_' + i).html().toLowerCase();
          temp = temp.charAt(0).toUpperCase() + temp.slice(1)
          this.linhvucs.push({
            "id": "" + i,
            "tieude": temp,
            "diemtoida": $('#td_diemtoida_' + i).html(),
            "diemtudanhgia": 0,
            "diemthamdinh": 0
          });
        };
      },
      sort_diem_tham_dinh(a, b) {
        if (a.diemThamDinh > b.diemThamDinh) {
          return -1;
        } else if (a.diemThamDinh < b.diemThamDinh) {
          return 1;
        }
        return 0;
      },
      goto_TuDanhGia_View() {
        this.$router.push('/chamdiemcchc/tudanhgia');
      },
      goto_XemChiTiet_View() {
        this.$router.push('/chamdiemcchc/xemchitiet/' + this.my_ketquadanhgia.maDonVi);
      },
      goto_ds_donvi_View() {
        this.$router.push('/danhsachdonvi');
      },
      goto_ThongKe_View() {
        this.$router.push('/thongke');
      },
      goto_xem_chi_tiet_view(madonvi) {
        this.$router.push('/xemchitiet/' + madonvi);
        event.preventDefault();
      },
      goto_thamdinh_view(madonvi) {
        this.$router.push('/thamdinh/' + madonvi);
        event.preventDefault();
      },
      get_number_of(ds, type) {
        if (type == "tudanhgia") {
          return ds.filter((object) => object.diemTuDanhGia > 0).length;
        }
        else {
          return ds.filter((object) => object.diemThamDinh > 0).length;
        }

      }

      ,
      getColorForPercentage(pct) {
        var percentColors = [
          { pct: 0.0, color: { r: 0xee, g: 0x00, b: 0 } },
          { pct: 0.5, color: { r: 0xff, g: 0xcc, b: 0 } },
          { pct: 1.0, color: { r: 0x00, g: 0xaa, b: 0 } }];

        for (var i = 1; i < percentColors.length - 1; i++) {
          if (pct < percentColors[i].pct) {
            break;
          }
        }
        var lower = percentColors[i - 1];
        var upper = percentColors[i];
        var range = upper.pct - lower.pct;
        var rangePct = (pct - lower.pct) / range;
        var pctLower = 1 - rangePct;
        var pctUpper = rangePct;
        var color = {
          r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
          g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
          b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        return 'rgb(' + [color.r, color.g, color.b].join(',') + ', 0.7)';
        // or output as hex if preferred
      }
    },
    computed: {
      is_CAT_User() {
        return this.$store.getters['auth/is_CAT_User'];
      },
      get_current_user() {
        return this.$store.getters['auth/current_user'];
      },

    }

  }


</script>