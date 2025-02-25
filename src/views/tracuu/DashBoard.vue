
<template>

      <div class="container text-center">
      <h3 class="mt-2"> Tra cứu số liệu</h3>
        <div class="form-group row  text-left p-2 mx-auto">
            <div class="col-6">
                <label class="p-0 m-0 text-left">Chọn biểu mẫu</label>
                <select id="phanquyenSelect" class="form-control" v-model="phanquyenselected">
                    <option 
                    v-for="phanquyen in phanquyens" :value="phanquyen"
                        :key="phanquyen">{{ phanquyen.bieuMau.tenBieuMau }}</option>
                </select>
            </div>
          <div class="col-2 ">
               <label class="p-0 m-0 text-left">Từ tháng</label>
                 <VueDatePicker v-model="from_month" locale="vi" cancelText="Hủy" selectText="Chọn" month-picker />       

           </div>
            <div class="col-2 ">
               <label class="p-0 m-0 text-left">đến tháng</label>
                 <VueDatePicker v-model="to_month" locale="vi" cancelText="Hủy" selectText="Chọn" month-picker />       
           </div>
           <div class="col-2 align-bottom">
               <label class="p-0 m-0 text-left">&nbsp;</label>
                <input type="button" class="btn btn-sm btn-primary form-control" value="Tra cứu" v-on:click="searchData"/>      
           </div>
        </div>
        <div class="mt-4" id="templateContainer" style="display: block">
        </div> 
        <input v-if="haveData" type="button" class="btn btn-secondary" value="Xuất Excel" @click="exportExcel">
</div>
      
</template>
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import BaoCaoService from "../../services/baocao.service";
import AuthService from "../../services/auth.service";
import { ref } from 'vue';
    export default {
        name: 'tracuuform',
        components: { VueDatePicker },

        data(){
            return{             
              phanquyens:[],
              phanquyenselected:{},
              haveData:false,
              from_month:ref({
                month: new Date().getMonth(),
                year: new Date().getFullYear()
              }),
              to_month:ref({
                month: new Date().getMonth(),
                year: new Date().getFullYear()
              }),
              jsontotable:null,
              baocao:{
                mabieumau:0,
                mabaocao:0,
                makybaocao:0,
                nambaocao:0,
                method:'',     
                ketqua:'' ,
                tenkybaocao:'',
                tenbieumau:'',
              },
              baocaos:[],
            }
        },
        methods:{
          
             getDefaultData(){          
                let loader = this.$loading.show(this.LOADING_PARAM);
                BaoCaoService.laydulieubandau().then(
            (res) => {
              loader.hide();
              try{
                this.phanquyens = res.data.phanQuyens;
                if(this.phanquyens.length>0){
                    this.phanquyenselected = this.phanquyens[0];
                }
              }
              catch{}
              },
              (error) =>{
                    loader.hide();
                  let  message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                  this.$swal.fire(message,'',  'error');
              })
              },
                searchData(){
                    let mabieumau = this.phanquyenselected.maBieuMau;          
                    let loader = this.$loading.show(this.LOADING_PARAM);     
                    let str_from_month = (this.from_month.month + 1) +"," + this.from_month.year;
                    let str_to_month = (this.to_month.month + 1) +"," + this.to_month.year;
                    BaoCaoService.laybaocaotheothang(mabieumau, str_from_month, str_to_month).then(
                (res) =>{ 
                    loader.hide();
                    try{
                      this.baocaos = res.data;
                      this.haveData = true;                    
                      var collectDataList = [];      
                      var respondDataList = res.data;
                      let unitProp = "Đơn vị";
                      let periodProp = "Kỳ báo cáo";                      
                      var matrixlist = [];
                      
                      for(var i = 0;i<respondDataList.length;i++){   
                        var arraylist = [];
                       
                        for(var j = 0;j<respondDataList[i].length;j++){                          
                          let ketquaJsonString = respondDataList[i][j].ketQua;                          
                          let str = '{';
                          //str += '"' + periodProp + '":"' + respondDataList[i][j]['tenKyBaoCao'] + '/' + respondDataList[i][j]['namBaoCao'] + '",'; 
                          str += '"' + unitProp + '":"' + respondDataList[i][j]['tenDonVi'] + '"'; 
                          if(ketquaJsonString.length==0){
                            str += '}';
                          }
                          else{
                            str += ',';
                            str += ketquaJsonString.slice(1);
                          }                     
                          let ketquaJsonObj = JSON.parse(str);
                          arraylist.push(ketquaJsonObj);
                        }
                        matrixlist.push(arraylist);
                      }
                      this.baocao.ketqua = matrixlist;
                      console.log(matrixlist);
                      this.baocao.method = "tracuu_view_collect";                    
                      this.jsontotable = new JsonToTable();                   
                      this.jsontotable.jsonToHtmlTable({
                        mode:this.baocao.method,
                        container:$("#templateContainer"),
                        data : this.baocao.ketqua,
                        tableCssClass : 'table table-bordered',
                        tableId : 'templateTable',
                        refreshPriod : 1000                            
                      });
                       
                    }
                    catch{
                    }
                    (error) =>{
                      loader.hide();                  
                      let  message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                      this.$swal.fire(message,'',  'error');
                    }
                })
              }
        },
        exportExcel(){
         
                $("#main-container").table2excel({
                    exclude:".noExl",
                    name:"Worksheet Name",
                    filename:"export",
                    fileext:".xls", // file extension
                    preserveColors:true

                });
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
