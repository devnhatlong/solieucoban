<template>
    <div id="main" class="main">
        <div class="pagetitle">
            <h1>Văn bản triển khai</h1>
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
                <li class="breadcrumb-item">Văn bản triển khai</li>
                <li class="breadcrumb-item active">Thêm văn bản</li>
              </ol>
            </nav>
          </div>
        <section class="section">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Nhập văn bản triển khai
                    </h5>
                    <form id="form_nhapvanban">
                        <div class="row mb-3">

                            <label for="inputPassword" class="col-sm-3 ">Số văn bản</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" v-model="vanban.sovanban" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputPassword" class="col-sm-3">Ngày văn bản</label>
                            <div class="col-sm-9">
                                <input type="date" class="form-control" v-model="vanban.ngayvanban"
                                    id="txtngayvanban" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputPassword" class="col-sm-3">Lĩnh vực</label>
                            <div class="col-sm-9">
                                <select id="select_linh_vuc" class="form-select">
                                    <option>Công tác đơn vị</option>
                                    <option>Tuyên truyền</option>
                                    <option>Công tác Đảng</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputPassword" class="col-sm-3">Trích yếu</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" v-model="vanban.trichyeu" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputPassword" class="col-sm-3">Ngày triển khai</label>
                            <div class="col-sm-9">
                                <input type="date" class="form-control" v-model="vanban.ngaytrienkhai"
                                    id="txtngaytrienkhai" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label class="col-sm-3 ">Tệp đính kèm</label>
                            <div class="col-sm-9 text-left ">
                                <span class="btn btn-secondary fileinput-button ">
                                    <input type="text" id="muc_string" value="" hidden>
                                    <i class="bi bi-plus-circle"></i> Chọn file
                                    <input type="file" class="chamdiem" name="files[]" multiple
                                        @change="previewFiles" />
                                </span>
                                &nbsp;
                                <button class="btn btn-success " @click="uploadvanbantrienkhai" type="button"><i
                                        class="bi bi-upload"></i> Tải lên</button>
                                <div id="filedisplays"></div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputPassword" class="col-sm-3"></label>
                            <div class="col-sm-9 text-left">
                                <button type="button" class="btn btn-primary" @click="save"><i
                                        class="ri ri-save-3-line"></i> Lưu</button> &nbsp;
                                <button type="button" class="btn btn-info" @click="goto_danh_sach_van_ban">
                                    <i class="bi bi-list"></i> Danh sách
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>

</template>
<script>

    import VanBanTrienKhaiService from "../../services/vanbantrienkhai.service";
    import Swal from 'sweetalert2';
    export default {
        data() {
            return {
                vanban: {
                    sovanban: "",
                    trichyeu: "",
                    ngayvanban: "",
                    ngaytrienkhai: "",
                    tepdinhkem: "",
                    linhvuc: "",
                },

                fileuploads: []
            };
        },
        created() {
            
            this.load_default_data();
        },
        methods: {
            load_default_data() {
                this.vanban.ngayvanban = moment().format("yyyy-MM-DD");
                this.vanban.ngaytrienkhai = moment().format("yyyy-MM-DD");

            },
            previewFiles(event) {
                var files = event.target.files; // File List object                   
                var output = [];
                var outputvalue = [];
                for (var i = 0, f; f = files[i]; i++) {
                    output.push('<div><span class="btn btn-default btn-sm small mb-1 p-0">', f.name, '</span></div>');
                }
                $("#filedisplays").html(output.join(''));
                this.fileuploads = files;
            },
            goto_danh_sach_van_ban() {
                this.$router.push('/vanbantrienkhai');
            },
            save() {
                let loader = this.$loading.show(this.LOADING_PARAM);
                this.vanban.linhvuc = $('#select_linh_vuc').find(":selected").text();
                console.log(this.vanban);
                VanBanTrienKhaiService.luuvanban(this.vanban).then(
                    (res) => {

                        loader.hide();
                        if (res.success) {
                            this.$swal.fire({ text: "Lưu văn bản thành công", icon: "success" });
                            this.vanban = {};
                            this.load_default_data();
                        }

                    },
                    (error) => {
                        console.log(
                            (error.response && error.response.data && error.response.data.message) || error.message || error.toString());
                        loader.hide()
                    }
                );
            },
            uploadvanbantrienkhai() {
                let loader = this.$loading.show(this.LOADING_PARAM);
                VanBanTrienKhaiService.uploadfiles(this.fileuploads).then(
                    (res) => {
                        loader.hide();
                        if (res.success) {
                            // Swal.fire({title: "Thông báo!", text: "Tải file thành công", icon: "success"});
                            let listdownload = res.data;

                            var output = [];
                            this.vanban.tepdinhkem = JSON.stringify(listdownload);
                            for (var i = 0; i < listdownload.length; i++) {
                                let pathfiledownload = process.env.VUE_APP_ROOT_API + "vanbantrienkhai/download/" + encodeURIComponent(listdownload[i].pathFile);
                                console.log(encodeURIComponent(listdownload[i].pathFile));
                                var iframestring = "<a href='" + pathfiledownload + "' target='_blank'>" + listdownload[i].filename + "</a>";
                                output.push('<div class="alert alert-primary alert-dismissible fade show w-75 border-0 p-1 m-2">', iframestring,
                                    '<button type="button" class="btn-close p-1" data-dismiss="alert" aria-label="Close">',
                                    '</button>',
                                    '</div>');
                                $("#filedisplays").html(output.join(''));
                            }
                        }
                    },
                    (error) => {
                        alert(`something went wrong: ${error}`);
                    });
            }
        }
    }
</script>