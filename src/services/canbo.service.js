import api from "./api";

class CanBoService {
   
    laydanhsachcanbo() {  
      return api
        .get('canbo')
        .then(response => {
          if(response){    
            return response;
          }
        });    
      }
      luucanbo(canbomoi){
        return api.post("canbo", canbomoi).then(res=>{
            if(res){        
                return res.success; 
            }       
        })
    }
    
  }
  
  export default new CanBoService();