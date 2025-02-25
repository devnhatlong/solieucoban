import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login(user) {
    return api
      .post('taikhoan/login', user)
      .then((response) => {

        if (response.success) {
          TokenService.setUser(response.data);
        }
        return response;
      });
  }

  logout() {
    let user = TokenService.getUser();
    if(!user){
      return;
    }
    api
    .post('taikhoan/logout',user)
    .then((response) => {
      TokenService.removeUser();
    },
    (error)=>{

    }
    );

    
    
  }
  check_afk(){
    let user = TokenService.getUser();
    api.post('taikhoan/checkafk',user)
    .then((response) => {      
    },
    (error)=>{

    })
  }
  /*login(user) {
    return axios
      .post(process.env.VUE_APP_ROOT_API + 'taikhoan/login', user)
      .then(response => {
        if(response.data.success){
          localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        return response.data;       
      });
  }*/
  /*refeshtoken(){
    let userEDM = JSON.parse(localStorage.getItem('user'));
    let tokenmodel = {
      accessToken:userEDM.accessToken,
      refeshToken:userEDM.refeshToken,
    }
    return axios
      .post(process.env.VUE_APP_ROOT_API + 'taikhoan/refeshtoken', tokenmodel)
      .then(response => {
        if(response.data.success){
          localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        return response.data;       
      });
  }*/
 
}

export default new AuthService();
