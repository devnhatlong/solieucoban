<template>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1>Thẩm định</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
          <li class="breadcrumb-item">Chấm điểm CCHC</li>
          <li class="breadcrumb-item active">Thẩm định</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">
      <div class="row">
        <div class="card" :style="'background-color:' + color_remain_thamdinh">
          <div class="card-body p-0 m-0">

            <div class="d-flex align-items-center info-card pt-2 ">
              <div class=" mx-4 d-flex align-items-center justify-content-center pb-0 mb-0">
                <div class="card-icon card-icon-small rounded-circle d-flex align-items-center justify-content-center">
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
      <div class="row accordion" id="accordion">
        <template :key="idx" v-for="(object,idx) in list_botieuchi_donvi">
          <div class="card overflow-auto">
            <div class="filter">

              <a class="icon-collapse" :class="{'collapsed':list_botieuchi_donvi.length>1}" href="#"
                data-bs-toggle="collapse" :data-bs-target="'#collapse_' + idx">
                <i class="bi bi-chevron-down ms-auto"></i>
              </a>

            </div>

            <div class="card-body">
              <h5 class="card-title">{{object.boTieuChi?.tenBoTieuChi}}</h5>
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
              <div class="collapse " v-bind:class="{'show':(list_botieuchi_donvi.length==1)}" :id="'collapse_'+idx"
                data-bs-parent="#accordion">
                <table class="table table-striped datatable text-center">
                  <thead>
                    <tr>
                      <th scope="col" class="text-center">STT</th>
                      <th scope="col" class="text-center">Tên đơn vị</th>
                      <th scope="col" class="text-center">Điểm tự đánh giá</th>
                      <th scope="col" class="text-center">Điểm thẩm định</th>
                      <th scope="col" class="text-center" v-if="!is_hethanthamdinh">Thẩm định</th>
                      <th scope="col" class="text-center" v-else>Xem chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template :key="index" v-for="(obj,index) in object.danhSachDonVi">
                      <tr>
                        <td class="text-center">{{index + 1}}</td>
                        <td>{{obj.donVi.tenDonVi}} </td>
                        <td>{{obj.diemTuDanhGia}}</td>
                        <td>{{obj.diemThamDinh}}</td>
                        <td class="text-center">
                          <a v-show="!is_hethanthamdinh && obj.diemTuDanhGia && object.viewMode=='thamdinh'"
                            @click="goto_thamdinh_view(obj.maDonVi)" href="#" title="Thẩm định"
                            class="btn btn-primary btn-sm"> <i class="bi bi-pencil-square"></i></a>
                          &nbsp;
                          <a v-show="(is_hethanthamdinh)||(obj.diemTuDanhGia && is_CAT_User && object.viewMode=='xemchitiet')"
                            :href="'/xemchitiet/' + obj.maDonVi" title="Xem chi tiết" type="button"
                            class="btn btn-outline-secondary btn-sm"><i class="bi bi-eye"></i></a>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </template>
      </div>

    </section>
  </main>
</template>
<script>
  import BaoCaoService from "../../services/baocao.service";
  import CauHinhService from "../../services/cauhinh.service";
  import AuthService from "../../services/auth.service";
  export default {
    name: 'thamdinh.list',
    data() {
      return {
        list_botieuchi_donvi: [],

        date_thamdinh_result: '',
        is_hethantudanhgia: false,

        color_remain_thamdinh: '#fff',
        is_hethanthamdinh: false,
      }
    },
    created() {
      this.load_dashboard_data_from_server();
      this.load_cauhinh_from_server();
    },
    methods: {
      load_dashboard_data_from_server() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        BaoCaoService.get_dashboard_data().then(
          (res) => {

            res.data.forEach(element => {
              element.danhSachDonVi.sort(this.sort_diem_tham_dinh);
              if (element.viewMode == "thamdinh") {
                this.list_botieuchi_donvi.push(element);
              }
              else if (this.is_CAT_User) {

                this.list_botieuchi_donvi.push(element);
              }

            });
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
            loader.hide()
          },
          (error) => {
            console.log(
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString());

            loader.hide()
          }
        );

      },
      load_cauhinh_from_server() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        CauHinhService.getAll().then(
          (res) => {
            if (res.success) {
              this.cauhinhs = res.data;
              let date2 = moment(this.cauhinhs[1].giaTri, 'yyyy-MM-DD');
              let current_date = moment(this.cauhinhs[2].giaTri, 'yyyy-MM-DD');

              if (current_date.isAfter(date2)) {
                this.date_thamdinh_result = "Đã hết thời gian thẩm định";
                this.is_hethanthamdinh = true;
              }
              else {
                this.is_hethanthamdinh = false;
                var temp_diff = date2.diff(current_date, 'days');
                let percent = temp_diff / 60.0;
                percent = percent > 1 ? 1 : percent;
                this.color_remain_thamdinh = this.getColorForPercentage(percent);
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
      },
      sort_diem_tham_dinh(a, b) {
        if (a.diemThamDinh > b.diemThamDinh) {
          return -1;
        } else if (a.diemThamDinh < b.diemThamDinh) {
          return 1;
        }
        return 0;
      },
      get_number_of(ds, type) {
        if (type == "tudanhgia") {
          return ds.filter((object) => object.diemTuDanhGia > 0).length;
        }
        else {
          return ds.filter((object) => object.diemThamDinh > 0).length;
        }

      },
      goto_xem_chi_tiet_view(madonvi) {

        this.$router.push('/xemchitiet/' + madonvi);
        event.preventDefault();
      },
      goto_thamdinh_view(madonvi) {
        this.$router.push('/thamdinh/' + madonvi);
        event.preventDefault();
      },
    },
    computed: {
      is_CAT_User() {
        return this.$store.getters['auth/is_CAT_User'];
      },
      get_current_user() {
        return this.$store.getters['auth/current_user'];
      }
    }
  }
</script>