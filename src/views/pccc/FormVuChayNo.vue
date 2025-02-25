<template>
    <div id="main" class="main">
        <div class="pagetitle">
            <h1>{{mode_title}} vụ cháy nổ</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
                    <li class="breadcrumb-item">PCCC</li>
                    <li class="breadcrumb-item active">{{mode_title}} vụ cháy nổ</li>
                </ol>
            </nav>
        </div>
        <section class="section dashboard">
            <div class="card">
                <div class="card-body" :key="render_vuchayno">

                    <div class="mt-4 mb-2 text-center">
                        <h3>
                            <b style=" text-transform: capitalize;">{{mode_title}} vụ cháy nổ</b>
                        </h3>
                    </div>
                    <div class="row mt-1">
                        <div class="col-6 input-group">

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="radioVuChay"
                                    v-model="vuchayno.laVuChay" value="true">
                                <label class="form-check-label" for="radioVuChay">
                                    Vụ cháy
                                </label>
                            </div>
                            <div class="form-check ms-3">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" value="false"
                                    id="radioVuNo" v-model="vuchayno.laVuChay">
                                <label class="form-check-label" for="radioVuNo">
                                    Vụ nổ
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-1">
                        <div class="col-sm-3">
                            <label class="col-form-label">Đơn vị thụ lý:</label>
                            <div class="">
                                <select class="form-select" v-model="vuchayno.maDonViThuLy" disabled>
                                    <option v-for="donvi in donvithulys" :key="donvi.maDonVi" :value="donvi.maDonVi">
                                        {{ donvi.tenDonVi }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <label class="col-form-label">Huyện, TX, TP xảy ra:</label>
                            <div class="">
                                <select class="form-select" v-model="vuchayno.maQuanHuyen" id="select_quanhuyen">
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
                                <MyDatePicker id="datepicker_ngaybaocao" v-model="vuchayno.ngayBaoCao"></MyDatePicker>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <label class=" col-form-label ">Ngày xảy ra:</label>
                            <div class="">
                                <MyDatePicker id="datepicker_ngayxayra" v-model="vuchayno.ngayXayRa"></MyDatePicker>
                            </div>
                        </div>

                    </div>
                    <div class="row pt-0 mt-0">
                        <label class="col-form-label ">Nội dung:</label>
                        <div>
                            <textarea class="form-control" id="floatingTextarea" style="height: 100px"
                                v-model="vuchayno.noiDung"></textarea>
                        </div>
                    </div>
                    <div class="row pt-0 mt-0">
                        <div class="col-sm-3">
                            <label class="col-form-label ">Nguyên nhân:</label>
                            <div class="">
                                <input class="form-control" v-model="vuchayno.nguyenNhan" />
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <label class=" col-form-label ">Mức độ vụ cháy nổ:</label>
                            <div class="">
                                <select class="form-select" v-model="vuchayno.maMucDoVuChayNo">
                                    <option v-for="mucdovuchayno in mucdovuchaynos" :key="mucdovuchayno.maMucDoVuChayNo"
                                        :value="mucdovuchayno.maMucDoVuChayNo">
                                        {{ mucdovuchayno.tenMucDoVuChayNo }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label class="col-form-label ">Ghi chú:</label>
                            <div class="">
                                <input class="form-control" v-model="vuchayno.ghiChu" />
                            </div>
                        </div>
                    </div>
                    <div class="row mt-1">
                        <div class="col-sm-3">
                            <label class="col-form-label ">Tài sản thiệt hại (triệu đồng):</label>
                            <div class="">
                                <input class="form-control text-end" v-model="vuchayno.taiSanThietHai" />
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <label class="col-form-label ">Số người chết:</label>
                            <div class="">
                                <input class="form-control text-end" v-model="vuchayno.soNguoiChet" />
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <label class="col-form-label ">Số người bị thương nặng:</label>
                            <div class="">
                                <input class="form-control text-end" v-model="vuchayno.soNguoiBiThuongNang" />
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <label class="col-form-label ">Số người bị thương nhẹ:</label>
                            <div class="">
                                <input class="form-control text-end" v-model="vuchayno.soNguoiBiThuongNhe" />
                            </div>
                        </div>
                    </div>
                   
                    <div class="text-center mt-3">
                        <button type="button" class="btn btn-primary" @click="luuvuchayno">Lưu</button>
                        <button type="button" class="ms-2 btn btn-secondary" @click="danhsachVuChayNo_onclick">Danh sách
                            vụ cháy nổ</button>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>
<script>
    import PcccService from "../../services/pccc.service";
    export default {
        data() {
            return {

                quanhuyens: [],
                mucdovuchaynos: [],
                donvithulys: [],

                vuchayno: {
                    maTaiNanGiaoThong: '',
                    maDonViThuLy: '',
                    maQuanHuyen: '',
                    maMucDoVuChayNo: '',
                    laVuChay: true,
                    ngayBaoCao: moment().format(DEFAULT_DATE_FORMAT),
                    ngayXayRa: moment().format(DEFAULT_DATE_FORMAT),
                    noiDung: '',
                    ghiChu: '',
                    taiSanThietHai: '',
                    soNguoiChet: 0,
                    soNguoiBiThuongNang: 0,
                    soNguoiBiThuongNhe: 0
                },
                render_vuchayno: 0,
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
            let mavuchayno = 0;
            if (this.$route.params.mavuchayno) {
                mavuchayno = this.$route.params.mavuchayno;

            }
            this.load_data(mavuchayno);
        },
        methods: {
            load_data(mavuchayno) {
                let loader = this.$loading.show(this.LOADING_PARAM);
                PcccService.laydulieuformnhap(mavuchayno).then(
                    (res) => {
                        loader.hide();
                        if (res.success) {

                            let list_danhmuc = res.data[1];
                            if (list_danhmuc.length > 0) {
                                this.donvithulys = list_danhmuc[0];
                                this.quanhuyens = list_danhmuc[1];
                                this.mucdovuchaynos = list_danhmuc[2];
                            }
                            this.vuchayno = res.data[0];
                            if (this.form_mode == FORM_MODE_NEW) {
                                this.vuchayno.maDonViThuLy = this.get_current_user.donVi.maDonVi;
                                this.vuchayno.maMucDoVuChayNo = this.mucdovuchaynos[0]?.maMucDoVuChayNo;
                                if (this.get_current_user.donVi.capDo == 2 && this.get_current_user.donVi.quanHuyen) {
                                    this.vuchayno.maQuanHuyen = this.get_current_user.donVi.quanHuyen.maQuanHuyen;
                                }
                                else if( this.get_current_user.donVi.capDo == 3 && this.get_current_user.donVi.phuongXa.quanHuyen) {
                                    this.vuchayno.maQuanHuyen = this.get_current_user.donVi.phuongXa.quanHuyen.maQuanHuyen;
                                }
                                else {
                                    this.vuchayno.maQuanHuyen = this.quanhuyens[0].maQuanHuyen;
                                }
                            }
                            else {
                            }


                            this.forceRerender();
                        }
                        else {
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
                this.render_vuchayno++;
            },
            danhsachVuChayNo_onclick() {
                this.$router.push('/pccc/danhsachvuchayno');
            },
            luuvuchayno() {

                this.vuchayno.tenDonViThuLy = this.donvithulys.find((element) => element.maDonVi == this.vuchayno.maDonViThuLy)?.tenDonVi;
                this.vuchayno.tenQuanHuyen = this.quanhuyens.find((element) => element.maQuanHuyen == this.vuchayno.maQuanHuyen)?.tenQuanHuyen;
                this.vuchayno.tenMucDoVuChayNo = this.mucdovuchaynos.find((element) => element.maMucDoVuChayNo == this.vuchayno.maMucDoVuChayNo)?.tenMucDoVuChayNo;


                let loader = this.$loading.show(this.LOADING_PARAM);

                PcccService.luuvuchayno(this.vuchayno).then(
                    (res) => {
                        loader.hide();

                        if (res && res.success) {
                            this.$swal.fire({
                                title: "Thông báo!",
                                html: "Lưu vụ Cháy/Nổ thành công. <br>Bạn có xem chi tiết vụ Cháy/Nổ không?",
                                icon: "success",
                                showCancelButton: true,
                                confirmButtonText: "Đồng ý",
                                cancelButtonText: "Không",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    this.$router.push('/pccc/chitietvuchayno/' + res.data);
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
            is_PhongBan_User() {
                return this.$store.getters['auth/is_PhongBan_User'];
            },
        }
    }
</script>