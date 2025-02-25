<template>
    <div id="main" class="main">
        <div class="pagetitle">
            <h1>Gửi báo cáo</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
                    <li class="breadcrumb-item">Báo cáo</li>
                    <li class="breadcrumb-item active">Gửi báo cáo</li>
                </ol>
            </nav>
        </div>
        <section class="section">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title ">Gửi báo cáo {{lay_moc_hien_tai}}</h5>
                    <div class="row mb-3">
                        <div class="col-4">
                            <label>Chọn lĩnh vực, chuyên đề</label>
                            <select id="linhvucchuyende_select" v-model="maLinhVucChuyenDeBaoCaoSelected"
                                class="form-select" disabled>
                                <option v-for="linhvucchuyendebaocao in linhvucchuyendebaocaos"
                                    :value="linhvucchuyendebaocao.maLinhVucChuyenDeBaoCao"
                                    :key="linhvucchuyendebaocao.tenLinhVucChuyenDeBaoCao">
                                    {{linhvucchuyendebaocao.tenLinhVucChuyenDeBaoCao }}</option>
                            </select>
                        </div>
                        <div class="col-4">
                            <label>Chọn loại định kỳ</label>
                            <select id="loaikybaocaoselect" v-model="maLoaiKyBaoCaoSelected" class="form-select"
                                @change="laydanhsachbaocao">

                                <option v-for="loaikybaocao in loaikybaocaos" :value="loaikybaocao.maLoaiKyBaoCao"
                                    :key="loaikybaocao.maLoaiKyBaoCao">
                                    {{loaikybaocao.tenLoaiKyBaoCao }}</option>
                            </select>
                        </div>
                        <div class="col-4">
                            <label>Mốc báo cáo</label>
                            <div class="form-control">{{lay_moc_hien_tai}}</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <p>Nội dung báo cáo</p>
                        <textarea v-model="baocaodinhky_current.noiDung" class="form-control" rows="5">
                        </textarea>
                    </div>
                    <div class="row mb-3">
                        <div>
                            <span class="btn btn-secondary fileinput-button ">
                                <input type="text" id="muc_string" value="" hidden>
                                <i class="bi bi-plus-circle"></i> Chọn file đính kèm
                                <input type="file" class="chamdiem" name="files[]" multiple
                                    @change="on_change_file_input" id="input_files"/>
                            </span>
                            <div id="div_display_uploaded_files"></div>
                            <div id="div_display_prepare_files"></div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div>
                            <button class="btn btn-primary" @click="guibaocao_onclick" type="button"><i
                                    class="bi bi-upload"></i> Gửi báo cáo</button>
                        </div>

                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body">

                    <h5 class="card-title">Danh sách báo cáo của đơn vị</h5>
                    <div class="row mb-3">
                        <div class="col-3">
                            <label>Chọn năm</label>
                            <select class="form-select" v-model="namBaoCaoSelected" @change="laydanhsachbaocao">
                                <option v-for="nambaocao in nambaocaos" :key="nambaocao" :value="nambaocao">
                                    {{nambaocao}}</option>
                            </select>
                        </div>
                        <div class="col-2">
                            <label>Chọn tháng</label>
                            <select class="form-select" v-model="thangBaoCaoSelected" @change="laydanhsachbaocao">
                                <option v-for="thangbaocao in thangbaocaos" :key="thangbaocao" :value="thangbaocao">
                                    {{thangbaocao}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <table class="table  table-sm  table-striped text-center">
                                <thead>
                                    <tr>
                                        <th scope="col" width="3%" class="text-center">STT</th>
                                        <th scope="col" width="20%">Kỳ báo cáo</th>
                                        <th scope="col" width="20%">Mốc Thời gian</th>
                                        <th scope="col" width="30%" class="text-start">File đính kèm</th>
                                        <th scope="col" width="15%">Thời gian gửi</th>
                                        <th scope="col" width="10%">Nội dung</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr :key="index" v-for="(baocaodinhky,index) in baocaodinhkys"
                                        :class="baocaodinhky.laKyBaoCaoHienTai?'table-primary':''">
                                        <td>{{index+1}}</td>
                                        <td>{{baocaodinhky.tenKyBaoCao}}</td>
                                        <td>{{baocaodinhky.ngayBatDau}} - {{baocaodinhky.ngayKetThuc}}</td>
                                        <td class="text-start">
                                            <div :key="idx" v-for="(fileinfo,idx) in baocaodinhky.files">
                                                <a :href="fileinfo.path" target='_blank'>{{idx+1}}.{{fileinfo.name}}</a>
                                            </div>
                                        </td>
                                        <td>
                                            {{baocaodinhky.thoiGianGui}}
                                        </td>
                                        <td>
                                            <button v-show="(baocaodinhky.maBaoCao>0)"
                                                class="btn btn-default btn-sm p-0 m-0"
                                                @click="xemnoidung_onclick(baocaodinhky)"><i
                                                    class="bi bi-eye"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="myModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Nội dung báo cáo</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div class="modal-body">
                            <textarea id="div_noidungbaocao_modal" class="form-control" rows="10" readonly>

                            </textarea>
                        </div>

                        <div class="modal-body text-left">
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>
<script>

    import BaoCaoService from "../../services/baocao.service";
    import AuthService from "../../services/auth.service";
    export default {
        name: 'productForm',

        data() {
            return {
                loaikybaocaos: [],
                baocaodinhkys: [],
                nambaocaos: [],
                thangbaocaos: [],
                maLoaiKyBaoCaoSelected: 0,
                namBaoCaoSelected: 2024,
                thangBaoCaoSelected: 1,
                ngaybaocao: '',
                files_prepare_upload: [],
                files_uploaded: [],
                baocaodinhky_current: {},
                baocaodinhky_select: {},
                linhvucchuyendebaocaos: [],
                maLinhVucChuyenDeBaoCaoSelected: 0,
            }
        },
        created() {
            window.scrollTo(0, 0);
            if (this.$route.params.maloaikybaocao) {
                this.maLoaiKyBaoCaoSelected = this.$route.params.maloaikybaocao;
            }
            this.laydulieubandau();

        },
        methods: {         
            laydulieubandau() {
                let loader = this.$loading.show(this.LOADING_PARAM);
                BaoCaoService.laydulieubandau().then(
                    (res) => {
                        loader.hide();
                        try {
                            this.loaikybaocaos = res.data.loaiKyBaoCaos;
                            if (this.loaikybaocaos.length > 0) {
                                if(this.maLoaiKyBaoCaoSelected==0){
                                    this.maLoaiKyBaoCaoSelected = this.loaikybaocaos[0].maLoaiKyBaoCao;
                                }
                            }
                            this.linhvucchuyendebaocaos = res.data.linhVucChuyenDeBaoCaos;
                            if (this.linhvucchuyendebaocaos.length > 0) {
                                this.maLinhVucChuyenDeBaoCaoSelected = this.linhvucchuyendebaocaos[0].maLinhVucChuyenDeBaoCao;
                            }
                            let namBaoCaoHienTai = res.data.namHienTai;
                            this.ngaybaocao = res.data.ngayHienTai;
                            this.nambaocaos = [namBaoCaoHienTai - 1, namBaoCaoHienTai, namBaoCaoHienTai + 1, namBaoCaoHienTai + 2]
                            for (let imonth = 1; imonth <= 12; imonth++) {
                                this.thangbaocaos.push(imonth);
                            }
                            let currentdate = moment(this.ngaybaocao, DEFAULT_DATE_FORMAT);

                            this.namBaoCaoSelected = currentdate.year();
                            this.thangBaoCaoSelected = currentdate.month() + 1;
                            this.laydanhsachbaocao();
                        }
                        catch {
                        }
                    },
                    (error) => {
                        loader.hide();
                        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                        this.$swal.fire(message, '', 'error');
                    }

                )
            },
            laydanhsachbaocao() {
                let loader = this.$loading.show(this.LOADING_PARAM);
                BaoCaoService.laydanhsachbaocao(this.maLinhVucChuyenDeBaoCaoSelected, this.maLoaiKyBaoCaoSelected, this.namBaoCaoSelected, this.thangBaoCaoSelected).then(
                    (res) => {
                        if (res.success) {
                            this.baocaodinhky_current = null;
                            this.baocaodinhkys = res.data;
                            let ngayhientai_moment = moment(this.ngaybaocao, DEFAULT_DATE_FORMAT);
                            this.baocaodinhkys.forEach(baocaodinhky_item => {
                                let ngaybatdau_moment = moment(baocaodinhky_item.ngayBatDau, DEFAULT_DATE_FORMAT);
                                let ngayketthuc_moment = moment(baocaodinhky_item.ngayKetThuc, DEFAULT_DATE_FORMAT);
                                baocaodinhky_item.laKyBaoCaoHienTai = false;
                                if (ngayhientai_moment >= ngaybatdau_moment && ngayhientai_moment <= ngayketthuc_moment) {
                                    baocaodinhky_item.laKyBaoCaoHienTai = true;
                                    this.baocaodinhky_current = baocaodinhky_item;
                                    this.baocaodinhky_current.namBaoCao = ngayketthuc_moment.year();
                                    console.log(this.baocaodinhky_current);
                                }

                                if (baocaodinhky_item.tepDinhKem.length > 0) {
                                    let fileObjs = JSON.parse(baocaodinhky_item.tepDinhKem);
                                    for (var j = 0; j < fileObjs.length; j++) {
                                        fileObjs[j].path = process.env.VUE_APP_ROOT_API + "baocao/download/" + encodeURIComponent(fileObjs[j].path);
                                    }
                                    baocaodinhky_item.files = fileObjs;
                                }
                            });
                            if (this.baocaodinhky_current == null) {
                                this.baocaodinhky_current = (this.baocaodinhkys.length > 0) ? this.baocaodinhkys[0] : {};
                            }
                            let list_download = [];
                            if (this.baocaodinhky_current.tepDinhKem.length > 0) {
                                list_download = JSON.parse(this.baocaodinhky_current.tepDinhKem);
                            }
                            this.files_uploaded = [];
                            for (let i = 0, f; f = list_download[i]; i++) {
                                if (this.findIndexIfExist(this.files_uploaded, f.name) < 0) {
                                    this.files_uploaded.push(f);
                                }
                            }
                            this.load_list_file_to_form();
                        }
                        else {
                            this.$swal.fire(res.message, '', 'error');
                        }
                        loader.hide();
                    },
                    (error) => {
                        loader.hide();
                        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                    });
            },
            on_change_file_input(event) {
                var files = event.target.files;
                for (let i = 0, f; f = files[i]; i++) {
                    if (this.findIndexIfExist(this.files_prepare_upload, f.name) < 0) {
                        let sFileName = f.name;
                        var blnValid = false;
                        for (var j = 0; j < VALID_FILE_EXTENSIONS.length; j++) {
                            var sCurExtension = VALID_FILE_EXTENSIONS[j];
                            if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                                blnValid = true;
                                break;
                            }
                        }
                        if (!blnValid) {
                            this.$swal.fire({ title: "Thông báo!", text: "Hệ thống chỉ cho phép gửi tệp ." + VALID_FILE_EXTENSIONS.join(", "), icon: "warning" });
                            //alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + VALID_FILE_EXTENSIONS.join(", "));
                            event.target.value = ''
                            return false;
                        }
                        this.files_prepare_upload.push(f);
                    }
                }
                $('input[type=file]').val('');
                var output = [];
                for (let i = 0, f; f = this.files_prepare_upload[i]; i++) {
                    output.push('<div class="alert alert-secondary alert-dismissible fade show  border-0 p-1 m-2" style="width: fit-content;">', f.name,
                        '<i class="bi bi-x-circle close-prepare text-secondary " style="cursor: pointer; position: absolute;top: -10px;right: -10px; border:1px; border-radius:50%" data-bs-dismiss="alert" aria-label="Close" text-value="', f.name, '"></i></div>');
                }
                $("#div_display_prepare_files").html(output.join(''));
                const vm = this;
                $('button.close-prepare').click(function (evt) {
                    let file_name_compare = $(this).attr("text-value");
                    for (let i = 0; i < vm.files_prepare_upload.length; i++) {
                        if (file_name_compare.localeCompare(vm.files_prepare_upload[i].name) == 0) {
                            vm.files_prepare_upload.splice(i, 1);
                            break;
                        }
                    }
                })

            },
            xemnoidung_onclick(baocaodinhky_obj) {               
                $("#div_noidungbaocao_modal").html(baocaodinhky_obj.noiDung);
                $("#myModal").modal('show');
            },
            guibaocao_onclick() {
                
                this.baocaodinhky_current.tepDinhKem = JSON.stringify(this.files_uploaded);

                let loader = this.$loading.show(this.LOADING_PARAM);
                BaoCaoService.guibaocao(this.baocaodinhky_current, this.files_prepare_upload).then(
                    (res) => {
                        loader.hide();
                        if (res.success) {

                            this.$swal.fire({
                                title: "Thông báo",
                                text: "Gửi báo cáo thành công.",
                                icon: "success"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    this.laydanhsachbaocao();
                                }
                            });
                        }
                        else {
                            this.$swal.fire({ title: "Thông báo!", text: res.message, icon: "warning" });
                        }
                    },
                    (error) => {
                        console.log(
                            (error.response && error.response.data && error.response.data.message) || error.message || error.toString());
                        loader.hide()
                    }
                );
            },

            load_list_file_to_form() {
                $("#div_display_prepare_files").html('');
                $("#div_display_uploaded_files").html('');
                var output = [];
                for (var i = 0; i < this.files_uploaded.length; i++) {
                    let pathfiledownload = process.env.VUE_APP_ROOT_API + "baocao/download/" + encodeURIComponent(this.files_uploaded[i].path);
                    var iframestring = "<a href='" + pathfiledownload + "' target='_blank'>" + this.files_uploaded[i].name + "</a>";
                    output.push('<div class="alert alert-primary alert-dismissible fade show w-75 border-0 p-1 m-2">', iframestring,
                        '<button type="button" class="btn-close close-updated p-1" data-bs-dismiss="alert" aria-label="Close" text-value="', this.files_uploaded[i].name, '">',
                        '</button>',
                        '</div>');
                    $("#div_display_uploaded_files").html(output.join(''));
                    const vm = this;
                    $('button.close-updated').click(function (evt) {
                        let file_name_compare = $(this).attr("text-value");
                        for (let i = 0; i < vm.files_uploaded.length; i++) {
                            if (file_name_compare.localeCompare(vm.files_uploaded[i].name) == 0) {
                                vm.files_uploaded.splice(i, 1);
                                break;
                            }
                        }
                    });
                    $("#div_display_prepare_files").html('');
                    this.files_prepare_upload = [];
                }
            },

            upload_file_to_server() {
                let loader = this.$loading.show(this.LOADING_PARAM);
                VuViecService.guibaocao(this.files_prepare_upload).then(
                    (res) => {
                        loader.hide();
                        if (res.success) {
                            for (let i = 0, f; f = res.data[i]; i++) {
                                if (this.findIndexIfExist(this.files_uploaded, f.name) < 0) {
                                    this.files_uploaded.push(f);
                                }
                            }
                            this.load_list_file_to_form();
                        }
                    },
                    (error) => {
                        alert(`something went wrong: ${error}`);
                    });

            },
            findIndexIfExist(array_files, file_name) {
                for (let i = 0; i < array_files.length; i++) {
                    if (array_files[i].name.localeCompare(file_name) == 0) {
                        return i;
                    }
                }
                return -1;
            }
        },
       
        computed: {
            get_current_user() {
                return this.$store.getters['auth/current_user'];
            },
            la_ky_bao_cao_hien_tai() {
                let ngayhientai_moment = moment(this.ngaybaocao, DEFAULT_DATE_FORMAT);
                let ngaybatdau_moment = moment(this.baocaodinhky_current.ngayBatDau, DEFAULT_DATE_FORMAT);
                let ngayketthuc_moment = moment(this.baocaodinhky_current.ngayKetThuc, DEFAULT_DATE_FORMAT);
                let b = ngayhientai_moment >= ngaybatdau_moment && ngayhientai_moment <= ngayketthuc_moment;
                return b;
            },
            lay_moc_hien_tai() {
                if (this.maLoaiKyBaoCaoSelected == 1) {//bcao ngay
                    return this.ngaybaocao;
                }
                else if (this.maLoaiKyBaoCaoSelected >= 1 && this.maLoaiKyBaoCaoSelected <= 5) {
                    return this.baocaodinhky_current.tenKyBaoCao + ", từ " + this.baocaodinhky_current.ngayBatDau + " đến " + this.baocaodinhky_current.ngayKetThuc;
                }
                else {
                    return "";
                }
            },
        }
    }
</script>