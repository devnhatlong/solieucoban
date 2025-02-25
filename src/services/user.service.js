import api from './api';


class UserService {
  changePassword(matkhaucu, matkhaumoi) {


   return api.put(process.env.VUE_APP_ROOT_API + 'taikhoan/doimatkhau', {matkhaucu:matkhaucu,matkhaumoi:matkhaumoi
   })
      .then(response => {   
        console.log(response);    
        return response.success;
      });
  }

  getUserData(tentaikhoan) {
    //console.log("tentaikhoan",tentaikhoan);
     return api.get(process.env.VUE_APP_ROOT_API + `taikhoan/${tentaikhoan}`)
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

export default new UserService();
