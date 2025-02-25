import api from "./api";

class GiaoThongService {
  laydanhsachtngt(obj) {
    return api.post('giaothong/timkiem', obj)
      .then(response => {

        return response;

      })
  };
  laychitiettngt(matngt) {
    return api.get(`giaothong/chitiettngt/${matngt}`)
      .then(response => {
        return response;
      })
  };
  laydulieudanhmuc() {
    return api.get(`giaothong/laydulieuformtimkiem`)
      .then(response => {
        return response;
      })
  };
  laydulieuformnhap(matngt) {
    return api.get(`giaothong/laydulieuformnhap/${matngt}`)
      .then(response => {
        return response;
      })
  };
 
  luuTNGT(giaothongobj) {
    return api.post(`giaothong/luutngt`, giaothongobj)
      .then(response => {
        if (response) {
          return response;
        }
      });
  };
  xoatngt(matngt){
    return api.delete(`giaothong/xoatngt/${matngt}`).then(res=>{
        return res;    
    })
}
  pheduyettngt(pheduyettngtObj) {

    return api.post(`giaothong/pheduyettngt`, pheduyettngtObj)
      .then(response => {
        if (response) {
          return response; 
        }
      });
  };
  thongke(obj) {
    return api.post('giaothong/thongke', obj)
      .then(response => {

        return response;

      })
  };
}
export default new GiaoThongService();