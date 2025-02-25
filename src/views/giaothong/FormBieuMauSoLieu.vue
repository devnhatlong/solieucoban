<template>
    <div id="main" class="main">
        <div class="pagetitle">
            <h1>Biểu mẫu số liệu</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
                    <li class="breadcrumb-item">Giao thông</li>
                    <li class="breadcrumb-item active">Biểu mẫu số liệu</li>
                </ol>
            </nav>
        </div>
        <section class="section dashboard">
            <div class="card p-0 ">
                <div class="card-body">
                    <h5 class="card-title" v-if="isEdit">Nhập số liệu: {{baocao_bmsl.tenBieuMauSoLieu}}</h5>
                    <h5 class="card-title" v-else>Xem số liệu: {{baocao_bmsl.tenBieuMauSoLieu}} </h5>
                    <h6 class="text-muted ">Kỳ báo cáo: {{baocao_bmsl.tenKyBaoCao}} - Năm: {{baocao_bmsl.namBaoCao}}
                    </h6>
                </div>

            </div>
            <div v-html="legacySystemHTML"></div>
            <div class="mt-4" id="templateContainer"></div>
            <input type="button" class="btn btn-primary" value="Lưu" @click="luu_ket_qua_bao_cao"
                id="btnluu_ket_qua_bao_cao" v-show="isEdit">
            <input type="button" class="btn btn-secondary ms-1" value="Xuất Excel" @click="exportExcel">
            <button class="btn btn-info ms-1" @click="bntDanhSach_onclick"><i class="bi bi-arrow-return-left"></i> Về
                danh sách</button>
        </section>
    </div>
</template>
<script>
    import BieuMauSoLieuService from "../../services/bieumausolieu.service";
    export default {
        name: 'bieumausolieu.form',
        data() {
            return {
                //bieumau:{},
                jsontotable: null,
                baocao_bmsl: {
                    mabieumausolieu: 0,
                    mabaocaobieumausolieu: 0,
                    makybaocao: 0,
                    nambaocao: 0,
                    method: '',
                    noidung: '',
                    tenkybaocao: '',
                    tenbieumausolieu: '',
                },
                legacySystemHTML: '',
                formulas: [],
                baocao_bmsls: [],
                isEdit: true,
                method: '',
                timkiem_obj: {}
            }
        },
        created() {

            this.timkiem_obj.maBieuMauSoLieu = this.$route.params.mabieumausolieu;
            this.timkiem_obj.maBaoCaoBieuMauSoLieu = this.$route.params.mabaocaobieumausolieu;
            this.timkiem_obj.maKyBaoCao = this.$route.params.makybaocao;
            this.timkiem_obj.namBaoCao = this.$route.params.nambaocao;

            //this.baocao.method = this.$route.params.method
            this.method = this.$route.params.method;
            if (this.method.includes('view') || this.method.includes('collect')) {
                this.isEdit = false;
            }
            /* if(this.method.includes('collect')){
                 this.timkiem_obj.method = this.method;
             }*/
            this.timkiem_obj.method = this.method;
            this.get_data_from_server();

        },
        methods: {

            get_data_from_server() {

                let loader = this.$loading.show(this.LOADING_PARAM);
                BieuMauSoLieuService.laybaocaobieumausolieu(this.timkiem_obj).then(
                    (res) => {
                        loader.hide();
                        this.baocao_bmsls = res.data;

                        if (this.baocao_bmsls.length > 0) {
                            this.baocao_bmsl.tenKyBaoCao = this.baocao_bmsls[0].tenKyBaoCao;
                            this.baocao_bmsl.namBaoCao = this.baocao_bmsls[0].namBaoCao;
                            this.baocao_bmsl.tenBieuMauSoLieu = this.baocao_bmsls[0].tenBieuMauSoLieu;
                        }
                        if (this.baocao_bmsls.length == 1) {
                            this.baocao_bmsl.noiDung = this.baocao_bmsls[0].noiDung;
                        }
                        else {
                            var collectDataList = [];
                            var respondDataList = this.baocaos;
                            let unitProp = "Đơn vị";
                            /* for (var i = 0; i < respondDataList.length; i++) {
                                 let ketquaJsonString = respondDataList[i].ketQua;
                                 let str = '{"' + unitProp + '":"' + respondDataList[i]['tenDonVi'] + '"';
                                 if (ketquaJsonString.length == 0) {
                                     str += '}'
                                 }
                                 else {
                                     str += ',';
                                     str += ketquaJsonString.slice(1);
                                 }
                                 console.log(str);
                                 let ketquaJsonObj = JSON.parse(str);
                                 collectDataList.push(ketquaJsonObj);
                             }
                             this.baocao.ketqua = collectDataList;
                             this.baocao.method += "_collect";*/
                            console.log(this.baocao_bmsls);
                        }

                        /* this.jsontotable = new JsonToTable();
 
 
                         this.jsontotable.jsonToHtmlTable({
                             mode: this.baocao.method,
                             container: $("#templateContainer"),
                             data: this.baocao.ketqua,
                             tableCssClass: 'table table-bordered',
                             tableId: 'templateTable',
                             refreshPriod: 1000
                         });*/

                        this.load_template_table_by_HTML(this.baocao_bmsls[0]?.duongDan);


                    });

            },
            inputOnChange(event) {
                var my_array = event.target.id.split("_");
                let input_row_id, col_index;
                if (my_array.length == 0) {
                    return;
                }
                if (my_array.length == 2) {
                    input_row_id = my_array[0] + "_";
                    col_index = my_array[1];
                }
                if (my_array.length > 2) {
                    input_row_id = my_array[0] + "_" + my_array[1] + "_";
                    col_index = my_array[2];
                }

                let oldvalue = $("#" + event.target.id).val();
                let newvalue = Math.abs(parseInt(oldvalue));
                $("#" + event.target.id).val(newvalue);
                this.updateInputformulas(this.formulas, input_row_id);
                let row_length = this.baocao_bmsls.length;
                if (row_length > 1) {
                    let tr_template_object = $('table tbody').find('tr:first');
                    let sum_all_values = [];
                    for (let j = 0; j < tr_template_object.find('input').toArray().length; j++) {
                        sum_all_values.push(0);
                    }
                    $(':input[type="number"]').each(function () {

                        let my_array = this.id.split("_");
                        let row_index, col_index;
                        if (my_array.length > 1) {
                            row_index = parseInt(my_array[1]);
                            col_index = parseInt(my_array[2]);
                        }
                        if (row_index > row_length - 1) { return };
                        if (isIntegerNumber(this.value)) {
                            sum_all_values[col_index] += parseInt(this.value);
                        }
                    });

                    for (let i = 1; i <= sum_all_values.length; i++) {
                        $("#input_" + row_length + "_" + i).val(sum_all_values[i]);
                    }
                }
                // code tạm cho tài khoản tổng hợp 2024.07.14
                /* var arr_col_inputs = new Array(this.jsontotable.columns.length + 10);
                 for (var i = 0; i < arr_col_inputs.length; i++) {
                     arr_col_inputs[i] = 0;
 
                 }
                 
                 let row_length = this.baocao.ketqua.length;
                 $(':input[type="number"]').each(function (index) {
                     var input = $(this);
                     var arr_temp = input.attr('id').split("_");
                     let i = parseInt(arr_temp[2]);
                     let row_index = parseInt(arr_temp[1]);
                     if (row_index >= row_length - 1) { return };
                     if (isNumber(input.val()) == true) {
                         arr_col_inputs[i] += parseInt(input.val());
                     }
                 });
                 for (var i = 0; i < arr_col_inputs.length; i++) {
                     $("#input_" + row_length + "_" + i).val(arr_col_inputs[i]);
                 }*/
            },
            updateInputformulas(formulas, input_row_id) {

                if (!formulas) {
                    return;
                }
                for (var i = 0; i < formulas.length; i++) {
                    var fomular = formulas[i];
                    var myarrray1 = fomular.split("=");
                    var resultinputid = myarrray1[0];
                    var expression_template = myarrray1[1];//biểu thức        
                    var strexpression = "";
                    var arr_expression_template = expression_template.split(' ');
                    for (var j = 0; j < arr_expression_template.length; j++) {
                        if (isIntegerNumber(arr_expression_template[j])) {
                            strexpression += ($("#" + input_row_id + arr_expression_template[j]).val());

                        }
                        else {
                            strexpression += arr_expression_template[j];
                        }
                        if (j < arr_expression_template.length - 1) {
                            strexpression += ' ';
                        }
                    }
                    let express = infixToPostfix(strexpression);

                    let result = executePostfix(express);

                    $("#" + input_row_id + resultinputid).val(result);

                }


            },
            luu_ket_qua_bao_cao() {

                for (let i = 0; i < this.baocao_bmsls.length; i++) {
                    let result_array = this.collect_data(i);
                    this.baocao_bmsls[i].noiDung = JSON.stringify(result_array);
                }

                let loader = this.$loading.show(this.LOADING_PARAM);
                BieuMauSoLieuService.luubaocao(this.baocao_bmsls).then(
                    (res) => {
                        loader.hide();
                        if (res?.success) {
                            this.$swal.fire({
                                title: "Thông báo!",
                                text: "Lưu kết quả thành công",
                                icon: "success"
                            }).then
                                ((result) => {
                                    // this.$router.push({ name: 'giaothong.danhsachbieumausolieu' });
                                });
                        }
                        else {
                            this.$swal.fire({
                                title: "Thông báo!",
                                text: res ? res.message : "Lỗi máy chủ",
                                icon: "Error"
                            })

                        }
                    },
                    (error) => {
                        this.$swal.fire({
                            title: "Thông báo!",
                            text: "Lỗi!" + error.message,
                            icon: "Error"
                        })

                        loader.hide();
                    })
            },
            exportExcel() {

                $("#main-container").table2excel({
                    exclude: ".noExl",
                    name: "Worksheet Name",
                    filename: this.baocao.tenbieumau + "_" + this.baocao.tenkybaocao + "_" + this.nambaocao,
                    fileext: ".xls", // file extension
                    preserveColors: true

                });
            },
            bntDanhSach_onclick() {
                this.$router.push({ name: 'giaothong.danhsachbieumausolieu' });
            },
            load_result_to_template(result_string) {
                let result_array = JSON.parse(result_string);
                result_array.forEach(result_object => {
                    $('#' + result_object.id).val(result_object.value);
                });
                return result_array;
            },
            load_template_table_by_HTML(path_bieu_mau) {
                console.log(path_bieu_mau);
                let loader = this.$loading.show(this.LOADING_PARAM);
                fetch(path_bieu_mau, {
                    headers: {
                        'Content-Type': 'text/html',
                        'Accept': 'text/html'
                    }
                })
                    .then((res) => {
                        return res.text();
                    })
                    .then((data) => {
                        loader.hide();
                        this.legacySystemHTML = data;
                        const vm = this;
                        this.$nextTick(function () {
                            //load default data
                            if (this.baocao_bmsls.length == 1) {
                                if (this.baocao_bmsls[0]?.noiDung.length > 0) {
                                    this.load_result_to_template(this.baocao_bmsls[0]?.noiDung);
                                }
                            }
                            if (this.baocao_bmsls.length > 1) {
                                //get tr                              
                                let input_donvi_string = "<input class='text-start' id='input_0' type='text' disabled/>";
                                let input_stt_string = "<input class='text-center' id='stt_0' type='text' disabled/>";
                                $('table thead').find('tr:first').each(function () {
                                    $(this).find('th').eq(0).before('<th rowspan="5" >Đơn vị</th>');
                                    $(this).find('th').eq(0).before('<th rowspan="5" >STT</th>');
                                });
                                $('table tbody').find('tr:first').each(function () {
                                    $(this).find('td').eq(0).before('<td class="text-start" style="min-width:120px">' + input_donvi_string + '</td>');
                                    $(this).find('td').eq(0).before('<td class="text-center">' + input_stt_string + '</td>');
                                });
                                let tr_template_object = $('table tbody tr');
                                let sum_all_values = [];
                                for (let j = 0; j < tr_template_object.find('input').toArray().length; j++) {
                                    sum_all_values.push(0);
                                }

                                for (let i = 0; i <= this.baocao_bmsls.length; i++) {
                                    let tr_object = tr_template_object.clone();

                                    tr_object.find('input').toArray().forEach(td_new_object => {
                                        let old_id = td_new_object.id;
                                        let objstrings = old_id.split("_");
                                        let new_id = objstrings[0] + "_" + i + "_" + objstrings[1];
                                        let index_column_value = objstrings[1] - 1;
                                        td_new_object.setAttribute('id', new_id);
                                        if (!this.isEdit) {
                                            td_new_object.setAttribute('disabled', '');
                                        }
                                        if (i == this.baocao_bmsls.length) {
                                            td_new_object.setAttribute('disabled', '');
                                            if (old_id == "input_0") {
                                                td_new_object.setAttribute('value', "Tổng");
                                            }
                                            else if (old_id == "stt_0") {

                                            }
                                            else {
                                                td_new_object.setAttribute('value', sum_all_values[index_column_value]);
                                            }

                                            return true;
                                        }
                                        //set value for stt
                                        if (old_id == "stt_0") {
                                            td_new_object.setAttribute('value', i + 1);
                                            if (this.baocao_bmsls[i].noiDung.length == 0) {
                                                $(td_new_object).addClass("text-danger");
                                            }
                                            return true;
                                        }
                                        if (old_id == "input_0") {
                                            td_new_object.setAttribute('value', this.baocao_bmsls[i].tenDonVi);
                                            if (this.baocao_bmsls[i].noiDung.length == 0) {
                                                $(td_new_object).addClass("text-danger");
                                            }
                                            return true;
                                        }
                                        //set value for sum column                                       
                                        if (this.baocao_bmsls[i].noiDung.length > 0)//
                                        {
                                            let result_array = JSON.parse(this.baocao_bmsls[i].noiDung);
                                            for (let j = 0; j < result_array.length; j++) {
                                                if (result_array[j].id == old_id) {
                                                    td_new_object.setAttribute('value', result_array[j].value);
                                                    sum_all_values[j] += parseFloat(result_array[j].value);
                                                }
                                            };
                                        }

                                    });
                                    let tbody_object = $('table tbody');
                                    //console.log(tbody_object);
                                    tbody_object.append(tr_object);
                                    //this.load_result_to_template(this.baocaos[i]?.ketQua);
                                }

                                tr_template_object.remove();

                            }
                            
                            $('input[type=number]').on("focus", function (event) {
                                let val = 0;
                                if (isIntegerNumber($(this).val())) {
                                    val = parseInt($(this).val());
                                    if (val > 0) {
                                        return;
                                    }
                                }
                                $(this).val('');
                            });
                            $("input[type='number']").on("blur", function (event) {
                                if (!isIntegerNumber($(this).val())) {
                                    $(this).val('0');
                                }
                            });
                            $("input[type='number']").on("change", vm.inputOnChange);
                          
                            try{
                                let objs = JSON.parse($('#text-formulas').html());
                                objs.forEach(element => {
                                    vm.formulas.push(element.congthuc);
                                });
                            }
                                catch{}
                            

                        })

                    })
                    .catch((data) => {
                        this.legacySystemHTML = 'An error occured, please try again.'
                    })
            },
            collect_data(row_index) {

                let tr_objects = $('table tbody').find('tr').toArray()[row_index];
                console.log(tr_objects);
                let result_array = [];
                $(tr_objects).find('input').each(function (i) {

                    var my_array = this.id.split("_");
                    let new_id = '';
                    if (my_array.length == 0) {
                        return false;
                    }
                    if (my_array.length == 2) {
                        new_id = this.id;
                    }
                    if (my_array.length > 2) {
                        if (i == 0 || i == 1)//stt va tendonvi
                        {
                            return true;
                        }
                        new_id = my_array[0] + "_" + my_array[2];
                    }
                    let result_object = {};
                    result_object.id = new_id;
                    result_object.value = this.value;
                    result_array.push(result_object);
                });
                console.log(result_array);
                return result_array;

                /*if ($("#files" + text).val()) {
                    filesObj = $("#files" + text).val();
                }
                let filesObj = "";
                if ($("#files" + text).val()) {
                    filesObj = $("#files" + text).val();
                }
                var obj;
                if (type == "thamdinh") {
                    obj = {
                        "id": text.substring(1),
                        "giatri": tdSum.html(),
                        "ykien": $('#ykien' + text).html()
                    };
                }
                else {
                    obj = {
                        "id": text.substring(1),
                        "giatri": tdSum.html(),
                        "files": filesObj,
                        "giaitrinh": $('#giaitrinh' + text).html()
                    };
                }
                this.objsPost.push(obj);
                */

            },
        },

    }
</script>
<style>

</style>