
<template>

        <div class="container text-center p-4">

        <div class="form-group row  text-left p-2 mx-auto">
            <div class="col-6">
                <label class="p-0 m-0 text-left">Chọn biểu mẫu</label>
                <select id="phanquyenSelect" class="form-control" v-model="phanquyenselected" @change="hienThiDanhSachBaoCao()">
                    <option 
                    v-for="phanquyen in phanquyens" :value="phanquyen"
                        :key="phanquyen">{{ phanquyen.bieuMau.tenBieuMau }}</option>
                </select>
            </div>
          <div class="col-2 ">

            <label class="p-0 m-0 text-left">Chọn loại định kỳ:</label> 
              <select id="loaikybaocaoselect" v-model="loaikybaocaoselected" class="form-control" @change="hienThiDanhSachBaoCao()">
                     <option v-for="loaikybaocao in loaikybaocaos" :value="loaikybaocao"
                      :key="loaikybaocao">{{ loaikybaocao.tenLoaiKyBaoCao }}</option>
                </select>
                </div>
                <div class="col-2">
                    <label class="p-0 m-0 text-left">Chọn năm:</label> 
                    <select id="namselect" class="form-control" v-model="nambaocaoselected" @change="hienThiDanhSachBaoCao()">
                      <option v-for="nambaocao in nambaocaos" :key="nambaocao">{{nambaocao}}</option>
                    </select>    
                </div>
              
           </div>
           <div v-if="baocaosolieus" class="mx-auto">
            <table class="table table-bordered table-sm  table-striped">
        <thead>
          <tr>
            <th scope="col" width="10%">Stt</th>
            <th scope="col"  width="60%">Kỳ báo cáo</th>

            <th scope="col" width="30%">Thao tác</th>
          </tr>
        </thead>
        <tbody>
           <tr :key="index" v-for="(baocao,index) in baocaosolieus">
                    <td>{{index + 1}}</td>
                    <td>{{baocao.tenKyBaoCao}}</td>
                    <td> 
                    <template v-if="phanquyenselected.quyen=='2'">
                          <input type="button" value="Xem" class="btn btn-sm btn-success small" @click="openform('view',baocao)">
                         &nbsp;<input  type="button" value="Sửa" class="btn btn-sm btn-warning small" @click="openform('edit',baocao)">    
                    </template>
                    <template v-if="phanquyenselected.quyen=='1' & baocao.maBaoCao != '0'">
                          <input type="button" value="Xem" class="btn btn-sm btn-success small" @click="openform('view',baocao)">                  
                          &nbsp;<input  type="button" value="Sửa" class="btn btn-sm btn-warning small" @click="openform('edit',baocao)">                 
                    </template>
                    <template v-if="phanquyenselected.quyen == '1' & baocao.maBaoCao == '0'">
                      <input type="button" value="Thêm" class="btn btn-sm btn-primary small" @click="openform('create', baocao)">
                    </template>
                     </td>
            </tr>
          
        </tbody>
      </table>
           </div>
        </div>
    
</template>
<script>

import BaoCaoService from "../../services/baocao.service";
import AuthService from "../../services/auth.service";
    export default {
        name: 'productForm',
        
        data(){
            return{             
              phanquyens:[],
              loaikybaocaos:[],
              nambaocaos:[],
              baocaosolieus:[],
              phanquyenselected:{},
              nambaocaoselected:'',
              loaikybaocaoselected:{},
            }
        },
        methods:{
            validate(){
            },
             getDefaultData(){          
               /* let loader = this.$loading.show(this.LOADING_PARAM);
               BaoCaoService.laydulieubandau().then(
            (res) => {
              loader.hide();
              try{
                this.phanquyens = res.data.phanQuyens;
                console.log(this.phanquyens);
                if(this.phanquyens.length>0){
                    this.phanquyenselected = this.phanquyens[0];
                }
                this.loaikybaocaos = res.data.loaiKyBaoCaos;  
                if(this.loaikybaocaos.length>0){
                    this.loaikybaocaoselected = this.loaikybaocaos[0];
                }
                let nambaocaohientai = res.data.namBaoCao;
                this.nambaocaos = [nambaocaohientai-1, nambaocaohientai,nambaocaohientai+1]
                this.nambaocaoselected = nambaocaohientai;                
                this.hienThiDanhSachBaoCao();                
              }
              catch{
              }},
                (error) =>{
                     loader.hide();
                     console.log(error);
                    let  message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                   
                    this.$swal.fire(message,'',  'error');
                }

                )*/
              },
              hienThiDanhSachBaoCao(){
              /*let loader = this.$loading.show(this.LOADING_PARAM);  
               
                  let mabieumau = this.phanquyenselected.maBieuMau;
                  let maloaikybaocao = this.loaikybaocaoselected.maLoaiKyBaoCao;               
                  let nambaocao  = this.nambaocaoselected;
   
                  BaoCaoService.laydanhsachbaocao( mabieumau, maloaikybaocao, nambaocao).then(
            (res) => {
                 
                  if(res.success){                    
                      this.baocaosolieus = res.data;
                  }
                  else{
                      this.$swal.fire(res.message,'',  'error');
                  }                       
                  loader.hide();
                  },
              (error) =>{
                     loader.hide();
                     let  message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    console.log(message);
              });*/
              },
                      
            openform(method, baocaoObj){       
              /*   
                let mabieumau = this.phanquyenselected.maBieuMau;           
                let nambaocao  = this.nambaocaoselected;               
                this.$router.push({name:'baocaosolieu.edit', params:{      
                  method:method,     
                  mabaocao:baocaoObj.maBaoCao,
                  mabieumau:mabieumau,
                  makybaocao:baocaoObj.maKyBaoCao,
                  nambaocao:nambaocao
                }})*/
            }
            
        },
        created(){
                this.getDefaultData();
        }
    }
</script>
<style>
*:disabled {
  background-color: rgb(230, 230, 230);

}
</style>