<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Danh sách biểu mẫu số liệu</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
          <li class="breadcrumb-item">Biểu mẫu số liệu</li>
          <li class="breadcrumb-item active">Danh sách</li>
        </ol>
      </nav>
    </div>

    <section class="section">
      <div class="card">
        <div class="card-body">

          <form>
            <div class="row mb-3 pt-3">
              <label class="col-sm-2 col-form-label">Chọn biểu mẫu</label>
              <div class="col-sm-10">
                <select class="form-select" v-model="bieumausolieuselected" @change="hienThiDanhSachBaoCao">
                  <option v-for="bieumausolieu in bieumausolieus" :value="bieumausolieu" :key="bieumausolieu">{{
                    bieumausolieu.tenBieuMauSoLieu }}</option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-sm-2 col-form-label">Chọn loại định kỳ</label>
              <div class="col-sm-4">
                <select id="loaikybaocaoselect" v-model="loaikybaocaoselected" class="form-select"
                  @change="hienThiDanhSachBaoCao">
                  <option v-for="loaikybaocao in loaikybaocaos" :value="loaikybaocao" :key="loaikybaocao">{{
                    loaikybaocao.tenLoaiKyBaoCao }}</option>
                </select>
              </div>
              <label class="col-sm-1 col-form-label">Năm</label>
              <div class="col-sm-2">
                <select id="namselect" class="form-select" v-model="nambaocaoselected" @change="hienThiDanhSachBaoCao">
                  <option v-for="nambaocao in nambaocaos" :key="nambaocao" :value="nambaocao">{{nambaocao}}</option>
                </select>
              </div>


              <label class="col-sm-1 col-form-label">Tháng</label>
              <div class="col-sm-2">
                <select id="namselect" class="form-select" v-model="thangbaocaoselected"
                  @change="hienThiDanhSachBaoCao">
                  <option v-for="thangbaocao in thangbaocaos" :key="thangbaocao" :value="thangbaocao">{{thangbaocao}}
                  </option>
                </select>
              </div>

            </div>
          </form>

          <div v-if="baocaobieumausolieus" class="mx-auto">
            <table class="table  table-sm ">
              <thead>
                <tr>
                  <th scope="col" width="10%" class="text-center">STT</th>
                  <th scope="col" width="30%">Kỳ báo cáo</th>
                  <th scope="col" width="30%" class="text-center">Thêm/sửa số liệu</th>
                  <th scope="col" width="30%" class="text-center">Tổng hợp số liệu</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="index" v-for="(baocao_bmsl,index) in baocaobieumausolieus"   :class="baocao_bmsl.laKyBaoCaoHienTai?'table-primary':''">
                  <td class="text-center">{{index + 1}}</td>
                  <td>{{baocao_bmsl.tenKyBaoCao}}</td>
                  <td class="text-center">

                    <div v-show="!is_CAT_User">
                    <template v-if="baocao_bmsl.maBaoCaoBieuMauSoLieu != '0'">
                      <button type="button" class="btn btn-sm btn-success small" title="Xem"
                        @click="openform('view',baocao_bmsl)"><i class="bi bi-eye"></i> </button>

                      <button type="button" class="btn btn-sm btn-warning small ms-1" title="Sửa"
                        @click="openform('edit',baocao_bmsl)"><i class="bi bi-pencil-square"></i> </button>


                    </template>
                    <template v-else>
                      <button type="button" class="btn btn-sm btn-primary small" title="Thêm"
                        @click="openform('create', baocao_bmsl)"><i class="bi bi-plus-circle"></i></button>

                    </template>
                    </div>
                  </td>
                  <td class="text-center" >
                    <button v-show="is_CAT_User || is_PhongBan_User" type="button" class="btn btn-sm btn-outline-primary small" title="Tổng hợp"
                    @click="openform('collect', baocao_bmsl)"><i class="bi bi-collection"></i> Tổng hợp</button>

                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>
<script>

  import BieuMauSoLieuService from "../../services/bieumausolieu.service";

  export default {
    name: 'bieumausolieu.danhsach',

    data() {
      return {
        bieumausolieus: [],
        loaikybaocaos: [],
        nambaocaos: [],
        thangbaocaos: [],
        baocaobieumausolieus: [],
        bieumausolieuselected: {},
        nambaocaoselected: '',
        loaikybaocaoselected: {},
        thangbaocaoselected: '',
        ngayHienTai:'',
      }
    },
    methods: {
      validate() {
      },
      getDefaultData() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        BieuMauSoLieuService.laydulieubandau().then(
          (res) => {
            loader.hide();
            try {
              this.bieumausolieus = res.data.bieuMauSoLieus;
              //console.log(this.bieumausolieus);
              if (this.bieumausolieus.length > 0) {
                this.bieumausolieuselected = this.bieumausolieus[0];
              }
              this.loaikybaocaos = res.data.loaiKyBaoCaos;
              if (this.loaikybaocaos.length > 0) {
                this.loaikybaocaoselected = this.loaikybaocaos[0];
              }
              this.ngayHienTai = res.data.ngayHienTai;
              let date_moment = moment( this.ngayHienTai, DEFAULT_DATE_FORMAT);
              let nambaocaohientai = date_moment.year();
              this.nambaocaos = [nambaocaohientai - 1, nambaocaohientai, nambaocaohientai + 1]
              this.nambaocaoselected = nambaocaohientai;
              for (let i = 1; i <= 12; i++) {
                this.thangbaocaos.push(i);
              }
              this.thangbaocaoselected = date_moment.month() + 1;

              this.hienThiDanhSachBaoCao();
            }
            catch {
            }
          },
          (error) => {
            loader.hide();
            console.log(error);
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            this.$swal.fire(message, '', 'error');
          }

        )
      },
      hienThiDanhSachBaoCao() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        let mabieumau = this.bieumausolieuselected.maBieuMau;
        let maloaikybaocao = this.loaikybaocaoselected.maLoaiKyBaoCao;
        let nambaocao = this.nambaocaoselected;
        let timkiem_obj = {
          maBieuMauSoLieu: this.bieumausolieuselected.maBieuMauSoLieu,
          maLoaiKyBaoCao: this.loaikybaocaoselected.maLoaiKyBaoCao,
          namBaoCao: this.nambaocaoselected,
          thangBaoCao: this.thangbaocaoselected
        }
        BieuMauSoLieuService.laydanhsachkybaocao(timkiem_obj).then(
          (res) => {
            loader.hide();
            if (res?.success) {
              this.baocaobieumausolieus = res.data;
              let ngayhientai_moment = moment(this.ngayHienTai, DEFAULT_DATE_FORMAT);
              this.baocaobieumausolieus.forEach(baocao_item => {
                let ngaybatdau_moment = moment(baocao_item.ngayBatDau, DEFAULT_DATE_FORMAT);
                let ngayketthuc_moment = moment(baocao_item.ngayKetThuc, DEFAULT_DATE_FORMAT);
                baocao_item.laKyBaoCaoHienTai = false;
                if (ngayhientai_moment >= ngaybatdau_moment && ngayhientai_moment <= ngayketthuc_moment) {
                  baocao_item.laKyBaoCaoHienTai = true;
                
                }
              });
            }
            else {
              this.$swal.fire(res ? res.message : 'Lỗi máy chủ!', '', 'error');
            }

          },
          (error) => {
            loader.hide();
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
          });
      },

      openform(method, baocao_bmslObj) {
        this.$router.push({
          name: 'bieumausolieu.editbieumausolieu', params: {
            method: method,
            mabaocaobieumausolieu: baocao_bmslObj.maBaoCaoBieuMauSoLieu,
            mabieumausolieu: this.bieumausolieuselected.maBieuMauSoLieu,
            makybaocao: baocao_bmslObj.maKyBaoCao,
            nambaocao: this.nambaocaoselected
          }
        })
      }

    },
    created() {
      this.getDefaultData();
    },
    computed: {
      is_CAT_User() {
        return this.$store.getters["auth/is_CAT_User"];
      },
      is_PhongBan_User() {
        return this.$store.getters["auth/is_PhongBan_User"];
      },
    }
  }
</script>