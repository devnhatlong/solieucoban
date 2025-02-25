<template>
  <aside id="sidebar" class="sidebar" v-if="get_current_user">
    <ul class="sidebar-nav" id="sidebar-nav">
      <li class="nav-item">
        <a class="nav-link collapsed" href="/home">
          <i class="bi bi-grid"></i>
          <span>Bảng điều khiển</span>
        </a>
      </li>
      <!-- End Dashboard Nav -->

      <li class="nav-item" v-show="is_PhanQuyenVuViecTTXH">
        <a class="nav-link collapsed" data-bs-target="#quanlyvuviec-nav" data-bs-toggle="collapse" href="#">
          <i class="bx bx-id-card"></i><span>Vụ việc về TTXH</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="quanlyvuviec-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav">
          <li v-show="!is_CAT_User">
            <a href="/vuviec/themvuviec">
              <i class="bi bi-circle"></i><span>Thêm vụ việc</span>
            </a>
          </li>
          <li>
            <a href="/vuviec/Danhsachvuviec">
              <i class="bi bi-circle"></i><span>Danh sách vụ việc</span>
            </a>
          </li>
          <li>
            <a href="/doituong/tracuu">
              <i class="bi bi-circle"></i><span>Tra cứu đối tượng</span>
            </a>
          </li>
          <li>
            <a href="/vuviec/thongke">
              <i class="bi bi-circle"></i><span>Thống kê số liệu</span>
            </a>
          </li>
          <li>
            <a href="/vuviec/danhsachvuviecdaxoa" v-show="is_CAT_User">
              <i class="bi bi-circle"></i><span>Danh sách vụ việc đã xóa</span>
            </a>
          </li>
        </ul>
      </li>
   
      <li class="nav-item" v-show="is_PhanQuyenGiaoThong">
        <a class="nav-link collapsed" data-bs-target="#giaothong-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-car-front"></i><span>Giao thông</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="giaothong-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav">
          <li>
            <a href="/giaothong/danhsachtngt">
              <i class="bi bi-circle"></i><span>Danh sách TNGT</span>
            </a>
          </li>
          <li v-show="!is_CAT_User">
            <a href="/giaothong/themtngt" >
              <i class="bi bi-circle"></i><span>Thêm vụ TNGT</span>
            </a>
          </li>         
          
          <li>
            <a href="/giaothong/thongke">
              <i class="bi bi-circle"></i><span>Thống kê vụ TNGT</span>
            </a>
          </li>
        </ul>
      </li>
     
      <li class="nav-item" v-show="is_PhanQuyenPCCC">
        <a class="nav-link collapsed" data-bs-target="#pccc-nav" data-bs-toggle="collapse" href="#">
          <i class="ri ri-blaze-line"></i><span>Phòng cháy chữa cháy</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="pccc-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav">
          <li>
            <a href="/pccc/danhsachvuchayno">
              <i class="bi bi-circle"></i><span>Danh sách vụ cháy/nổ</span>
            </a>
          </li>
          <li v-show="!is_CAT_User">
            <a href="/pccc/themvuchayno" >
              <i class="bi bi-circle"></i><span>Thêm vụ cháy/nổ</span>
            </a>
          </li>         
         
          <li>
            <a href="/pccc/thongke">
              <i class="bi bi-circle"></i><span>Thống kê vụ cháy/nổ</span>
            </a>
          </li>
        </ul>
      </li>
      <li class="nav-item" v-show="is_PhanQuyenGiaoThong || is_PhanQuyenPCCC">
        <a class="nav-link collapsed" data-bs-target="#bieumausolieu-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-table"></i><span>Biểu mẫu số liệu</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="bieumausolieu-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav">
            
          <li>
            <a href="/bieumausolieu/danhsachbieumausolieu">
              <i class="bi bi-circle"></i><span>Danh sách biểu mẫu số liệu</span>
            </a>
          </li>
        
        </ul>
      </li>
      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#quanlybaocao-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-file-ruled"></i><span>Báo cáo - tổng hợp</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="quanlybaocao-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav">
          <li>
            <a href="/baocao/guibaocao/0">
              <i class="bi bi-circle"></i><span>Gửi báo cáo</span>
            </a>
          </li>
          <li v-show="is_PhanQuyenTongHopBaoCao">
            <a href="/baocao/tonghopbaocao">
              <i class="bi bi-circle"></i><span>Tổng hợp báo cáo</span>
            </a>
          </li>
        </ul>
      </li>
      <!-- End Components Nav -->

      <li class="nav-item" v-show="is_core_account && is_CAT_User">
        <a class="nav-link collapsed" data-bs-target="#quanlytoidanh-nav" data-bs-toggle="collapse" href="#">
          <i class="bx bx-columns"></i><span>Quản lý danh mục</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="quanlytoidanh-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav">
          <li>
            <!--CAT user-->
            <a href="/danhmuc/quanlylinhvuc">
              <i class="bi bi-circle"></i><span>Lĩnh vực vụ việc</span>
            </a>
          </li>
          <li>
            <a href="/danhmuc/quanlytoidanh">
              <i class="bi bi-circle"></i><span>Tội danh</span>
            </a>
          </li>     
       
        </ul>
      </li>
      <li class="nav-item" v-show="is_core_account">
        <a class="nav-link collapsed" data-bs-target="#cauhinh-nav" data-bs-toggle="collapse" href="#">
          <i class="bx bx-cog"></i><span>Cấu hình</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="cauhinh-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav">
          <li v-show="is_core_account">
            <a href="/taikhoan/danhsach">
              <i class="bi bi-circle"></i><span>Danh sách tài khoản</span>
            </a>
          </li>
            
       
          <li >
            <a href="/taikhoan/phanquyen">
              <i class="bi bi-circle"></i><span>Phân quyền chức năng</span>
            </a>
          </li>
          <li v-show="is_CAT_User">
            <a href="/taikhoan/phanquyenlinhvucvuviec">
              <i class="bi bi-circle"></i><span>Phân quyền lĩnh vực vụ việc</span>
            </a>
          </li>  
        </ul>
      </li>


      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-person"></i><span>Tài khoản</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="forms-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav">
          <li>
            <a href="/taikhoan/thongtin">
              <i class="bi bi-circle"></i><span>Thông tin</span>
            </a>
          </li>
       
          <li v-show="get_current_user.levelDonVi == 1">
            <a href="/taikhoan/cauhinh">
              <i class="bi bi-circle"></i><span>Cấu hình</span>
            </a>
          </li>
          <li>
            <a href="/taikhoan/doimatkhau">
              <i class="bi bi-circle"></i><span>Đổi mật khẩu</span>
            </a>
          </li>
        </ul>
      </li>
      <!-- End Forms Nav -->

      <li class="nav-item">
        <a class="nav-link collapsed" href="/lienhe">
          <i class="bi bi-envelope"></i>
          <span>Thông tin liên hệ</span>
        </a>
      </li>
      
     
      <!-- End Dashboard Nav -->
    </ul>
  </aside>
  <!-- End Sidebar-->
</template>

<script>
  export default {
    created() { },
    computed: {
      is_CAT_User() {
        return this.$store.getters["auth/is_CAT_User"];
      },
      is_Chuc_Vu() {
        if (this.get_current_user?.tenTaiKhoan.indexOf("doitruong") > -1) {
          return true;
        } else {
          return false;
        }
      },
      get_current_user() {
        return this.$store.getters["auth/current_user"];
      },
      is_core_account() {

        if (this.get_current_user?.maLoaiTaiKhoan == "3") {
          return true;
        }
        else {
          return false;
        }
      },
      is_PhanQuyenGiaoThong() {
        return this.$store.getters["auth/is_PhanQuyenGiaoThong"];
      },
      is_PhanQuyenVuViecTTXH() {
        return this.$store.getters["auth/is_PhanQuyenVuViecTTXH"];
      },
      is_PhanQuyenTongHopBaoCao() {
        return this.$store.getters["auth/is_PhanQuyenTongHopBaoCao"];
      },
      is_PhanQuyenPCCC() {
        return this.$store.getters["auth/is_PhanQuyenPCCC"];
      }

    },
    methods: {
      logOut() {
        this.$store.dispatch("auth/logout");
        this.$router.push("/login");
      },
    },
  };
</script>