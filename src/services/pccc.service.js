import api from "./api";

class PcccService {
  laydanhsachvuchayno(obj) {
    return api.post('phongchay/timkiem', obj)
      .then(response => {

        return response;

      })
  };
  laychitietvuchayno(matngt) {
    return api.get(`phongchay/chitietvuchayno/${matngt}`)
      .then(response => {
        return response;
      })
  };
  laydulieudanhmuc() {
    return api.get(`phongchay/laydulieuformtimkiem`)
      .then(response => {
        return response;
      })
  };
  laydulieuformnhap(matngt) {
    return api.get(`phongchay/laydulieuformnhap/${matngt}`)
      .then(response => {
        return response;
      })
  };
 
 luuvuchayno(phongchayobj) {
    return api.post(`phongchay/luuvuchayno`, phongchayobj)
      .then(response => {
        if (response) {
          return response;
        }
      });
  };
  xoavuchayno(mavuchayno){
    return api.delete(`phongchay/xoavuchayno/${mavuchayno}`).then(res=>{
        return res;    
    })
}
  pheduyetvuchayno(pheduyetvuchaynoObj) {

    return api.post(`phongchay/pheduyetvuchayno`, pheduyetvuchaynoObj)
      .then(response => {
        if (response) {
          return response; 
        }
      });
  };
  thongke(obj) {
    return api.post('phongchay/thongke', obj)
      .then(response => {

        return response;

      })
  };
}
export default new PcccService();