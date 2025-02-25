import api from "./api";

class DoiTuongService {
    laydanhsachdoituong(obj) {
        return api.post('doituong/timkiem', obj)
            .then(response => {

                return response;

            })
    };
    laychitietdoituong(madoituong) {
        return api.get(`doituong/chitietdoituong/${madoituong}`)
            .then(response => {
                return response;
            })
    };
    laydulieudanhmuc() {
        return api.get(`doituong/laydulieudanhmuc`)
            .then(response => {
                return response;
            })
    };
    
}
export default new DoiTuongService();