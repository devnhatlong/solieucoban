import axiosInstance from "./api";
import TokenService from "./token.service";
import EventBus from "../common/EventBus";
const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      
        //config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
 
        if(res.data){
          if(res.data){
            return res.data;
          }
 
        }
      },
    async (err) => {    

      const originalConfig = err.config;
    
      if (originalConfig.url !== "taikhoan/login"  && originalConfig.url !== "taikhoan/logout" && originalConfig.url !== "taikhoan/refeshtoken" ) {
        // Access Token was expired
        if (err.response && err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post("taikhoan/refreshtoken", TokenService.getUser());
            if(rs){
              let uservm  = rs.data;
              TokenService.setUser(uservm);      
              store.dispatch('auth/refreshToken', uservm);      
              return axiosInstance(originalConfig);        
            }
            return Promise.reject(err);
          } catch (_error) {
            if (_error.response && _error.response.status === 403) { 
              EventBus.dispatch("logout");
              return;
            }
            return Promise.reject(_error);
          }
        }
        else
        {
          EventBus.dispatch("logout");
          return;
        }
       
      }
      EventBus.dispatch("logout");
      return;
      //return Promise.reject(err);
    }
  );
};

export default setup;