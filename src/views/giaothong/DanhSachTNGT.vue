<template>
    <div id="main" class="main">
        <div class="pagetitle">
            <h1>Danh sách TNGT</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
                    <li class="breadcrumb-item">Giao thông</li>
                    <li class="breadcrumb-item active">Danh sách TNGT</li>
                </ol>
            </nav>
        </div>
        <section class="section dashboard">
            <div class="card">
                <div class="card-body">
                    <div class="mt-4 mb-2 text-center">
                        <h3>
                            <b>Danh sách TNGT</b>
                        </h3>
                        <span>Hiển thị danh sách tất cả các vụ TNGT sắp xếp theo thời gian gần nhất</span>
                    </div>

                    <form @submit.prevent="timkiemtngt">
                        <div class="row mb-2">
                            <div class="col-sm-12">
                                <label>Nội dung tìm kiếm</label>
                                <input type="text" class="form-control" v-model="timkiemobj.noiDung" />
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-sm-4">
                                <label>Đơn vị thụ lý</label>
                                <select class="form-select" v-model="timkiemobj.maDonViThuLy">
                                    <option v-for="donvi in donvis" :key="donvi.maDonVi" :value="donvi.maDonVi">
                                        {{ donvi.tenDonVi }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-sm-4">
                                <label>Địa bàn xảy ra</label>
                                <select class="form-select" v-model="timkiemobj.maQuanHuyen">
                                    <option v-for="quanhuyen in quanhuyens" :key="quanhuyen.maQuanHuyen"
                                        :value="quanhuyen.maQuanHuyen">
                                        {{ quanhuyen.tenQuanHuyen }}
                                    </option>
                                </select>
                            </div>
                            <div class=" col-sm-4 ">
                                <label>Mức độ TNGT</label>

                                <select class="form-select" v-model="timkiemobj.maMucDoTNGT">
                                    <option v-for="mucdotngt in mucdotngts" :key="mucdotngt.maMucDoTNGT"
                                        :value="mucdotngt.maMucDoTNGT">
                                        {{ mucdotngt.tenMucDoTNGT }}
                                    </option>
                                </select>

                            </div>
                        </div>
                        <div class="row mb-4">
                            <div class="col-sm-4">
                                <label>Từ ngày</label>
                                <MyDatePicker id="datepicker_tungay" v-model="timkiemobj.tuNgay">
                                </MyDatePicker>
                            </div>
                            <div class="col-sm-4">
                                <label>Đến ngày</label>
                                <MyDatePicker id="datepicker_denngay" v-model="timkiemobj.denNgay">
                                </MyDatePicker>
                            </div>
                            <div class="col-sm-4">
                                <label>Loại ngày tìm kiếm</label>
                                <select class="form-select" v-model="timkiemobj.loaiNgayTimKiem">
                                    <option value="1" selected>Ngày báo cáo</option>
                                    <option value="2">Ngày xảy ra</option>
                                </select>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center gap-2 d-flex">
                            <button type="submit" class="btn btn-primary">Tìm kiếm</button>
                            <button type="button" class="btn btn-success">
                                <a href="/giaothong/themtngt" style="color: white">
                                    Thêm TNGT
                                </a>
                            </button>
                            <button type="button" class="btn btn-info">Trích xuất</button>
                        </div>
                    </form>
                    <div class="row mt-3">
                        <div class="col-sm-7 d-flex justify-content-center  flex-column"
                            style="font-size: 14px; line-height: 1">
                            <p>Có <b>{{tongsotngt}}</b> vụ TNGT được tìm thấy.</p>

                        </div>
                    </div>
                    <div class="row mt-3">
                        <table class="table table-bordered table-striped small">
                            <thead>
                                <tr class="text-center align-middle">
                                    <th scope="col" width="3%">#</th>
                                    <th scope="col" width="10%">Đơn vị thụ lý</th>
                                    <th scope="col" width="10%">Địa bàn</th>
                                    <th scope="col">Ngày xảy ra</th>
                                    <th scope="col">Ngày báo cáo</th>
                                    <th scope="col">Mức độ TNGT</th>
                                    <th scope="col" width="25%">Nội dung TNGT</th>
                                    <th scope="col">Ghi chú</th>
                                    <th scope="col">Số người chết</th>
                                    <th scope="col">Số người bị thương</th>
                                    <th scope="col">Số ô tô hư hỏng</th>
                                    <th scope="col">Số mô tô hư hỏng</th>
                                    <th scope="col">Số tiền thiệt hại (tr.đồng)</th>
                                    <th scope="col" width="7%" v-show="!is_CAT_User">Phê duyệt của đơn vị</th>
                                    <th scope="col" width="7%" v-show="!is_CAT_User && !is_PhongBan_User">Phê duyệt của cấp trên</th>
                                    <th scope="col">Chi tiết</th>
                                    <th scope="col">Sửa</th>
                                    <th scope="col">Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(tngt, index) in tngts" :key="index">
                                    <td class="text-center">{{index +1 }}</td>
                                    <td>{{tngt.tenDonViThuLy}}</td>
                                    <td>{{tngt.tenQuanHuyen }}</td>
                                    <td>{{tngt.ngayXayRa}}</td>
                                    <td>{{tngt.ngayBaoCao}}</td>
                                    <td>{{tngt.tenMucDoTNGT}}</td>
                                    <td>{{tngt.noiDung}}</td>
                                    <td> {{tngt.ghiChu }}</td>
                                    <td class="text-end"> {{tngt.soNguoiChet }}</td>
                                    <td class="text-end"> {{tngt.soNguoiBiThuong }}</td>
                                    <td class="text-end"> {{tngt.soOtoHuHong }}</td>
                                    <td class="text-end"> {{tngt.soMotoHuHong }}</td>
                                    <td class="text-end"> {{tngt.soTienThietHai }}</td>

                                    <td class="text-center" v-show="!is_CAT_User">
                                        <template v-if="tngt.trangThaiDonViPheDuyet=='Chưa duyệt' ">
                                            {{tngt.trangThaiDonViPheDuyet}}
                                        </template>
                                        <template v-if="tngt.trangThaiDonViPheDuyet=='Đang theo dõi'">
                                            <div class="text-danger">{{is_CAT_User?'Đang theo dõi':tngt.trangThaiDonViPheDuyet}} </div>
                                        </template>
                                        <template v-if="tngt.trangThaiDonViPheDuyet=='Đã duyệt'">
                                            <div class="text-success">{{is_CAT_User?'Đã gửi bộ':tngt.trangThaiDonViPheDuyet}}</div>
                                        </template>
                                        <div v-show="tngt.trangThaiCapTrenPheDuyet=='Chưa duyệt' || is_CAT_User">
                                            <button @click="pheduyettngt_onclick(tngt.maTaiNanGiaoThong);"
                                                class="btn btn-sm btn-primary ">Duyệt</button>
                                        </div>
                                    </td>
                                    <td v-show="!is_CAT_User && !is_PhongBan_User" class="text-center">
                                        <template v-if="tngt.trangThaiCapTrenPheDuyet=='Chưa duyệt'">
                                            <div class="text-primary">{{tngt.trangThaiCapTrenPheDuyet}} </div>
                                        </template>
                                        <template v-else-if="tngt.trangThaiCapTrenPheDuyet=='Đang theo dõi'">
                                            <div class="text-danger"> {{tngt.trangThaiCapTrenPheDuyet}}</div>
                                        </template>
                                        <template v-else>
                                            <div class="text-success">
                                                {{tngt.trangThaiCapTrenPheDuyet}}
                                            </div>
                                        </template>
                                    </td>
                                    <td class="text-center">
                                        <a :href="'/giaothong/chitiettngt/'+tngt.maTaiNanGiaoThong"><i class="bi bi-card-list"></i></a>
                                      </td>
                                    <td class="text-center">
                                        <i class="bi bi-pencil-square" role="button"
                                            @click="suatngt(tngt.maTaiNanGiaoThong)"></i>
                                    </td>
                                    <td class="text-center">
                                        <i class="bi bi-trash" role="button"
                                            @click="xoatngt(tngt.maTaiNanGiaoThong)"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-start" id="divSoTrang" v-html="phan_trang_html"></ul>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
        <div class="modal modal-xl fade" id="modal_pheduyettngt" tabindex="-1" aria-modal="true" role="dialog">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Phê duyệt TNGT</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label>Nội dung phê duyệt</label>
                        <input type="text" class="form-control" v-model="tngtpheduyet.noiDungPheDuyet" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="pheduyettngt(1)">Duyệt</button>
                        <button type="button" class="btn btn-danger" @click="pheduyettngt(2)">Không duyệt</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import GiaoThongService from "../../services/giaothong.service";

    export default {
        data() {
            return {
                quanhuyens: [], // Mảng lưu trữ các lĩnh vực
                donvis: [], // Mảng lưu trữ các lĩnh vực
                mucdotngts: [], // Biến lưu trữ lựa chọn hiện tại
                tngts: [],
                phan_trang_html: "",
                current_page_index: 1,
                num_row_one_page: 20,
                SoTrangTrenManHinh: 10,
                timkiemobj: {},
                tongsotngt: 0,
                tngtpheduyet: {},
            };
        },
        created() {
            this.timkiemobj.tuNgay = '23/12/2020';
            this.timkiemobj.denNgay = moment().format(DEFAULT_DATE_FORMAT);
            this.laydulieubandau();

        },
        methods: {
            laydulieubandau() {
                let loader = this.$loading.show(this.LOADING_PARAM);
                GiaoThongService.laydulieudanhmuc().then(
                    (res) => {

                        loader.hide();
                        if (res.success) {
                            let list_danhmuc = res.data;

                            this.donvis = list_danhmuc[0];
                            this.timkiemobj.maDonViThuLy = this.donvis[0].maDonVi;
                            this.quanhuyens = list_danhmuc[1];
                            this.timkiemobj.maQuanHuyen = this.quanhuyens[0].maQuanHuyen;

                            this.mucdotngts = list_danhmuc[2];
                            this.timkiemobj.maMucDoTNGT = this.mucdotngts[0].maMucDoTNGT;
                            this.timkiemobj.loaiNgayTimKiem = 1;
                            this.timkiemtngt();
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
            timkiemtngt() {
                let loader = this.$loading.show(this.LOADING_PARAM);
                this.timkiemobj.pageSize = this.num_row_one_page;
                this.timkiemobj.pageIndex = this.current_page_index;
                GiaoThongService.laydanhsachtngt(this.timkiemobj).then(
                    (res) => {
                        loader.hide();
                        if (res.success) {
                            this.tngts = res.data;

                            this.tongsotngt = parseInt(res.alt);
                            this.phan_trang_html = this.getHTMLOfPageSplitter(
                                this.tongsotngt,
                                this.current_page_index,
                                ""
                            );
                            this.$nextTick(function () {
                                const vm = this;
                                $(".page-button").on("click", function (event) {
                                    vm.goto_page($(this).attr("page-index"));
                                    event.preventDefault();
                                });
                            });

                        }
                    },
                    (error) => {
                        loader.hide();
                    }
                );
            },
            suatngt(maTaiNanGiaoThong) {
                this.$router.push('/giaothong/suatngt/' + maTaiNanGiaoThong);
            },
            xoatngt(maTaiNanGiaoThong) {
                this.$swal.fire({
                    title: "Thông báo",
                    text: "Bạn có chắc muốn xóa vụ Tai nạn giao thông này không?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Đồng ý",
                    cancelButtonText: "Không",
                }).then((result) => {
                    if (result.isConfirmed) {
                        let loader = this.$loading.show(this.LOADING_PARAM);
                        GiaoThongService.xoatngt(maTaiNanGiaoThong).then(
                            (res) => {
                                loader.hide();
                                if (res && res.success) {
                                    this.$swal.fire({
                                        title: "Thông báo",
                                        text: "Xóa vụ Tai nạn giao thông thành công.",
                                        icon: "success"
                                    }).then((result) => {
                                        this.timkiemvuviec();
                                    });
                                }
                                else {
                                    this.$swal.fire({ title: "Thông báo!", text: res ? res.message : "Lỗi máy chủ", icon: "warning" });
                                }
                            },
                            (error) => {
                                console.log(
                                    (error.response && error.response.data && error.response.data.message) || error.message || error.toString());
                                loader.hide();
                            }
                        );
                    }
                })
            },
            pheduyettngt_onclick(matngt) {
                this.tngtpheduyet = {
                    maTNGTPheDuyet: 0,
                    maTNGT: parseInt(matngt),
                    noiDungPheDuyet: '',
                    loaiPheDuyet: 1,
                    ghiChu: ''
                }
                $('#modal_pheduyettngt').modal('show');
            },
            pheduyettngt(loaipheduyet) {
                this.tngtpheduyet.loaiPheDuyet = loaipheduyet;
                let loader = this.$loading.show(this.LOADING_PARAM);
                GiaoThongService.pheduyettngt(this.tngtpheduyet).then(
                    (res) => {
                        loader.hide();
                        $('#modal_pheduyettngt').modal('hide');
                        if (res && res.success) {
                            this.$swal.fire({ title: "Thông báo!", text: "Thao tác thành công", icon: "success" }).then((result) => {
                                this.timkiemtngt();
                            });
                        }
                        else {
                            this.$swal.fire({ title: "Thông báo!", text: res ? res.message : "Lỗi máy chủ", icon: "error" });
                        }
                    },
                    (error) => {
                        loader.hide();
                    });
            },
            getNumberOfPage(numOfRecord) {
                let numOfPage = Math.round(
                    (numOfRecord - 1) / this.num_row_one_page + 0.501
                );
                return numOfPage;
            },
            getHTMLOfPageSplitter(numOfRecord, pageIndex, pageURL) {
                let numOfPage = this.getNumberOfPage(numOfRecord);

                let result = "";
                //int startIdx = (pageIndex - 1) / (PageSize) * PageSize + 1;
                let startIdx = 0;

              
                startIdx =  Math.floor((pageIndex - 1) / this.SoTrangTrenManHinh) *  this.SoTrangTrenManHinh + 1;

                //thêm page trước
                if (startIdx <= this.SoTrangTrenManHinh) {
                    result +=
                        '<li class="page-vuviec disabled"><span class="page-link">Trước</span></li>';
                } else {
                    result += '<li class="page-vuviec">';
                    result +=
                        '<a class="page-link page-button" href="#" page-index="' + (startIdx - 1) +'">Trước</a></li>';
                }

                //thêm số page giữa
                for (let i = startIdx; i < startIdx + this.SoTrangTrenManHinh; i++) {
                    if (i > numOfPage) {
                        break;
                    }
                    if (i == pageIndex) {
                        result +=
                            '<li class="page-vuviec active"><a class="page-link" href=\'#\'>' +
                            i +
                            "</a></li>";
                    } else {
                        result +=
                            '<li class="page-vuviec "><a page-index="' +
                            i +
                            '" class="page-link page-button" href=\'#\'>' +
                            i +
                            "</a></li>";
                    }
                }
                //thêm số page sau
                if (startIdx + this.SoTrangTrenManHinh <= numOfPage) {
                    result += '<li class="page-vuviec">';
                    result +=
                        '<a class="page-link page-button" href="#" page-index="' + (startIdx + this.SoTrangTrenManHinh) + '">Sau</a></li>';
                } else {
                    result +=
                        '<li class="page-vuviec disabled"><span class="page-link">Sau</span></li>';
                }
                return result;
            },
            goto_page(page_index) {
                this.current_page_index = page_index;
                this.timkiemtngt();
            },
            getNoiDungTomTat(noidung) {
                let minLength = 200;
                if (noidung.length > minLength) {
                    for (let i = minLength; i < noidung.length; i++) {
                        if (noidung[i] == ' ') {
                            noidung = noidung.substring(0, i);
                            noidung += " ..."
                            break;
                        }
                    }
                }
                return noidung;
            },
            toggleTimKiemMoRong() {
                this.isDisplayTimKiemMoRong = !this.isDisplayTimKiemMoRong;
            }
        },
        computed: {
            get_current_user() {
                return this.$store.getters["auth/current_user"];
            },
            is_PhongBan_User() {
                return this.$store.getters['auth/is_PhongBan_User'];
            },
            is_CAT_User() {
                return this.$store.getters['auth/is_CAT_User'];
            }
        },
    };
</script>