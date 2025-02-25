import api from "./api";

class VuViecService {
  laydanhsachvuviec(obj) {
    return api.post('vuviec/timkiem', obj)
      .then(response => {

        return response;

      })
  };
  laychitietvuviec(mavuviec) {
    return api.get(`vuviec/chitietvuviec/${mavuviec}`)
      .then(response => {
        return response;
      })
  };
  laydanhsachvuviecdaxoa() {
    return api.get(`vuviec/laydanhsachvuviecdaxoa`)
      .then(response => {
        return response;
      })
  };
  laydulieuformtimkiem() {
    return api.get(`vuviec/laydulieuformtimkiem`)
      .then(response => {
        return response;
      })
  };
  laydulieuformthongke() {
    return api.get(`vuviec/laydulieuformthongke`)
      .then(response => {
        return response;
      })
  };
  laydulieuformvuviec(mavuviec) {
    return api.get(`vuviec/laydulieuformvuviec/${mavuviec}`)
      .then(response => {
        return response;
      })
  };
  luudoituong(doituongobj) {
    return api.post(`vuviec/luudoituong`, doituongobj)
      .then(response => {
        if (response) {
          return response;
        }
      });
  };
  luuvuviec(vuviecobj) {
    return api.post(`vuviec/luuvuviec`, vuviecobj)
      .then(response => {
        if (response) {
          return response;
        }
      });
  };
  pheduyetvuviec(vuviecpheduyetobj) {
    console.log(vuviecpheduyetobj);
    return api.post(`vuviec/pheduyetvuviec`, vuviecpheduyetobj)
      .then(response => {
        if (response) {
          return response;
        }
      });
  };
  thongkevuviec(obj) {
    return api.post('vuviec/thongke', obj)
      .then(response => {

        return response;

      })
  };
  xoavuviec(mavuviec){
    return api.delete(`vuviec/xoavuviec/${mavuviec}`).then(res=>{
        return res;    
    })
}
}
export default new VuViecService();