<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Thống kê</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
          <li class="breadcrumb-item">Chấm điểm CCHC</li>
          <li class="breadcrumb-item active">Thống kê</li>
        </ol>
      </nav>
    </div>

    <section class="section dashboard" >
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center">{{botieuchi_selected.tenBoTieuChi}}</h5>
          <div class="text-muted text-center w-75 mx-auto mb-3" style="height:50px">{{botieuchi_selected.mota}}</div>

          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Chọn bộ tiêu chí:</label>
            <div class="col-sm-5">
              <select class="form-select" id="select_botieuchi" v-model="botieuchi_selected"
                @change="botieuchi_onchange">

                <option v-for="botieuchi in botieuchis" v-bind:value="botieuchi">{{ botieuchi.tenBoTieuChi }}</option>
              </select>

            </div>
            <label class="col-sm-2 col-form-label">Chọn năm:</label>
            <div class="col-sm-3">
              <select class="form-select" id="select_nam">
                <option>2024</option>
              </select>

            </div>
          </div>
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label" >Chọn lĩnh vực:</label>
            <div class="col-sm-5">
              <select class="form-select" id="select_linhvuc" :disabled="(!is_CAT_User)&&(my_botieuchi.maBoTieuChi != botieuchi_selected.maBoTieuChi)">

                <template :key="index" v-for="(linhvuc,index) in linhvucs">
                  <option v-if="index==0">{{linhvuc.tieude}}</option>
                  <option v-else>{{index}}. {{linhvuc.tieude}}</option>
                </template>
              </select>
            </div>

            <label class="col-sm-2 col-form-label">Chọn loại tra cứu: </label>
            <div class="col-sm-3">
              <select class="form-select" id="select_loaitracuu" :disabled="(!is_CAT_User)&&!is_disabled_cap_xa">
                <option>Các xã trong huyện</option>
                <option>Các xã trong tỉnh</option>
              </select>
            </div>

          </div>
          <div class="mb-2 text-center">
            <button class="btn btn-primary" @click="tracuu">Tra cứu</button>
          </div>

        </div>
      </div>

      <div class="card" id="divketquatracuu"  style="display:none">
        <div class="card-body">
          <h5 class="card-title text-center">Kết quả tra cứu</h5>
          <div class="text-muted text-center" v-show="linhvuc_selected.id!='0'">Lĩnh vực {{linhvuc_selected.tieude}}</div>
          <div class="text-muted text-center" v-show="linhvuc_selected.id!='0'">Điểm tối đa {{linhvuc_selected.diemtoida}}</div>
          <div :key="table_render_key">
          <table class="table text-center" id="myTable">
            <thead class="thead-dark">
              <tr>
                <th class="text-center">STT</th>
                <th class="text-center">Tên đơn vị</th>
                <th v-show="is_disabled_cap_xa" class="text-center">Huyện/Thị xã/Thành phố</th>
                <th class="text-center">Tự đánh giá</th>
                <th class="text-center">Thẩm định</th>

              </tr>
            </thead>
            <tbody>
              <tr :key="index" v-for="(donvi,index) in donvis">
                <td>{{index + 1}}</td>
                <td>{{donvi.tenDonVi}}</td>
                <td v-show="is_disabled_cap_xa">{{donvi.tenDonViCha}}</td>
                <td>{{donvi.tongDiemTuDanhGia}}</td>
                <td>{{donvi.tongDiemThamDinh}}</td>

              </tr>
            </tbody>
          </table>
        </div>
          <input id="btnshowhidebieudo" type="button" class="btn btn-success" value="Đóng/mở biểu đồ"
            @click="hienthibieudo">
        </div>
      </div>
      <div class="card" id="bieudo" style="display: none">
        <div class="card-body">
          <h5 class="card-title text-center">Biểu đồ thống kê</h5>
          <div :key="index" v-for="(donvi,index) in donvis" class="row align-items-center">
            <div class="col-md-3 text-end">{{index+1}}. {{donvi.tenDonVi}}</div>

            <div class="progress  col-md-8 p-0 rounded-0">
              <div :class="'progress-bar ' + donvi.class" role="progressbar"
                :style="{ 'width': (donvi.tongDiemThamDinh/donvi.tongdiemsosanh)*100 + '%' }"
                :aria-valuenow="donvi.tongDiemThamDinh" aria-valuemin="0" :aria-valuemax="donvi.tongdiemsosanh">
                {{donvi.tongDiemThamDinh}}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-html="legacySystemHTML" hidden></div>
    </section>
  </div>


</template>
<script>

  import BaoCaoService from "../../services/baocao.service";
  import AuthService from "../../services/auth.service";

  export default {
    name: 'thongke.view',

    data() {
      return {
        legacySystemHTML: '',
        donvis: [],
        botieuchis: [],
        botieuchi_selected: {},
        my_botieuchi: {},
        linhvucs: [],
        linhvuc_selected: {},
        is_disabled_cap_xa: false,
        table_render_key:0,
      }
    },
    created() {
  
      this.get_data_from_server();



    },
    computed: {
      is_CAT_User() {
        return this.$store.getters['auth/is_CAT_User'];
      },
      get_current_user() {
        return this.$store.getters['auth/current_user'];
      }
    },
    methods: {
      forceRerender(){
        this.table_render_key++;
      },
      get_data_from_server() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        BaoCaoService.laydanhsachbotieuchi().then(
          (res) => {
            this.botieuchis = res.data.danhSachBoTieuChi;
            console.log(res.data.boTieuChiPhanQuyen);
            if(res.data.boTieuChiPhanQuyen)
            {
             this.my_botieuchi = res.data.boTieuChiPhanQuyen;
             this.botieuchis.forEach(element => {
                if(element.maBoTieuChi == this.my_botieuchi.maBoTieuChi){
                  this.botieuchi_selected = element;
                }
             });
            }
           else {
            this.botieuchi_selected = this.botieuchis[0];
           }
            this.display_botieuchi_template_HTML();
            loader.hide();
          },
          (error) => {
            console.log((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
            loader.hide();
          }
        );
      },
      display_botieuchi_template_HTML() {
        this.is_disabled_cap_xa = this.botieuchi_selected.capDo == 3;
        let loader = this.$loading.show(this.LOADING_PARAM);
        fetch(this.botieuchi_selected.duongDan, {
          headers: {
            'Content-Type': 'text/html',
            'Accept': 'text/html'
          }
        })
          .then((res) => {
            return res.text();
          })
          .then((data) => {
            loader.hide();
            this.legacySystemHTML = data;
            this.$nextTick(function () {
              this.linhvucs = [];
              this.linhvucs.push({
                "id": "0",
                "tieude": "Tất cả",
                "diemtoida": this.botieuchi_selected.tongDiem
              });
              this.collect_linhvuc_from_template();

            })
              .catch((data) => {
                this.legacySystemHTML = 'An error occured, please try again.'
              })
          })
      },
      getDonViTheoBoTieuChi() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        let loaitracuu = 0;
        if (this.botieuchi_selected.capDo == 3) {
          loaitracuu = $('#select_loaitracuu').prop('selectedIndex') + 1;
        }
     
        BaoCaoService.laydanhsachdonvitheobotieuchi(this.botieuchi_selected.maBoTieuChi + "", loaitracuu).then(
          (res) => {
            loader.hide();
            this.donvis = res.data;
            this.donvis.forEach(obj => {
              let linhvuc_selected_index = $('#select_linhvuc').prop('selectedIndex');
              this.linhvuc_selected = this.linhvucs[linhvuc_selected_index];
              let sum = 0;
              if (obj.ketQuaTuDanhGia && obj.ketQuaTuDanhGia.length > 0) {
                var objketquatudanhgia = JSON.parse(obj.ketQuaTuDanhGia);
                objketquatudanhgia.forEach(obj1 => {
                  if (linhvuc_selected_index == 0) {
                    sum += parseFloat(obj1.giatri);
                  }
                  else {
                    if (obj1.id.split("_")[0] == linhvuc_selected_index) {
                      sum += parseFloat(obj1.giatri);
                    }
                  }
                });
              }
              obj.tongDiemTuDanhGia = sum;
              sum = 0;
              if (obj.ketQuaThamDinh && obj.ketQuaThamDinh.length > 0) {
                var objketquathamdinh = JSON.parse(obj.ketQuaThamDinh);

                objketquathamdinh.forEach(obj1 => {
                  if (linhvuc_selected_index == 0) {
                    sum += parseFloat(obj1.giatri);
                  }
                  else {
                    if (obj1.id.split("_")[0] == linhvuc_selected_index) {
                      sum += parseFloat(obj1.giatri);;
                    }
                  }
                });
              }
              obj.tongDiemThamDinh = sum;
              obj.tongdiemsosanh = this.linhvucs[linhvuc_selected_index].diemtoida;
              let phantram = (obj.tongDiemThamDinh / obj.tongdiemsosanh) * 100.0
              if (phantram >= 80) {
                obj.class = "bg-success";
              }
              else if (phantram >= 50)
                obj.class = "bg-warning";
              else
                obj.class = "bg-danger";


              this.donvis.sort((a, b) => {
                if (a.tongDiemThamDinh > b.tongDiemThamDinh) {
                  return -1;
                } else if (a.tongDiemThamDinh < b.tongDiemThamDinh) {
                  return 1;
                }
                // a must be equal to b
                return 0;
              });
             

            });
            this.forceRerender();
            $('#divketquatracuu').show(500,  function () {});
          
            this.$nextTick(function () {
              let myTable = document.querySelector("#myTable");
              let table = new simpleDatatables.DataTable(myTable, {
                  searchable: false,
                  paging: false,
                  footer: false
                });
               
   
              
            })
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
          collect_linhvuc_from_template(text = "", level = 0) {
            if(level > LEVEL_MAX) { return };
        let i = 1;
        if (level == 1) {
          let temp = $('#td_linhvuc' + text).html().toLowerCase();
          temp = temp.charAt(0).toUpperCase() + temp.slice(1)
          this.linhvucs.push({
            "id": text,
            "tieude": temp,
            "diemtoida": $('#td_diemtoida' + text).html()
          });
          return;
        }
        do {
          this.collect_linhvuc_from_template(text + "_" + i, level + 1);
          i++;
        } while (i <= STEP_MAX)
      },
      tracuu() {
              this.getDonViTheoBoTieuChi();
       

      },
      botieuchi_onchange() {

        this.display_botieuchi_template_HTML();
        $('#divketquatracuu').hide(100,  function () {});
        $('#bieudo').hide(100,  function () {});
      },
      hienthibieudo() {
        $('#bieudo').toggle(500, function () {
         
        });
      },

    }
  }
</script>