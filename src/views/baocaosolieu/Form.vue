
<template>
    <div class="container text-center" id="main-container">

    <h3 class="mt-4"> Nhập số liệu báo cáo {{baocao.tenbieumau}}
    <br/>{{baocao.tenkybaocao}}/{{baocao.nambaocao}}</h3>
            <div class="mt-4" id="templateContainer" style="display: block"></div>
            <input type="button" class="btn btn-primary" value="Lưu" @click="luuBaoCao" id="btnLuuBaoCao" v-show="isEdit">&nbsp;
            <input type="button" class="btn btn-secondary" value="Xuất Excel" @click="exportExcel">
        <div id="valueContainer" class="p-4"></div>
    </div>

</template>
<script>

   
function updateInputFomulars(fomulars, input_row_id){
    
    if(!fomulars){
        return;
    }
    for(var i = 0;i<fomulars.length;i++){
        var fomular = fomulars[i];
        var myarrray1= fomular.split("=");
        var resultinputid = myarrray1[0];
        var expression_template = myarrray1[1];//biểu thức        
        var strexpression = "";
        var arr_expression_template = expression_template.split(' ');
        for(var j = 0;j<arr_expression_template.length;j++){
            if(isNumber(arr_expression_template[j])){
                strexpression += ($("#"+input_row_id + arr_expression_template[j]).val()) ;
                console.log("strexpression", strexpression);
            }
            else{
                strexpression += arr_expression_template[j];
            }
            if(j<arr_expression_template.length-1){
                strexpression+=' ';
            }
        }
        let express = infixToPostfix(strexpression);
        console.log("express", express);
        let result = executePostfix(express); 
        console.log("#" + input_row_id + resultinputid, result);
        $("#" + input_row_id + resultinputid).val(result);

    }
   
    
}
function isNumber(value){   
    if(value.length == 0){
        return false;
    }
    return /^\d*$/.test(value);
}

import BaoCaoService from "../../services/baocao.service";
    export default {
        name: 'baocaosolieuForm',        
        data(){
            return{             
             //bieumau:{},
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
              isEdit:true
            }
        },
        methods:{
            inputOnChange(event){                
                var myarrray = event.target.id.split("_");
                var input_row_id = myarrray[0] +"_"+ myarrray[1] + "_";
                
                var col_index = myarrray[2];    
                let oldvalue = $("#" + event.target.id).val();
                let newvalue = Math.abs(parseInt(oldvalue));
                $("#" + event.target.id).val(newvalue);
                updateInputFomulars(this.jsontotable.fomulars, input_row_id);
                var arr_col_inputs = new Array(this.jsontotable.columns.length+10);
                for (var i = 0; i < arr_col_inputs.length; i++) {
                    arr_col_inputs[i] = 0;
                  
                }
                let row_length= this.baocao.ketqua.length;
                  $(':input[type="number"]').each(function(index){  
                    var input = $(this);                  
                    var arr_temp = input.attr('id').split("_");                    
                    let i = parseInt(arr_temp[2]); 
                    let row_index = parseInt(arr_temp[1]);  
                    if(row_index>=row_length-1)
                    { return};   
                    if(isNumber(input.val())==true){
                         arr_col_inputs[i] += parseInt(input.val());
                    }                   
                });
          
                for (var i = 0; i < arr_col_inputs.length; i++) {
                    $("#input_" + row_length +"_" + i).val(arr_col_inputs[i]);
                }
                
               
            },
            luuBaoCao(){               
                let ketquadatas = this.jsontotable.saveJsonData();
                if(!ketquadatas.length){
                    this.baocaos[0].ketQua = JSON.stringify(ketquadatas);
                }
                else {
                    for(var i = 0;i<this.baocaos.length;i++){
                        this.baocaos[i].ketQua = JSON.stringify(ketquadatas[i]);
                    }
                }
                let loader = this.$loading.show(this.LOADING_PARAM);            
                BaoCaoService.luubaocao(this.baocaos).then(
                (success) =>{
                    loader.hide();              
                    if(success){
                        this.$swal.fire('Lưu báo cáo thành công').then((result) => {
                            this.$router.push({name:'baocaosolieu.dashboard'});
                            });
                    }                  
                    else {
                        this.$swal.fire('Quá thời gian sửa số liệu');
                    }
                },
                (error) => {
                    this.$swal.fire('Lỗi, lưu báo cáo không thành công');
                    loader.hide();
                })
            },
            exportExcel(){
         
                $("#main-container").table2excel({
                    exclude:".noExl",
                    name:"Worksheet Name",
                    filename:this.baocao.tenbieumau+"_"+this.baocao.tenkybaocao+"_"+this.nambaocao,
                    fileext:".xls", // file extension
                    preserveColors:true

                });
            },
            getBieuMau(){
                let loader = this.$loading.show(this.LOADING_PARAM);              
                BaoCaoService.laybaocao(this.baocao.mabieumau, this.baocao.makybaocao, this.baocao.nambaocao).then(
            (res) =>{ 
    
                let data= res.data;    
                this.baocaos = data;
                    if(data.length>0){
                        this.baocao.tenkybaocao = data[0].tenKyBaoCao;                  
                        this.baocao.tenbieumau = data[0].tenBieuMau;            
                    }
                    if(data.length==1){                                
                        this.baocao.ketqua = JSON.parse(data[0].ketQua);                              
                    }
                    else {                      
                        var collectDataList = [];      
                        var respondDataList = data;
                        let unitProp = "Đơn vị";
                        for(var i = 0;i<respondDataList.length;i++){                            
                            let ketquaJsonString = respondDataList[i].ketQua;                            
                            let str = '{"'+unitProp+'":"'+respondDataList[i]['tenDonVi']+'"'; 
                            if(ketquaJsonString.length==0){
                                str += '}'
                            }
                            else{
                                str += ',';
                                str += ketquaJsonString.slice(1);
                            }                      
                            let ketquaJsonObj = JSON.parse(str);
                            collectDataList.push(ketquaJsonObj);
                        }
                        this.baocao.ketqua = collectDataList;
                        this.baocao.method += "_collect";
                    }
                   
                    this.jsontotable = new JsonToTable();
                    this.jsontotable.jsonToHtmlTable({
                            mode:this.baocao.method,
                            container:$("#templateContainer"),
                            data : this.baocao.ketqua,
                            tableCssClass : 'table table-bordered',
                            tableId : 'templateTable',
                            refreshPriod : 1000                            
                        });
                        $("input[type='number']" ).on( "focus", function(event ) {
                            let val = 0;
                            if(isNumber($(this).val())){
                                val = parseInt($(this).val());
                                if(val > 0){
                                    return;
                                }
                            }
                            $(this).val('');                        
                           
                        });
                        $("input[type='number']" ).on( "blur", function(event ) {                         
                           if(!isNumber($(this).val())){
                              $(this).val('0');      
                           }                           
                        });
                        $("input[type='number']" ).on( "change", this.inputOnChange);
                        loader.hide();
                   }) ;  
                   
            }
        },
        created(){
            this.baocao.mabieumau = this.$route.params.mabieumau
            this.baocao.mabaocao = this.$route.params.mabaocao
            this.baocao.makybaocao = this.$route.params.makybaocao
            this.baocao.nambaocao = this.$route.params.nambaocao
            this.baocao.method = this.$route.params.method            
            if(this.baocao.method.includes('view')){           
              this.isEdit = false;
            }
            this.getBieuMau()      
           
        },
    }
</script>
<style>
*:disabled {
  background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
}

tr td {
    width: 1%;
    white-space: nowrap;
}
</style>