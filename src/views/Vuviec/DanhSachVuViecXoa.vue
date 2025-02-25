<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Danh sách vụ việc đã xóa</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
          <li class="breadcrumb-item">Quản lý vu việc</li>
          <li class="breadcrumb-item active">Danh sách vụ việc đã xóa</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">
      <div class="row">

        <table class="table table-bordered table-sm table-striped small" id="tabledanhsach">
          <thead>
            <tr class="text-center align-middle">
              <th scope="col" width="3%">#</th>
              <th scope="col">Đơn vị thụ lý</th>
              <th scope="col">Huyện, TX, TP</th>
              <th scope="col">Ngày xảy ra</th>
              <th scope="col">Ngày báo cáo</th>
              <th scope="col">Tội danh</th>
              <th scope="col">Nội dung vụ việc</th>
              <th scope="col">Ghi chú</th>
           
              <th scope="col" width="3%">Chi tiết</th>
              <th scope="col" width="3%">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(vuviec, index) in vuviecs" :key="index">
              <td>{{index +1 }}</td>
              <td>{{vuviec.tenDonViThuLy }}</td>
              <td>{{vuviec.tenQuanHuyen }}</td>
              <td>{{vuviec.ngayXayRa}}</td>
              <td>{{vuviec.ngayBaoCao}}</td>
              <td>{{vuviec.tenToiDanh}}</td>
              <td>{{vuviec.noiDung}}</td>
              <td>{{vuviec.ghiChu }}</td>
             
              <td class="text-center">
                <a :href="'/vuviec/chitietvuviec/'+vuviec.maVuViec"><i class="bi bi-card-list" ></i></a>
              </td>

              <td class="text-center">
              
              

              </td>

            </tr>
          </tbody>
        </table>
      
      </div>
    </section>
  
  </div>
</template>
<script>
  import VuViecService from "../../services/vuviec.service";

  export default {
    data() {
      return {
        vuviecs: [],
     
      };
    },
    created() {
      this.laydulieubandau();
    },
    methods: {
      laydulieubandau() {
        let loader = this.$loading.show(this.LOADING_PARAM);
        VuViecService.laydanhsachvuviecdaxoa().then(
          (res) => {
            loader.hide();
            if (res.success) {
              this.vuviecs = res.data; 
            }
          })
      }
      
    },
  };
</script>