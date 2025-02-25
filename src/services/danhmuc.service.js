import api from "./api";

class DanhMucService {
    laydanhsachlinhvuc(){
        return api.get('danhmuc/danhsachlinhvuc')
        .then(response => {
           
                return response;
            
        })
    };
    laydanhsachtoidanh(){
        return api.get('danhmuc/danhsachtoidanh')
        .then(response => {           
                return response;            
        })
    };

    luulinhvuc(linhvucobj){
        return api.post("danhmuc/linhvuc", linhvucobj).then(res=>{
            if(res){        
                return res; 
            }       
        })
    }
    luutoidanh(obj){
        return api.post("danhmuc/toidanh", obj).then(res=>{
            if(res){        
                return res; 
            }       
        })
    }
    xoatoidanh(matoidanh){
        return api.delete(`danhmuc/toidanh/${matoidanh}`).then(res=>{
            return res;    
        })
    }
    xoalinhvuc(malinhvuc){
        return api.delete(`danhmuc/linhvuc/${malinhvuc}`).then(res=>{
            return res;    
        })
    }

}
export default new DanhMucService();