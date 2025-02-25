import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFound.vue'
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/taikhoan/thongtin',
    name: 'profile.info',
    component: () => import('../views/taikhoan/ProfileInfo.vue')
  },
  {
    path: '/taikhoan/bieumau',
    name: 'profile.bieumau',
    component: () => import('../views/taikhoan/ProfileBieuMau.vue')
  },
  {
    path: '/taikhoan/doimatkhau',
    name: 'profile.doimatkhau',
    component: () => import('../views/taikhoan/ProfileChangePass.vue')
  },
  {
    path: '/taikhoan/cauhinh',
    name: 'profile.cauhinh',
    component: () => import('../views/taikhoan/ProfileCauHinh.vue')
  },
  {
    path: '/taikhoan',
    name: 'taikhoan.list',
    component: () => import('../views/taikhoan/List.vue')
  },
  {
    path: '/taikhoan/create',
    name: 'taikhoan.create',
    component: () => import('../views/taikhoan/Form.vue')
  },

  
  {
    path: '/lienhe',
    name: 'page.contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView,
    meta: {
      hideNavbar: true,
    }
  },
  {
    path: '/taikhoan/danhsach',
    name: 'account.list',
    component: () => import('../views/taikhoan/ListTaiKhoan.vue')
  },
  {
    path: '/taikhoan/phanquyen',
    name: 'account.phanquyen',
    component: () => import('../views/taikhoan/PhanQuyen.vue')
  },
  {
    path: '/taikhoan/phanquyenlinhvucvuviec',
    name: 'account.phanquyenlinhvucvuviec',
    component: () => import('../views/taikhoan/PhanQuyenLinhVucVuViec.vue')
  },
  
  {
    path: '/danhmuc/quanlytoidanh',
    name: 'danhmuc.quanlytoidanh',
    component: () => import('../views/danhmuc/ListToiDanh.vue')
  },
   {
    path: '/danhmuc/quanlylinhvuc',
    name: 'danhmuc.quanlylinhvuc',
    component: () => import('../views/danhmuc/ListLinhvuc.vue')
  },
  {
    path: '/Nhatkysudung',
    name: 'Nhatkysudung',
    component: () => import('../views/nhatkyhoatdong/nhatkyhoatdong.vue')
  },
  {
    path: '/giaothong/themtngt',
    name: 'Giaothong.themtngt',
    component: () => import('../views/giaothong/FormTNGT.vue'),
    meta: {
      form_mode: FORM_MODE_NEW
    }
  },
  {
    path: '/giaothong/suatngt/:matainangiaothong',
    name: 'Giaothong.suatngt',
    component: () => import('../views/giaothong/FormTNGT.vue'),
    meta: {
      form_mode: FORM_MODE_EDIT
    }
  },
  {
    path: '/giaothong/danhsachtngt',
    name: 'Giaothong.danhsach',
    component: () => import('../views/giaothong/DanhSachTNGT.vue')
  },
  {
    path: '/giaothong/thongke',
    name: 'Giaothong.thongke',
    component: () => import('../views/giaothong/ThongKe.vue')
  },
  {
    path: '/bieumausolieu/danhsachbieumausolieu',
    name: 'bieumausolieu.danhsachbieumausolieu',
    component: () => import('../views/bieumausolieu/DanhSachBieuMauSoLieu.vue')
  }
  ,
  {
    path: '/bieumausolieu/bieumausolieu/:method/:mabaocaobieumausolieu/:mabieumausolieu/:makybaocao/:nambaocao',
    name: 'bieumausolieu.editbieumausolieu',
    component: () => import('../views/bieumausolieu/FormBieuMauSoLieu.vue')
  },
  {
    path: '/giaothong/chitiettngt/:maTaiNanGiaoThong',
    name: 'giaothong.chitiettngt',
    component: () => import('../views/giaothong/ChiTietTNGT.vue')
  },
  {
    path: '/pccc/themvuchayno',
    name: 'pccc.themvuchayno',
    component: () => import('../views/pccc/FormVuChayNo.vue'),
    meta: {
      form_mode: FORM_MODE_NEW
    }
  },
  {
    path: '/pccc/suavuchayno/:mavuchayno',
    name: 'pccc.suavuchayno',
    component: () => import('../views/pccc/FormVuChayNo.vue'),
    meta: {
      form_mode: FORM_MODE_EDIT
    }
  },
  {
    path: '/pccc/danhsachvuchayno',
    name: 'pccc.danhsach',
    component: () => import('../views/pccc/DanhSachVuChayNo.vue')
  },
  {
    path: '/pccc/thongke',
    name: 'pccc.thongke',
    component: () => import('../views/pccc/ThongKePCCC.vue')
  },
  {
    path: '/pccc/chitietvuchayno/:maVuChayNo',
    name: 'pccc.chitietvuchayno',
    component: () => import('../views/pccc/ChiTietVuChayNo.vue')
  },
  {
    path: '/Vuviec/Danhsachvuviec',
    name: 'Vuviec.Danhsachvuviec',
    component: () => import('../views/Vuviec/Danhsachvuviec.vue')
  },
  {
    path: '/Vuviec/Themvuviec',
    name: 'Vuviec.Themvuviec',
    component: () => import('../views/Vuviec/FormVuViec.vue'),
    meta: {
      form_mode: FORM_MODE_NEW
    }
  },
  {
    path: '/vuviec/suavuviec/:mavuviec',
    name: 'vuviec.suavuviec',
    component: () => import('../views/Vuviec/FormVuViec.vue'),
    meta: {
      form_mode: FORM_MODE_EDIT
    }
  },
  {
    path: '/Vuviec/Chitietvuviec/:mavuviec',
    name: 'Vuviec.chitietvuviec',
    component: () => import('../views/Vuviec/Chitietvuviec.vue')
  },
  {
    path: '/doituong/tracuu',
    name: 'doituong.tracuu',
    component: () => import('../views/Vuviec/TraCuuDoiTuong.vue')
  },
  {
    path: '/vuviec/thongke',
    name: 'vuviec.thongke',
    component: () => import('../views/Vuviec/ThongKe.vue')
  },
  {
    path: '/vuviec/danhsachvuviecdaxoa',
    name: 'vuviec.danhsachvuviecdaxoa',
    component: () => import('../views/Vuviec/DanhSachVuViecXoa.vue')
  },
  
  {
    path: '/baocao/guibaocao/:maloaikybaocao',
    name: 'baocao.guibaocao',
    component: () => import('../views/Baocao/GuiBaoCao.vue')
  },
  {
    path: '/baocao/tonghopbaocao',
    name: 'baocao.tonghopbaocao',
    component: () => import('../views/Baocao/TongHopBaoCao.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
import AuthService from "../services/auth.service";
router.beforeEach((to, from, next) => {

  const publicPages = ['/login', '/register'];
  const adminPages = ['/taikhoan', '/bieumau'];
  const authRequired = !publicPages.includes(to.path);
  const adminRequired = adminPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  public_active_sidebar_item(to.path);

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next();
  }
  else if (adminRequired) {

    let isAdmin = JSON.parse(localStorage.getItem("user")).isAdmin;
    if (!isAdmin) {
      next('/NotFound');
    }
    else { next(); }
  }
  else {
    next();
  }
 
});

export default router
