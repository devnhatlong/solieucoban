
<template>
    <div class="bieumau-list">
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <div class="display-4">Phân quyền biểu mẫu 
              {{tenbieumau}}</div>
          </div>
          <div class="container">
            <div class="card-deck mb-3 text-center">
              <table class="table table-bordered table-sm table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tài khoản</th>
                    <th scope="col">Quyền</th>
                    <th scope="col">Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="index" v-for="(phanquyen,index) in phanquyens">
                    <td>{{index + 1}}</td>
                    <td>{{phanquyen.tenTaiKhoan}}</td>
                 
                     <td v-if="phanquyen.quyen==1">Báo cáo</td>
                     <td v-if="phanquyen.quyen==2">Tổng hợp</td>
                     <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
               
    </div>
</template>
<script>
import BaoCaoService from "../../services/baocao.service";
  export default {
      name: 'PhanQuyenBieuMau',
      
      data(){
          return{         
               tenbieumau:'',    
              phanquyens:[]
          }
      },
       created(){
        let mabieumau = this.$route.params.mabieumau;
        
        this.getPhanQuyenByMaBieuMau(mabieumau);
      },
      methods:{
        getPhanQuyenByMaBieuMau(mabieumau){
          let loader = this.$loading.show(this.LOADING_PARAM); 
           this.$request.get(process.env.VUE_APP_ROOT_API +`PhanQuyen/${mabieumau}`).then(res=> {
                    if(res.data.success){
                      console.log(res.data.data);
                      this.phanquyens = res.data.data;
                      if(this.phanquyens.length>0){
                        this.tenbieumau = this.phanquyens[0].tenBieuMau;
                      }
                     
                      loader.hide();
                    }
                  })
        },
    }
  }
  </script>