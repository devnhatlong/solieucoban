<template>
    <div id="main" class="main">
        <div class="pagetitle">
            <h1>Phân quyền</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
                    <li class="breadcrumb-item">Tài khoản</li>
                    <li class="breadcrumb-item active">Phân quyền tổng hợp</li>
                </ol>
            </nav>
        </div>
        <section class="section">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Phân quyền lĩnh vực phụ trách cho phòng ban
                    </h5>
                  
                    <table class="table table-sm text-center">
                        <thead>
                            <tr>
                                <th scope="col" width="10%">STT</th>
                                <th scope="col" width="45%">Tên lĩnh vực vụ việc</th>
                                <th scope="col" width="45%">Đơn vị phụ trách</th>                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="idx" v-for="(phanquyenlinhvucvuviec,idx) in phanquyenlinhvucvuviecs">
                                <td>{{idx+1}}</td>
                                <td>{{phanquyenlinhvucvuviec.linhVucVuViec.tenLinhVucVuViec}}</td>
                                <td>  
                                <select class="form-select" v-model="phanquyenlinhvucvuviec.maDonVi">
                                    <template :key="idx" v-for="(donvi,idx) in donvis">
                                        <option :value="donvi.maDonVi">{{donvi.tenDonVi}}</option>
                                    </template>
                                </select> 
                                </td>              
                            </tr>
                        </tbody>
                    </table>
                    <button class="btn btn-primary" @click="luuphanquyenlinhvucvuviec"><i class="bi bi-save"> </i> Lưu
                    </button>
              
                </div>
            </div>
        </section>
    </div>

</template>
<script>

    import AccountService from "../../services/account.service";
    export default {
        data() {
            return {
                donvis: [],            
                taikhoan_selected:{},
                phanquyenlinhvucvuviecs:[]
            };

        },
        created() {

            this.get_data_from_server();

        },
        computed: {

        },
        methods: {
           
            get_data_from_server() {
                let loader = this.$loading.show(this.LOADING_PARAM);
                AccountService.layphanquyenlinhvucvuviec().then(
                    (res) => {
                        loader.hide();
                        if (res?.success) {
                            this.phanquyenlinhvucvuviecs = res.data; 
                            this.donvis = res.alt;                                                    
                        }
                        else {
                            this.$swal.fire({ title: "Thông báo!", text: res.message, icon: "error" });
                        }
                    }),
                    (error) => {
                        loader.hide();
                        console.log((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
                        this.$swal.fire({ title: "Thông báo!", text: error.message, icon: "error" });
                    };

            },
            get_ds_chuc_nang_of_account() {
                let loader = this.$loading.show(this.LOADING_PARAM);
                AccountService.get_danh_sach_chuc_nang(this.taikhoan_selected.maTaiKhoan).then(
                    (res) => {
                        loader.hide();
                        if (res?.success) {
                            this.phanquyenchucnangs = res.data;
                           
                        }
                        else {
                            this.$swal.fire({ title: "Thông báo!", text: res?.message, icon: "error" });
                        }
                    }),
                    (error) => {
                        loader.hide();
                        console.log((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
                        this.$swal.fire({ title: "Thông báo!", text: error.message, icon: "error" });
                    };

            },
            get_ds_loaivanban_of_account() {
                let loader = this.$loading.show(this.LOADING_PARAM);
                AccountService.get_ds_phanquyen_loaivanban(this.taikhoan_selected.maTaiKhoan).then(
                    (res) => {
                        loader.hide();
                        if (res?.success) {
                            this.phanquyenloaivanbans = res.data;
                           
                        }
                        else {
                            this.$swal.fire({ title: "Thông báo!", text: res?.message, icon: "error" });
                        }
                    }),
                    (error) => {
                        loader.hide();
                        console.log((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
                        this.$swal.fire({ title: "Thông báo!", text: error.message, icon: "error" });
                    };

            },
            select_loai_danh_muc(maloaidanhmuc) {
                this.loaidanhmuc_selected = this.danhsachloaidanhmuc[maloaidanhmuc];
            },
            goto_themdanhmuc() {
                this.danhmuc_selected = {};
                this.danhmuc_selected.maDanhMuc = "";
                if (this.loaidanhmuc_selected.maloaidanhmuc == 0) {//loai van ban
                    this.cauhinhtruongthongtin = JSON.parse(JSON.stringify(this.truong_thong_tin_default));

                }
                this.danhmuc_selected.sapXepTheoCot = "NgayVanBan";
            },
            goto_suadanhmuc(madanhmuc_param) {
                let list_danhmuc = this.loaidanhmuc_selected.danhsachdanhmuc;
                for (let i = 0; i < list_danhmuc.length; i++) {
                    if (list_danhmuc[i].madanhmuc == madanhmuc_param) {
                        this.danhmuc_selected = list_danhmuc[i];
                        if (this.loaidanhmuc_selected.maloaidanhmuc == 0) {//loai van ban

                            if (this.danhmuc_selected.cauHinhTruongThongTin.length > 0) {
                                this.cauhinhtruongthongtin = JSON.parse(this.danhmuc_selected.cauHinhTruongThongTin);
                            }
                            else {
                                this.cauhinhtruongthongtin = JSON.parse(JSON.stringify(this.truong_thong_tin_default));
                            }
                            //this.cauhinhtruongthongtin = JSON.parse(this.danhmuc_selected.cauHinhTruongThongTin);
                        }
                    }
                }
            },
            luuphanquyenchucnang() {
                let loader = this.$loading.show(this.LOADING_PARAM);   
                AccountService.luuphanquyenchucnang(this.phanquyenchucnangs).then(
                    (res) => {
                        loader.hide();
                        if (res.success) {
                            this.$swal.fire({
                                title: "Thông báo",
                                text: "Lưu phân quyền chức năng thành công.",
                                icon: "success"
                            });                         
                            this.get_ds_chuc_nang_of_account();                            
                        }
                        else {
                            this.$swal.fire({ title: "Thông báo!", text: res?.message, icon: "warning" });
                        }
                    },
                    (error) => {
                        console.log(
                            (error.response && error.response.data && error.response.data.message) || error.message || error.toString());
                        loader.hide();
                    }
                );
            },
            luuphanquyenloaivanban() {
                let loader = this.$loading.show(this.LOADING_PARAM);   
                console.log(this.phanquyenloaivanbans);
                AccountService.luuphanquyenloaivanban(this.phanquyenloaivanbans).then(
                    (res) => {
                        loader.hide();
                        if (res.success) {
                            this.$swal.fire({
                                title: "Thông báo",
                                text: "Lưu phân quyền loại văn bản thành công.",
                                icon: "success"
                            });                         
                            this.get_ds_loaivanban_of_account();                            
                        }
                        else {
                            this.$swal.fire({ title: "Thông báo!", text: res?.message, icon: "warning" });
                        }
                    },
                    (error) => {
                        console.log(
                            (error.response && error.response.data && error.response.data.message) || error.message || error.toString());
                        loader.hide();
                    }
                );
            },
            goto_xoadanhmuc(madanhmuc) {
            },

        }
    }
</script>