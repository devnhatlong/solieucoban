<template>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1>Thẩm định</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
          <li class="breadcrumb-item active">Thẩm định</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center">Danh sách đơn vị</h5>
         
          <div class="row">
            
            <div class="container">
              <div class="card-deck mb-3 text-center">
                <table class="table table-bordered table-sm ">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col" width="5%">STT</th>
                      <th scope="col" width="5%"></th>
                      <th scope="col" width="40%">Tên đơn vị</th>
                      <th scope="col" width="15%">Điểm tự đánh giá</th>
                      <th scope="col" width="15%">Điểm thẩm định</th>
                      <th scope="col" width="10%">Thẩm định</th>
                      <th scope="col" width="10%">Chi tiết</th>
                    </tr>
                  </thead>
                  <template :key="index" v-for="(object,index) in donvis">
                    <tbody>
                      <tr>
                        <td>{{index + 1}}</td>
                        <td><a v-if="object.danhSachDonViCon.length>0" @click="show_danh_sach_donvicon(object.maDonVi)"
                            href="#" title="Mở danh sách đơn vị cấp dưới" class="text-dark"><i :id="'i'+object.maDonVi"
                              class="bi bi-8-circle"></i></a>
                        </td>
                        <td>{{object.tenDonVi}} </td>
                        <td>{{object.diemTuDanhGia}}</td>
                        <td>{{object.diemThamDinh}}</td>
                        <td><a v-show="object.diemTuDanhGia" @click="goto_thamdinh_view(object.maDonVi)" href="#"
                            title="Thẩm định" class="text-dark"><i class="bi bi-apple"></i></a> </td>
                        <td><a v-show="object.diemTuDanhGia" @click="goto_xem_chi_tiet_view(object.maDonVi)" href="#"
                            title="Xem chi tiết" class="text-dark"><i class="bi bi-balloon"></i></a> </td>
                      </tr>
                    </tbody>
                    <tbody :id="'tbody'+ object.maDonVi" v-show="false" style="background-color: rgb(245, 245, 245);">
                      <tr :key="index1" v-for="(dvcon,index1) in object.danhSachDonViCon">
                        <td>{{index + 1}}.{{index1 + 1}}</td>
                        <td></td>
                        <td class="text-info">{{dvcon.tenDonVi}}</td>
                        <td>{{dvcon.diemTuDanhGia}}</td>
                        <td>{{dvcon.diemThamDinh}}</td>
                        <td></td>
                        <td><a v-show="dvcon.diemTuDanhGia" @click="goto_xem_chi_tiet_view(dvcon.maDonVi)" href="#"
                            title="Xem chi tiết" class="text-dark"><i class="fa fa-eye"></i></a> </td>
                      </tr>
                    </tbody>
                  </template>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  import BaoCaoService from "../../services/baocao.service";
  import AuthService from "../../services/auth.service";
  export default {
    name: 'thamdinh.list',
    data() {
      return {
        donvis: []
      }
    },
    created() {
      this.get_data_from_server();
    },
    methods: {
      get_data_from_server() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        BaoCaoService.laydanhsachdonvicon().then(
          (res) => {
            this.donvis = res.data;
            console.log(this.donvis);
            this.donvis.sort((a, b) => {
              if (a.diemThamDinh < b.diemThamDinh) {
                return 1;
              } else if (a.diemThamDinh > b.diemThamDinh) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
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
      goto_xem_chi_tiet_view(madonvi) {
        this.$router.push('/xemchitiet/' + madonvi);
        event.preventDefault();
      },
      goto_thamdinh_view(madonvi) {
        this.$router.push('/thamdinh/' + madonvi);
        event.preventDefault();
      },
      show_danh_sach_donvicon(madonvi) {


        $('#tbody' + madonvi).slideToggle(100, function () {
          if ($('#i' + madonvi).prop("class") == "fa-regular fa-minus-square") {
            $('#i' + madonvi).prop("class", "fa-regular fa-plus-square");
          }
          else {
            $('#i' + madonvi).prop("class", "fa-regular fa-minus-square");
          }
        });

        console.log(event);
        event.preventDefault();
      }
    }

  }
</script>