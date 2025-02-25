import api from "./api";

class BaoCaoService {
  download(path) {
  
    return api
      .get(`baocao/${path}`)
      .then(response => {   
        if(response){
          return response;    
        }                        
      });
  }
    laydulieubandau() {
      return api
        .get('baocao/defaultdata')
        .then(response => {   
          if(response){
            return response;    
          }                        
        });
    }
    laydanhsachbaocao(malinhvucchuyendebaocao, maloaikybaocao, nambaocao, thangbaocao) {  
      return api
        .get(`baocao/laydanhsachbaocao/${malinhvucchuyendebaocao}/${maloaikybaocao}/${nambaocao}/${thangbaocao}`)
        .then(response => {
          if(response){
            return response;    
          }                        
        });
    }
    laydanhsachkybaocao(maloaikybaocao, nambaocao, thangbaocao) {  
      return api
        .get(`baocao/laydanhsachkybaocao/${maloaikybaocao}/${nambaocao}/${thangbaocao}`)
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
    laydulieudashboard(makybaocao, nambaocao) {  
      return api
        .get(`baocao/laydulieudashboard/${makybaocao}/${nambaocao}`)
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
    /*laydanhsachbaocao(mabieumau, maloaikybaocao, nambaocao){
      return api.get(`baocao/danhsach/${mabieumau}/${maloaikybaocao}/${nambaocao}`).then(res=>{
        return res;
      });
       
    }
    laybaocao( mabieumau, makybaocao, nambaocao){
        return api.get(`baocao/chitiet/${mabieumau}/${makybaocao}/${nambaocao}`).then(res=>{
          return res;
        });
    }
    laybaocaotheothang( mabieumau, from_month, to_month){

      return api.get(`baocao/tracuu/${mabieumau}/${from_month}/${to_month}`).then(res=>{
        return res;
      });
    }*/
    luuchamdiem(obj){
        return api.post("ketquadanhgia", obj).then(res=>{
            if(res){        
                return res; 
            }       
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
  
  export default new BaoCaoService();