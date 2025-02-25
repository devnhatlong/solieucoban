<template>
    <div id="main" class="main">
        <div class="pagetitle">
            <h1>Thêm vụ tai nạn giao thông</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
                    <li class="breadcrumb-item">Giao thông</li>
                    <li class="breadcrumb-item active">{{mode_title}} tai nạn giao thông</li>
                </ol>
            </nav>
        </div>
        <section class="section dashboard">
            <div class="card">
                <div class="card-body" :key="render_tngt">
                    <div class="mt-4 mb-2 text-center">
                        <h3>
                            <b style=" text-transform: capitalize;">{{mode_title}} tai nạn giao thông</b>
                        </h3>
                    </div>
                    <div class="row mt-1">
                        <div class="col-sm-3">
                            <label class="col-form-label">Đơn vị thụ lý:</label>
                            <div class="">
                                <select class="form-select" v-model="tngt.maDonViThuLy" disabled>
                                    <option v-for="donvi in donvithulys" :key="donvi.maDonVi" :value="donvi.maDonVi">
                                        {{ donvi.tenDonVi }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <label class="col-form-label">Huyện, TX, TP xảy ra:</label>
                            <div class="">
                                <select class="form-select" v-model="tngt.maQuanHuyen" id="select_quanhuyen">
                                    <option v-for="quanhuyen in quanhuyens" :key="quanhuyen.maQuanHuyen"
                                        :value="quanhuyen.maQuanHuyen">
                                        {{ quanhuyen.tenQuanHuyen }}
                                    </option>
                                </select>
                            </div>
                        </div>


                        <div class="col-sm-3">
                            <label class=" col-form-label ">Ngày báo cáo:</label>
                            <div class="">
                                <MyDatePicker id="datepicker_ngaybaocao" v-model="tngt.ngayBaoCao"></MyDatePicker>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <label class=" col-form-label ">Ngày xảy ra:</label>
                            <div class="">
                                <MyDatePicker id="datepicker_ngayxayra" v-model="tngt.ngayXayRa"></MyDatePicker>
                            </div>
                        </div>

                    </div>
                    <div class="row pt-0 mt-0">
                        <label class="col-form-label ">Nội dung:</label>
                        <div>
                            <textarea class="form-control" id="floatingTextarea" style="height: 100px"
                                v-model="tngt.noiDung"></textarea>
                        </div>
                    </div>
                 
                    <div class="row mt-1">
                        <div class="col-sm-3">
                            <label class=" col-form-label ">Mức độ TNGT:</label>
                            <div class="">
                                <select class="form-select" v-model="tngt.maMucDoTNGT">
                                    <option v-for="mucdotngt in mucdotngts" :key="mucdotngt.maMucDoTNGT"
                                        :value="mucdotngt.maMucDoTNGT">
                                        {{ mucdotngt.tenMucDoTNGT }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <label class="col-form-label">Số người chết:</label>
                            <div>
                                <input class="form-control text-end" v-model="tngt.soNguoiChet" />
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <label class="col-form-label">Số người bị thương:</label>
                            <div>
                                <input class="form-control text-end" v-model="tngt.soNguoiBiThuong" />
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <label class="col-form-label">Số ô tô hư hỏng:</label>
                            <div>
                                <input class="form-control text-end" v-model="tngt.soOtoHuHong" />
                            </div>
                        </div>
                    


                    </div>
                    
                    <div class="row mt-2">
                        <div class="col-sm-3">
                            <label class="col-form-label">Số mô tô hư hỏng:</label>
                            <div>
                                <input class="form-control text-end" v-model="tngt.soMotoHuHong" />
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <label class="col-form-label ">Số tiền thiệt hại (triệu đồng):</label>
                            <div class="">
                                <input class="form-control text-end" v-model="tngt.soTienThietHai" />
                            </div>
                        </div>
                       
                        <div class="col-sm-3">
                            <label class="col-form-label ">Ghi chú:</label>
                            <div class="">
                                <input class="form-control" v-model="tngt.ghiChu" />
                            </div>
                        </div>
                    </div>

                    <div class="text-center mt-3">
                        <button type="button" class="btn btn-primary" @click="luuTNGT">Lưu TNGT</button>
                        <button type="button" class="ms-2 btn btn-secondary" @click="danhsachTNGT_onclick">Danh sách
                            TNGT</button>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>
<script>
    import GiaoThongService from "../../services/giaothong.service";
    export default {
        data() {
            return {

                quanhuyens: [],
                mucdotngts: [],
                donvithulys: [],

                tngt: {
                    maTaiNanGiaoThong: '',
                    maDonViThuLy: '',
                    maQuanHuyen: '',
                    maMucDoTNGT: '',
                    ngayBaoCao: moment().format(DEFAULT_DATE_FORMAT),
                    ngayXayRa: moment().format(DEFAULT_DATE_FORMAT),
                    noiDung: '',

                    ghiChu: '',
                    soOtoHuHong: 0,
                    soMotoHuHong: 0,
                    soNguoiChet: 0,
                    soNguoiBiThuong: 0,
                    soTienThietHai: '',

                },
                render_tngt: 0,

                form_mode: 1,
                mode_title: '',

            };
        },
        created() {
            this.form_mode = this.$route.meta.form_mode;
            if (this.form_mode == FORM_MODE_NEW) {
                this.mode_title = 'Thêm';
            }
            else if (this.form_mode == FORM_MODE_EDIT) {

                this.mode_title = 'Sửa';
            }
            let matainangiaothong = 0;
            if (this.$route.params.matainangiaothong) {
                matainangiaothong = this.$route.params.matainangiaothong;

            }
            this.load_data(matainangiaothong);
        },
        methods: {
            load_data(matainangiaothong) {
                let loader = this.$loading.show(this.LOADING_PARAM);
                GiaoThongService.laydulieuformnhap(matainangiaothong).then(
                    (res) => {
                        loader.hide();
                        if (res.success) {

                            let list_danhmuc = res.data[1];
                            if (list_danhmuc.length > 0) {
                                this.donvithulys = list_danhmuc[0];
                                this.quanhuyens = list_danhmuc[1];
                                this.mucdotngts = list_danhmuc[2];
                            }

                            this.tngt = res.data[0];

                            if (this.form_mode == FORM_MODE_NEW) {
                                this.tngt.maDonViThuLy = this.get_current_user.donVi.maDonVi;
                                this.tngt.maMucDoTNGT = this.mucdotngts[0].maMucDoTNGT;
                                console.log (this.get_current_user);
                                if (this.get_current_user.donVi.capDo == 2 && this.get_current_user.donVi.quanHuyen) {
                                    this.tngt.maQuanHuyen = this.get_current_user.donVi.quanHuyen.maQuanHuyen;
                                }
                                else if( this.get_current_user.donVi.capDo == 3 && this.get_current_user.donVi.phuongXa.quanHuyen) {
                                    this.tngt.maQuanHuyen = this.get_current_user.donVi.phuongXa.quanHuyen.maQuanHuyen;
                                }
                                else {
                                    this.tngt.maQuanHuyen = this.quanhuyens[0].maQuanHuyen;
                                }
                               
                            }
                            else {

                            }
                            this.forceRerender();
                        }
                        else{
                            this.$swal.fire({ title: "Thông báo!", text: res.message, icon: "warning" }).then((result) => {
                                this.$router.push("/home");
                            });;

                        }
                        

                    },
                    (error) => {
                        loader.hide();
                    }
                );
            },
            forceRerender() {
                this.render_tngt++;
            },
            danhsachTNGT_onclick() {
                this.$router.push('/giaothong/danhsachtngt');
            },
            luuTNGT() {

                this.tngt.tenDonViThuLy = this.donvithulys.find((element) => element.maDonVi == this.tngt.maDonViThuLy)?.tenDonVi;

              
                this.tngt.tenQuanHuyen = this.quanhuyens.find((element) => element.maQuanHuyen == this.tngt.maQuanHuyen)?.tenQuanHuyen;
               
                this.tngt.tenMucDoTNGT = this.mucdotngts.find((element) => element.maMucDoTNGT == this.tngt.maMucDoTNGT)?.tenMucDoTNGT;

                

                let loader = this.$loading.show(this.LOADING_PARAM);

                GiaoThongService.luuTNGT(this.tngt).then(
                    (res) => {
                        loader.hide();

                        if (res && res.success) {
                            this.$swal.fire({
                                title: "Thông báo!",
                                html: "Lưu vụ việc TNGT thành công. <br>Bạn có vào màn hình chi tiết vụ TNGT không?",
                                icon: "success",
                                showCancelButton: true,
                                confirmButtonText: "Đồng ý",
                                cancelButtonText: "Không",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    this.$router.push('/giaothong/chitiettngt/'+res.data);
                                }
                            });

                        }
                        else {
                            this.$swal.fire({ title: "Thông báo!", text: res ? res.message : "Lỗi máy chủ", icon: "error" });
                        }

                    },
                    (error) => {
                        loader.hide();
                    });
                }
            },
            computed: {
                get_current_user() {
                    return this.$store.getters["auth/current_user"];
                },
            }
        }
</script>