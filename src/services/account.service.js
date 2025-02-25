import api from './api';


class AccountService {
  changePassword(matkhaucu, matkhaumoi) {
    return api.put(process.env.VUE_APP_ROOT_API + 'taikhoan/doimatkhau', {
      matkhaucu: matkhaucu, matkhaumoi: matkhaumoi
    })
      .then(response => {
        return response.success;
      });
  }
  get_data_List_Accounts_View() {
    return api.get(process.env.VUE_APP_ROOT_API + 'taikhoan/getdatalistaccountview')
      .then(response => {
        return response;
      });
  }
  get_danh_sach_account_cua_don_vi() {
    return api.get(process.env.VUE_APP_ROOT_API + 'taikhoan/danhsachtaikhoantrongdonvi')
      .then(response => {
        return response;
      });
  }
  get_list_child_donvi() {
    return api.get(process.env.VUE_APP_ROOT_API + 'taikhoan/danhsachdonvicon')
      .then(response => {
        return response;
      });
  }
  luudonvi(donviobj) {    
    return api
      .post(`donvi`, donviobj)
      .then(response => {
        if (response) {
          return response;
        }
      });
  }
  xoadonvi(madonvi) {    
    return api.delete(`donvi/${madonvi}`)
      .then(response => {
        if (response) {
          return response;
        }
      });
  }
  luutaikhoan(taikhoanobj) {    
    return api
      .post(`taikhoan`, taikhoanobj)
      .then(response => {
        if (response) {
          return response;
        }
      });
  } 
  khoiphucmatkhau(mataikhoan) {    
    return api.put(`taikhoan/khoiphucmatkhau/${mataikhoan}`,
    )
      .then(response => {
        if (response) {
          return response;
        }
      });
  }
  xoataikhoan(mataikhoan) {    
    return api.delete(`taikhoan/${mataikhoan}`)
      .then(response => {
        if (response) {
          return response;
        }
      });
  }
  getUserData(tentaikhoan) {    
    return api.get(process.env.VUE_APP_ROOT_API + `taikhoan/${tentaikhoan}`)
      .then(response => {
        return response;
      });
  }
  get_danh_sach_chuc_nang(mataikhoan){
    return api.get(process.env.VUE_APP_ROOT_API + `phanquyen/phanquyenchucnang/${mataikhoan}`)
    .then(response => {
      return response;
    });
  }
  get_ds_phanquyen_loaivanban(mataikhoan){
    return api.get(process.env.VUE_APP_ROOT_API + `phanquyen/phanquyenloaivanban/${mataikhoan}`)
    .then(response => {
      return response;
    });
  }
  layphanquyenlinhvucvuviec(){
    return api.get(process.env.VUE_APP_ROOT_API + `phanquyen/layphanquyenlinhvucvuviec`)
    .then(response => {
      return response;
    });
  }
  
  luuphanquyenchucnang(phanquyenchucnangs){
    return api.post(process.env.VUE_APP_ROOT_API + `phanquyen/luuphanquyenchucnang`,phanquyenchucnangs)
    .then(response => {
      return response;
    });
  }
  luuphanquyenloaivanban(phanquyenloaivanbans){
    return api.post(process.env.VUE_APP_ROOT_API + `phanquyen/luuphanquyenloaivanban`,phanquyenloaivanbans)
    .then(response => {
      return response;
    });
  }
  /*getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }*/
}

export default new AccountService();
