<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Văn bản triển khai</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
          <li class="breadcrumb-item">Văn bản triển khai</li>
          <li class="breadcrumb-item active">Danh sách</li>
        </ol>
      </nav>
    </div>
    <section class="section">
      <div class="card">
        <div class="card-body info-card pt-4">
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Chọn lĩnh vực:</label>
            <div class="col-sm-4">
              <select id="select_linh_vuc" class="form-select">
                <option>Tất cả</option>
                <option>Công tác đơn vị</option>
                <option>Tuyên truyền</option>
                <option>Công tác Đảng</option>
              </select>
            </div>
            <div class="col-sm-2">
              <button class="btn btn-primary">Tìm kiếm</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-body info-card pt-4">
          <table class="table  table-sm " style="font-size: 0.95rem;">
            <thead>
              <tr>
                <th scope="col" width="10%">Số văn bản</th>
                <th scope="col" width="40%">Trích yếu</th>
                <th scope="col" width="20%">Lĩnh vực</th>
                <th scope="col" width="15%">Ngày triển khai</th>
                <th scope="col" width="15%">Chi tiết</th>

              </tr>
            </thead>
            <tbody>
              <tr :key="index" v-for="(vanban,index) in vanbantrienkhais">

                <td>{{vanban.soVanBan}}</td>
                <td>{{vanban.trichYeu}}</td>
                <td>{{vanban.linhVuc}}</td>
                <td>{{vanban.ngayTrienKhai}}</td>

                <td class="text-start">
                  <button type="button" class="btn text-primary btn-default" data-bs-toggle="modal"
                    data-bs-target="#basicModal" @click="open_detail_vanbantrienkhai(index)">
                    <i class="bi bi-file-earmark-text"></i></button>


                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <div class="modal fade" id="basicModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content faq " >
          <div class="modal-header">
            <h5 class="modal-title">Chi tiết văn bản triển khai</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">

            </button>
          </div>
          <div class="modal-body basic">
            <div class="row ps-2">
              <div class="col-4">
                <h6>1. Số văn bản</h6>
                <p>{{vanbantrienkhai_selected.soVanBan}}</p>
              </div>
              <div  class="col-4">
                <h6>2. Ngày văn bản</h6>
                <p>{{vanbantrienkhai_selected.ngayVanBan}}</p>
              </div>
              <div  class="col-4">
                <h6>3. Lĩnh vực</h6>
                <p>{{vanbantrienkhai_selected.linhVuc}}</p>
              </div>
            </div>
            <div class="ps-2">
              <h6>4. Trích yếu</h6>
              <p>{{vanbantrienkhai_selected.trichYeu}}</p>
            </div>
            
            <div class="ps-2 ">
              <h6>5. Tệp Đính kèm</h6>

              <div :key="idx" v-for="(fileinfo,idx) in vanbantrienkhai_selected.files">
                <a :href="fileinfo.pathFile" target='_blank' >{{fileinfo.filename}}</a>
              </div>
            </div>            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import VanBanTrienKhaiService from "../../services/vanbantrienkhai.service";
  export default {
    name: 'vanbantrienkhai.list',
    data() {
      return {
        vanbantrienkhais: [],
        vanbantrienkhai_selected: 0
      }
    },
    created() {
      this.getListVanBanTrienKhai();
    },
    methods: {
      open_detail_vanbantrienkhai(index, e) {
        this.vanbantrienkhai_selected = this.vanbantrienkhais[index];

      }
      , getListVanBanTrienKhai() {

        let loader = this.$loading.show(this.LOADING_PARAM);
        VanBanTrienKhaiService.laydanhsachvanban().then(
          (res) => {
            this.vanbantrienkhais = res.data;

            for (var i = 0; i < this.vanbantrienkhais.length; i++) {
              var files = [];
              if (this.vanbantrienkhais[i].tepDinhKem.length > 0) {
                files = JSON.parse(this.vanbantrienkhais[i].tepDinhKem);
                for (var j = 0; j < files.length; j++) {
                  files[j].pathFile = process.env.VUE_APP_ROOT_API +
                    "vanbantrienkhai/download/" +
                    encodeURIComponent(files[j].pathFile);
                }
                this.vanbantrienkhais[i].files = files;
              }

            }
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

      }

    }
  }
</script>