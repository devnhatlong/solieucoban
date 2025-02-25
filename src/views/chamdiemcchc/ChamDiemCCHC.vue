<template>
    <main id="main" class="main">
        <div class="pagetitle">
            <h1 v-if="viewmode=='chamdiem'">Tự đánh giá</h1>
            <h1 v-if="viewmode=='thamdinh'">
                <div class="row">
                    <div class="col-6">Thẩm định </div>
                    <div class="col-6 text-end fs-6">Đơn vị: {{donvi.tenDayDu}}</div>
                </div>
            </h1>
            <h1 v-if="viewmode=='xemchitiet'">
                <div class="row">
                    <div class="col-6">Xem Kết quả </div>
                    <div class="col-6 text-end fs-6">Đơn vị: {{donvi.tenDayDu}}</div>
                </div>
            </h1>

            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
                    <li class="breadcrumb-item">Chấm điểm CCHC</li>
                    <li class="breadcrumb-item active">Tự đánh giá</li>
                </ol>
            </nav>
        </div>
        <section class="section dashboard">
            <div class="row">

                <div class="col-xxl-12">
                    <div class="card info-card customers-card">
                        <div class="card-body text-center">
                            <h5 class="card-title ">{{botieuchi.tenBoTieuChi}}
                                <br />
                                <span class="text-muted w-50 mx-auto mb-3">
                                    {{botieuchi.mota}}
                                </span>
                            </h5>
                            <div class="small text-start">
                                <div><a href="#" class="text-black" @click="toggle_all_object"><img src='/svg/minus.svg'
                                            class='svg-icon'> Đóng/mở tất cả các mục</a></div>

                            </div>
                            <div v-html="legacySystemHTML"></div>

                            <div class="p-2 " v-show="(viewmode=='chamdiem'||viewmode=='thamdinh')">
                                <input type="button" class="btn btn-primary" value="Lưu kết quả" @click="luuchamdiem"
                                    id="luuchamdiem">
                            </div>
                            <!-- Modal -->


                            <div class="modal fade" id="myModal" tabindex="-1">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Chọn tài liệu cần tải lên</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close">

                                            </button>
                                        </div>
                                        <div class="modal-body text-left">
                                            <div id="modal_listfile" class="text-left"></div>
                                        </div>
                                        <div class="modal-footer">
                                            <span class="btn btn-success fileinput-button">
                                                <input type="text" id="muc_string" value="" hidden>
                                                <i class="bi bi-plus-circle"></i> Thêm file
                                                <input type="file" class="chamdiem" name="files[]"
                                                    @change="choosefile_onchange" multiple
                                                    @click="choosefile_onclick" />
                                            </span>
                                            <button class="btn btn-primary" @click="uploadbutton_onclick"><i
                                                    class="bi bi-arrow-bar-up"></i> Tải
                                                lên</button>
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Close</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script>
    import BaoCaoService from "../../services/baocao.service";
    import Swal from 'sweetalert2';
    import AuthService from "../../services/auth.service";

    export default {
        name: 'cchcview',
        props: {
            mode: String,
            madonvicanthamdinh: String
        },
        data() {
            return {
                legacySystemHTML: '',
                objsPost: [],
                ketquadanhgia: {},
                donvi: {},
                botieuchi: {},
                viewmode: "chamdiem",
                files_prepare_upload: []
            }
        },
        created() {
            
            if (this.mode == null) {
                this.viewmode = "chamdiem";
            }
            else {
                this.viewmode = this.mode;
            }
            this.getKetQuaDanhGiaOnServer();
        },
        methods: {
            getKetQuaDanhGiaOnServer() {
                let loader = this.$loading.show(this.LOADING_PARAM);
                let madonvi_param = this.madonvicanthamdinh;
                if (this.viewmode == "chamdiem") {
                    madonvi_param = this.get_current_user.maDonVi;
                }
                BaoCaoService.getketquadanhgia(madonvi_param, this.viewmode).then((res) => {
                    loader.hide();
                    if (res.success) {
                        try {
                            this.ketquadanhgia = res.data;
                            this.botieuchi = this.ketquadanhgia.boTieuChi;
                            this.donvi = this.ketquadanhgia.donVi;
                            this.loadFormBoTieuChi();
                        }
                        catch { }
                    }
                    else {
                        this.$swal.fire({ title: "Thông báo!", text: res.message, icon: "error" })
                            .then((result) => {
                                this.$router.push('/home');
                            });
                    }

                },
                    (error) => {
                        this.$swal.fire({ title: "Thông báo!", text: (error.response && error.response.data && error.response.data.message) || error.message || error.toString(), icon: "error" })
                            .then((result) => {
                                this.$router.push('/home');
                            });
                        loader.hide()
                    });
                /* if (this.viewmode == "thamdinh") {
                     BaoCaoService.getketquadanhgia(this.madonvicanthamdinh, this.viewmode).then((res) => {
                         loader.hide();
                         try {
                             this.ketquadanhgia = res.data;
                             this.botieuchi = this.ketquadanhgia.boTieuChi;
                             this.donvi = this.ketquadanhgia.donVi;
                             this.loadFormBoTieuChi();
                         }
                         catch { }
                     },
                         (error) => {
                             console.log((error.response && error.response.data && error.response.data.message) || error.message || error.toString()); loader.hide()
                         });
                 }
                 else if (this.viewmode == "chamdiem") {
                     BaoCaoService.getketquadanhgia().then((res) => {
                         loader.hide();
                         if (res.success) {
                             try {
                                 this.ketquadanhgia = res.data;
                                 this.botieuchi = this.ketquadanhgia.boTieuChi;
                                 this.donvi = this.ketquadanhgia.donVi;
                                 console.log(this.ketquadanhgia);
                                 this.loadFormBoTieuChi();
                             }
                             catch { }
                         }
                         else {
 
 
                             this.$swal.fire({ title: "Thông báo!", text: res.message, icon: "error" })
                                 .then((result) => {
                                     this.$router.push('/home');
                                 });
 
 
                         };
 
 
                     },
                         (error) => {
                             console.log((error.response && error.response.data && error.response.data.message) || error.message || error.toString()); loader.hide()
                         });
                 }
                 else if (this.viewmode == "xemchitiet") {
                     BaoCaoService.laybotieuchithamdinh(this.madonvicanthamdinh, this.viewmode).then((res) => {
                         loader.hide();
                         try {
                             this.ketquadanhgia = res.data;
                             this.botieuchi = this.ketquadanhgia.boTieuChi;
                             this.donvi = this.ketquadanhgia.donVi;
                             this.loadFormBoTieuChi();
                         }
                         catch { }
                     },
                         (error) => {
                             console.log((error.response && error.response.data && error.response.data.message) || error.message || error.toString()); loader.hide()
                         });
                 }
                 else {
                     loader.hide();
                 }
                 */
            },
            loadFormBoTieuChi() {
                let loader = this.$loading.show(this.LOADING_PARAM);
                fetch(this.botieuchi.duongDan, {
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
                        this.$nextTick(function () {

                            //load default data
                            if (this.ketquadanhgia.ketQuaTuDanhGia.length > 0) {
                                this.objsPost = JSON.parse(this.ketquadanhgia.ketQuaTuDanhGia);
                                this.load_ketquadanhgia_to_form(this.objsPost, "chamdiem");
                            }
                            if (this.ketquadanhgia.ketQuaThamDinh.length > 0) {
                                this.objsPost = JSON.parse(this.ketquadanhgia.ketQuaThamDinh);
                                this.load_ketquadanhgia_to_form(this.objsPost, "thamdinh");  
                            }
                            const vm = this;
                            $('input[type=radio]').on("click", function (event) {
                                vm.calculate_value("", 0, "chamdiem");
                            });
                            $('input[type=radio].thamdinh').on("click", function (event) {
                                vm.calculate_value("", 0, "thamdinh");
                            });
                            //show prompt giai trinh
                            $('button.giaitrinh').on("click", function (event) {
                                Swal.fire({
                                    input: "textarea",
                                    inputLabel: "Giải trình",
                                    inputPlaceholder: "Nhập nội dung giải trình",
                                    inputAttributes: {
                                        "aria-label": "Nhập nội dung giải trình"
                                    },
                                    showCancelButton: true
                                }).then((result) => {
                                    var target = $(event.currentTarget).parent();
                                    target.find("div").html(result.value);
                                });

                            });
                            $('button.thamdinh').on("click", function (event) {
                                Swal.fire({
                                    input: "textarea",
                                    inputLabel: "Ý kiến thẩm định",
                                    inputPlaceholder: "Nhập ý kiến thẩm định",
                                    inputAttributes: {
                                        "aria-label": "Nhập ý kiến thẩm định"
                                    },
                                    showCancelButton: true
                                }).then((result) => {
                                    var target = $(event.currentTarget).parent();
                                    target.find("div").html(result.value);
                                });
                            });
                        
                            $('button.upload').click(function () {
                                //get mục  
                                var muc_string = (this.id).replace('upload_', '');
                                $('#muc_string').val(muc_string);
                                $('#modal_listfile').html("");
                                $("#myModal").modal('show');

                                $('input[type=file]').val('');
                                vm.files_prepare_upload = [];
                            });

                            $('tr.header2').click(function () {
                                vm.on_fade_object($(this));
                            });
                            $('tbody.header2').find("tr").click(function () {
                                vm.on_fade_object($(this));
                            });
                            $('tbody.header1').find("tr").click(function () {
                                vm.on_fade_object($(this));
                            });
                            //show/hide thamdinh
                            if (this.viewmode == 'thamdinh') {
                                $('.thamdinh').prop('disabled', false);
                                $('button.thamdinh').prop('hidden', false);
                                $('.chamdiem').prop('disabled', true);
                                $('button.chamdiem').prop('hidden', true);
                            }
                            else if (this.viewmode == 'chamdiem') {
                                $('.chamdiem').prop('disabled', false);
                                $('.thamdinh').prop('disabled', true);
                                $('button.thamdinh').prop('hidden', true);
                                $('button.chamdiem').prop('hidden', false);
                            }
                            else {
                                $('.chamdiem').prop('disabled', true);
                                $('.thamdinh').prop('disabled', true);
                                $('button.chamdiem').prop('hidden', true);
                                $('button.thamdinh').prop('hidden', true);
                            };
                        })
                    
                    })
                    .catch((data) => {
                        this.legacySystemHTML = 'An error occured, please try again.'
                    })
            },
            load_ketquadanhgia_to_form(obj, type) {
                for (let i = 0; i < obj.length; i++) {
                    let text = obj[i].id;
                    let tbody = $('#tbody_' + text);
                    let radios = tbody.find('input[type="radio"].' + type);
                    if (radios.length > 0) {
                        radios.each(function () {
                            this.checked = (this.value == obj[i].giatri);
                        });
                    }
                    if (type == "thamdinh") {
                        $('#ykien_' + text).html(obj[i].ykien);
                    }
                    else {
                        $('#giaitrinh_' + text).html(obj[i].giaitrinh);
                        var listdownloads = [];
                        if (obj[i].files) {
                            listdownloads = JSON.parse(obj[i].files);

                            $("#file_" + text).html(this.convertDownloadInfoToHTMLString(listdownloads, text.substring(1)));
                            console.log(text);
                            $("#files_" + text).val(obj[i].files);
                            const vm = this;
                            $('button.close_uploaded').click(function (evt) {
                                vm.close_uploaded_onClick($(this));
                            })
                        }
                    }
                }
                this.calculate_value("", 0, type);

            },
            collect_data(text, level, type) {
                if (level > LEVEL_MAX) { return };
                let i = 1;
                let tdSum = $('#td_' + type + text);
                if (level == 3 && tdSum.html()) {
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
                }
                do {
                    this.collect_data(text + "_" + i, level + 1, type);
                    i++;
                } while (i <= STEP_MAX)
            },
            calculate_value(text = "", level = 0, type) {
                let tdObj = '#td' + "_" + type;
                let tbody = $('#tbody' + text);
                let radios = tbody.find('input[type="radio"].' + type);
                if (radios.length > 0) {
                    radios.each(function () {
                        if (this.checked) {
                            $(tdObj + text).html(this.value);

                        }
                    });
                    return;
                }
                else {
                    if (level >= LEVEL_MAX) { return };
                    let i = 1;
                    let tdSum = $(tdObj + text);

                    tdSum.html(0);
                    do {
                        this.calculate_value(text + "_" + i, level + 1, type);

                        if (!tdSum.html() || !$(tdObj + text + "_" + i).html()) {

                        }
                        else {
                            let sum = parseFloat(tdSum.html()) + parseFloat($(tdObj + text + "_" + i).html());
                            //console.log(tdSum, sum);
                            tdSum.html(sum);
                        }
                        i++;
                    } while (i <= STEP_MAX)
                }
            },

            luuchamdiem() {
                this.objsPost = [];
                this.collect_data("", 0, this.viewmode);
                let ketquadanhgiaObj = {};
                ketquadanhgiaObj.maKetQuaDanhGia = "" + this.ketquadanhgia.maKetQuaDanhGia;
                ketquadanhgiaObj.maBoTieuChi = "" + this.botieuchi.maBoTieuChi;
                if (this.viewmode == 'thamdinh') {
                    ketquadanhgiaObj.ketQuaThamdinh = JSON.stringify(this.objsPost);
                    ketquadanhgiaObj.diemThamDinh = $('#td_thamdinh').html();
                }
                else {
                    ketquadanhgiaObj.ketQuaTuDanhGia = JSON.stringify(this.objsPost);
                    ketquadanhgiaObj.diemTuDanhGia = $('#td_chamdiem').html();
                }
                let loader = this.$loading.show(this.LOADING_PARAM);
                BaoCaoService.luuchamdiem(ketquadanhgiaObj).then(
                    (res) => {
                        loader.hide();
                        if (res.success) {
                            this.$swal.fire({ title: "Thông báo!", text: "Lưu kết quả thành công", icon: "success" });
                        }
                        else {
                            this.$swal.fire({ title: "Thông báo!", text: res.message, icon: "error" });
                        }
                    });
            },
            findIndexIfExist(file) {

                for (let i = 0; i < this.files_prepare_upload.length; i++) {

                    if (this.files_prepare_upload[i].name.localeCompare(file.name) == 0) {
                        return i;
                    }

                }

                return -1;
            },

            on_fade_object(target) {
                let is_collapse = ($(target).find('img').attr("src") == '/svg/minus.svg');
                let obj = $(target);
                if (obj.prop("tagName") != "tr") {
                    obj = obj.parent();
                }

                this.fade_object(obj, is_collapse);
            },

            fade_object(obj, is_collapse) {//type{in:1; out:0)
                let img_object = obj.find('img');

                let class_next_until = 'tbody';
                if (obj.attr('class')) {
                    class_next_until += "." + obj.attr('class');
                }
                else {
                    obj = obj.find('tr.header2');
                    class_next_until = 'tbody';
                }

                console.log(obj, class_next_until);
                if (is_collapse) {

                    obj.nextUntil(class_next_until).hide(100, function () {
                        img_object.attr("src", '/svg/plus.svg');
                    });
                }
                else {

                    obj.nextUntil(class_next_until).show(100, function () {
                        img_object.attr("src", '/svg/minus.svg');
                    });
                }
            },
            toggle_all_object(event) {
                let img_object = $(event.target);
                console.log(img_object);
                let is_collapse = (img_object.attr("src") == '/svg/minus.svg');

                $('tbody.header1').toArray().forEach(element => {
                    this.fade_object($(element), is_collapse);
                });

                if (is_collapse) {
                    img_object.attr("src", '/svg/plus.svg');
                }
                else {
                    img_object.attr("src", '/svg/minus.svg');
                }
                event.preventDefault();
            },
            choosefile_onchange(event) {
                var files = event.target.files;
                var output = [];
                for (let i = 0, f; f = files[i]; i++) {
                    if (this.findIndexIfExist(f) < 0) {
                        this.files_prepare_upload.push(f);
                    }
                }
                for (let i = 0, f; f = this.files_prepare_upload[i]; i++) {
                    output.push('<div id="div_file_prepare_', i, '" class="alert alert-primary alert-dismissible fade show w-75 border-0 p-1 m-2" role="alert">', f.name,
                        '<button type="button" class="btn-close close_prepare p-1" data-dismiss="alert" aria-label="Close" text-value="', f.name, '" parent-id-value="div_file_prepare_', i, '">',
                        '</button>',
                        '</div>');
                }

                $("#modal_listfile").html(output.join(''));

                $('input[type=file]').val('');
                const vm = this;
                $('button.close_prepare').click(function (evt) {
                    let parent_id_value = $(this).attr("parent-id-value");
                    let filenameCompare = $(this).attr("text-value");
                    console.log(filenameCompare, parent_id_value);
                    for (let i = 0; i < vm.files_prepare_upload.length; i++) {

                        if (filenameCompare.localeCompare(vm.files_prepare_upload[i].name) == 0) {
                            vm.files_prepare_upload.splice(i, 1);
                            $("#" + parent_id_value).remove();
                            break;
                        }
                    }

                }

                );
                return output;
            },
            uploadbutton_onclick() {
                let mabotieuchi = this.botieuchi.maBoTieuChi;
                let muc_string = $('#muc_string').val();
                var uploadInfo = { "mabotieuchi": mabotieuchi, "muc": muc_string };
                let loader = this.$loading.show(this.LOADING_PARAM);
                $("#myModal").modal('hide');
                BaoCaoService.uploadfiles(this.files_prepare_upload, uploadInfo).then(
                    (res) => {
                        if (res.success) {
                            var listdownload = res.data;
                            if (listdownload && listdownload.length) {
                                let current_files_object = [];
                                if ($("#files_" + muc_string).val().length > 0) {
                                    current_files_object = JSON.parse($("#files_" + muc_string).val());
                                    if (!current_files_object || !current_files_object.length) {
                                        current_files_object = [];
                                    }
                                }

                                for (let ii = 0; ii < listdownload.length; ii++) {
                                    current_files_object.push(listdownload[ii]);
                                }
                                console.log(current_files_object);
                                let new_html_file_string = this.convertDownloadInfoToHTMLString(current_files_object, muc_string);
                                $("#file_" + muc_string).html(new_html_file_string);
                                $("#files_" + muc_string).val(JSON.stringify(current_files_object));
                                const vm = this;
                                $('button.close_uploaded').click(function (evt) {
                                    vm.close_uploaded_onClick($(this));
                                })
                                this.$swal.fire({ title: "Thông báo!", text: "Tải file thành công", icon: "success" });

                            }


                        }
                        loader.hide();

                    },
                    (error) => {
                        alert(`something went wrong: ${error}`);
                    });
            },
            close_uploaded_onClick(target) {

                let parent_id_value = target.attr("parent-id-value");
                let file_name_compare = target.attr("text-value");
                let index_value = target.attr("index-value");
                let list_files_json_string = $("#files_" + index_value).val();
                let list_files_json_object = JSON.parse(list_files_json_string);
                //remove json object
                if (list_files_json_object) {

                    for (let i = 0; i < list_files_json_object.length; i++) {

                        if (file_name_compare.localeCompare(list_files_json_object[i].filename) == 0) {
                            list_files_json_object.splice(i, 1);

                            $("#files_" + index_value).val(JSON.stringify(list_files_json_object));
                            $("#" + parent_id_value).remove();
                            break;
                        }
                    }
                }
            },
            convertDownloadInfoToHTMLString(listdownload, muc_string) {
                let output = [];
                for (let i = 0; i < listdownload.length; i++) {
                    let pathfiledownload = process.env.VUE_APP_ROOT_API + "upload/" + encodeURIComponent(listdownload[i].pathFile);
                    let iframeFileString = "<a href='" + pathfiledownload + "' target='_blank' style='font-size:0.9rem'>" + listdownload[i].filename + "</a>";
                    let parent_id_value = 'div_' + muc_string + '_file_uploaded_' + i;

                    output.push('<div id="', parent_id_value, '" class="alert alert-success alert-dismissible fade show border-0 p-1 m-2 " role="alert">', iframeFileString,
                        '<button type="button" class="btn-close close_uploaded p-1" data-dismiss="alert" index-value="', muc_string,
                        '" text-value="', listdownload[i].filename,
                        '" parent-id-value="', parent_id_value, '" aria-label="Close">',
                        '</button></div>');
                }
                return output.join('');
            }

        },
        computed: {
            is_CAT_User() {
                return this.$store.getters['auth/is_CAT_User'];
            },
            get_current_user() {
                return this.$store.getters['auth/current_user'];
            }
        },
    }
</script>