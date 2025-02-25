import AuthService from '../services/auth.service';
var user;

if(localStorage.getItem('user')){
  try{
    user = JSON.parse(localStorage.getItem('user'));
  //   user = {
  //     "maTaiKhoan":269,
  //     "tenTaiKhoan": "pv01.doi4.doitruong",
  //     "matKhau": "",
  //     "maDonVi": 118,
  //     "levelDonVi": 3,
  //     "tenDonVi": "Đội 4",
  //     "maDonViCha": 2,
  //     "maLoaiTaiKhoan": null,
  //     "tenLoaiTaiKhoan": "User",
  //     "mota": "Đội trưởng, Đội 4, Phòng PV01",
  //     "trangThai": 1,
  //     "accessToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJNYVRhaUtob2FuIjoiMjY5IiwiVGVuVGFpS2hvYW4iOiJwdjAxLmRvaTQuZG9pdHJ1b25nIiwiTWFMb2FpVGFpS2hvYW4iOiIxIiwiVGVuTG9haVRhaUtob2FuIjoiVXNlciIsIlZlcnNpb24iOiIxIiwianRpIjoiNTQ2ZmE5MTYtYTc1ZS00YzBjLTg1OWEtMGZiMGFkNmE2ZDE2IiwibmJmIjoxNzIxMTIwNjY3LCJleHAiOjE3MjExMjEyNjcsImlhdCI6MTcyMTEyMDY2N30.tg49xLj1TPZEag6yRsWJpgyB93CaBBJh7JgM16U_sz61upt9DNK91T8ypAGnGjoY3niU_Z-ayn-5mD79JprimQ",
  //     "refeshToken": "NUvwq8zcGBFwKa0+4cAXfcPXkX9i8PBKcJ6t27xaOaw=",
  //     "isAdmin": false
  // }
  // localStorage.setItem("user", user);

  }
  catch{
    localStorage.removeItem("user");
    user = null;
  }
}


const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      console.log(user);
      
      return AuthService.login(user).then(
        res => {
          commit('loginSuccess', res.data);
          return Promise.resolve(res);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    refreshToken({ commit }, user) {
      commit('refreshToken', user);
    },
    is_CAT_User(user){
      
        return (user.donVi.maLoaiDonVi == '1')
      
    
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
      
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    refreshToken(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    
  },
  getters: {
      current_user (state) {
      //   state.user = {
      //     "maTaiKhoan":269,
      //     "tenTaiKhoan": "pv01.doi4.doitruong",
      //     "matKhau": "",
      //     "maDonVi": 118,
      //     "levelDonVi": 3,
      //     "tenDonVi": "Đội 4",
      //     "maDonViCha": 2,
      //     "maLoaiTaiKhoan": null,
      //     "tenLoaiTaiKhoan": "User",
      //     "mota": "Đội trưởng, Đội 4, Phòng PV01",
      //     "trangThai": 1,
      //     "accessToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJNYVRhaUtob2FuIjoiMjY5IiwiVGVuVGFpS2hvYW4iOiJwdjAxLmRvaTQuZG9pdHJ1b25nIiwiTWFMb2FpVGFpS2hvYW4iOiIxIiwiVGVuTG9haVRhaUtob2FuIjoiVXNlciIsIlZlcnNpb24iOiIxIiwianRpIjoiNTQ2ZmE5MTYtYTc1ZS00YzBjLTg1OWEtMGZiMGFkNmE2ZDE2IiwibmJmIjoxNzIxMTIwNjY3LCJleHAiOjE3MjExMjEyNjcsImlhdCI6MTcyMTEyMDY2N30.tg49xLj1TPZEag6yRsWJpgyB93CaBBJh7JgM16U_sz61upt9DNK91T8ypAGnGjoY3niU_Z-ayn-5mD79JprimQ",
      //     "refeshToken": "NUvwq8zcGBFwKa0+4cAXfcPXkX9i8PBKcJ6t27xaOaw=",
      //     "isAdmin": false
      // }
          return state.user;

    },
    is_CAT_User(state){
      if(state.user){    
        return (state.user.donVi?.maLoaiDonVi == LOAIDONVI_CAT)
      }
      return false;
    },
    is_PhongBan_User(state){
      if(state.user){        
        return (state.user.donVi?.maLoaiDonVi == LOAIDONVI_PHONGBAN)//phongban
      }
      return false;
    },
    is_QuanHuyen_User(state){
      if(state.user){        
        return (state.user.donVi?.maLoaiDonVi == LOAIDONVI_QUANHUYEN)//phongban
      }
      return false;
    },
    is_PhuongXa_User(state){
      if(state.user){        
        return (state.user.donVi?.maLoaiDonVi == LOAIDONVI_PHUONGXA)//phongban
      }
      return false;
    },
    is_Doi_User(state){
      if(state.user){        
        return (state.user.donVi?.maLoaiDonVi == LOAIDONVI_DOI)//phongban
      }
      return false;
    },
    is_PhanQuyenGiaoThong(state){
      if(state.user){
        if(state.user.donVi?.maLoaiDonVi == LOAIDONVI_CAT|| state.user.donVi?.maLoaiDonVi == LOAIDONVI_QUANHUYEN || state.user.donVi?.maLoaiDonVi == LOAIDONVI_PHUONGXA){
          return true;
        }
        else if(state.user.donVi?.maLoaiDonVi == LOAIDONVI_PHONGBAN){
        
          return (state.user.phanQuyenPhanHeLucLuong?.maPhanHeLucLuong == 2)//giao thong      
        }
        else{
          return false;
        }
      }
      return false;
    },
    is_PhanQuyenPCCC(state){
      if(state.user){
        if(state.user.donVi?.maLoaiDonVi == LOAIDONVI_CAT|| state.user.donVi?.maLoaiDonVi == LOAIDONVI_QUANHUYEN || state.user.donVi?.maLoaiDonVi == LOAIDONVI_PHUONGXA){
          return true;
        }
        else if(state.user.donVi?.maLoaiDonVi == LOAIDONVI_PHONGBAN){
        
          return (state.user.phanQuyenPhanHeLucLuong?.maPhanHeLucLuong == 3)//giao thong      
        }
        else{
          return false;
        }
      }
      return false;
    },
    is_PhanQuyenVuViecTTXH(state){
      if(state.user){
        if(state.user.donVi?.maLoaiDonVi == LOAIDONVI_CAT|| state.user.donVi?.maLoaiDonVi == LOAIDONVI_QUANHUYEN || state.user.donVi?.maLoaiDonVi == LOAIDONVI_PHUONGXA){
          return true;
        }
        else if(state.user.donVi?.maLoaiDonVi == LOAIDONVI_PHONGBAN){
        
          return (state.user.phanQuyenLinhVucVuViecs?.length>0)    
        }
        else{
          return false;
        }
      }
      return false;
    },
    is_PhanQuyenTongHopBaoCao(state){
      if(state.user){
        if(state.user.donVi?.maLoaiDonVi == LOAIDONVI_CAT|| state.user.donVi?.maLoaiDonVi == LOAIDONVI_QUANHUYEN){
          return true;
        }
      }
      return false;
    }
  }
};
