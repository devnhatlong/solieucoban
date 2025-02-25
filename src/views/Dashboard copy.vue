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

        <!-- Left side columns -->
        <div class="col-lg-12">
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
                      <h6><a class="btn btn-sm btn-outline-primary" href="/giaothong/danhsachbieumausolieu">Chọn</a></h6>
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



      </div>
    </section>
  </main>
</template>
<script>

  import BaoCaoService from "../services/baocao.service";
  import CauHinhService from "../services/cauhinh.service";


  export default {
    created() {
      if (document.querySelector('body').classList.contains('toggle-sidebar')) {
        document.querySelector('body').classList.toggle('toggle-sidebar');
      }
    },
    methods: {

    },
    computed: {
      is_CAT_User() {
        return this.$store.getters['auth/is_CAT_User'];
      },
      get_current_user() {
        return this.$store.getters['auth/current_user'];
      },
      is_PhanQuyenGiaoThong() {
        return this.$store.getters["auth/is_PhanQuyenGiaoThong"];
      },
      is_PhanQuyenVuViecTTXH() {
        return this.$store.getters["auth/is_PhanQuyenVuViecTTXH"];
      },
      is_PhanQuyenTongHopBaoCao() {
        return this.$store.getters["auth/is_PhanQuyenTongHopBaoCao"];
      }
    }

  }


</script>