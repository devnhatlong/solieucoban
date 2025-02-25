import api from "./api";

class VanBanTrienKhaiService {
   
    laydanhsachvanban() {  
      return api
        .get('vanbantrienkhai')
        .then(response => {
          if(response){    
            return response;
          }
        });    
    }
    luuvanban(vanbanmoi){
      return api.post("vanbantrienkhai", vanbanmoi).then(res=>{
          if(res){        
              return res; 
          }       
      })
    }
    uploadfiles(files){
      var formData = new FormData();
     // formData.append("info", JSON.stringify(info));
        for (const file of files) {
          formData.append("files", file);
      }
      return api.post(process.env.VUE_APP_ROOT_API + "vanbantrienkhai/upload", formData,{
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
  
  export default new VanBanTrienKhaiService();