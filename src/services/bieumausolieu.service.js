import api from "./api";

class BieuMauSoLieuService {
    laydulieubandau(object) {  
      return api
        .get('bieumausolieu/defaultdata')
        .then(response => {   
          if(response){

            return response;    
          }                        
        });
    }
  
    laydanhsachkybaocao(timkiem_obj) {  
      return api
        .post(`bieumausolieu/laydanhsachkybaocao/`, timkiem_obj)
        .then(response => {
          if(response){
            return response;    
          }                        
        });
    }
    tonghopbaocao(makybaocao, nambaocao) {  
      return api
        .get(`baocao/tonghopbaocao/${makybaocao}/${nambaocao}`)
        .then(response => {
          if(response){
            return response;    
          }                        
        });
    }
    
    get_dashboard_data()
    {
      return api
      .get(`ketquadanhgia/dashboard`)
      .then(response => {
        if(response){    
          return response;
        }
      });
    }
    laydanhsachkybaocao(timkiem_obj) {  
      return api
        .post(`bieumausolieu/laydanhsachkybaocao`, timkiem_obj)
        .then(response => {
          if(response){
            return response;    
          }                        
        });
    }
    
    laybaocaobieumausolieu(timkiem_obj){
        return api.post(`bieumausolieu/laybaocaobieumausolieu`, timkiem_obj,).then(res=>{
          return res;
        });
    }
   /* laybaocaotheothang( mabieumau, from_month, to_month){

      return api.get(`baocao/tracuu/${mabieumau}/${from_month}/${to_month}`).then(res=>{
        return res;
      });
    }*/
    luubaocao(obj){
        return api.post("bieumausolieu/luubaocao", obj).then(res=>{
            return res;  
        })
    }
    guibaocao( info,files){
      var formData = new FormData();
      formData.append("info", JSON.stringify(info));
      for (const file of files) {
        formData.append("files", file);
    }
    return api.post(process.env.VUE_APP_ROOT_API + "baocao", formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      }) .then(res=>{
        if(res){        
            return res; 
        }       
    })
  }
    
  }
  
  export default new BieuMauSoLieuService();