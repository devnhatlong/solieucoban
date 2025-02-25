import api from './api';


class CauHinhService {
  update_value(value_object) {
    console.log(value_object);
   return api.put('cauhinh', value_object)
      .then(response => {      
        return response;
      });
  }

  getAll() {
     return api.get(`cauhinh`)
     .then(response=>{
      return response;
    });
    
  }

 
}

export default new CauHinhService();
