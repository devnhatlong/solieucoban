<template>
    <div id="main" class="main">
        <div class="pagetitle">
            <h1>Danh sách vụ cháy nổ</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
                    <li class="breadcrumb-item">PCCC</li>
                    <li class="breadcrumb-item active">Danh sách vụ cháy nổ</li>
                </ol>
            </nav>
        </div>
        <section class="section dashboard">
            <div class="card">
                <div class="card-body">
                    <div class="mt-4 mb-2 text-center">
                        <h3>
                            <b>Danh sách vụ cháy nổ</b>
                        </h3>
                        <span>Hiển thị danh sách tất cả các vụ cháy nổ sắp xếp theo thời gian gần nhất</span>
                    </div>

                    <form @submit.prevent="timkiemvuchayno">
                        <div class="row mb-2">
                            <div class="col-sm-4">
                                <label>Nội dung tìm kiếm</label>
                                <input type="text" class="form-control" v-model="timkiemobj.noiDung" />
                            </div>
                            <div class="col-sm-4">
                                <label>Nguyên nhân</label>
                                <input type="text" class="form-control" v-model="timkiemobj.nguyenNhan" />
                            </div>
                            <div class="col-sm-4">
                                <label>Chọn loại cháy/nổ</label>
                                <select class="form-select" v-model="timkiemobj.loaiVuChayNo">
                                    <option value="-1" selected>Tất cả</option>
                                    <option value="1" >Vụ cháy</option>
                                    <option value="2">Vụ nổ</option>
                                </select>
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
                                <label>Mức độ vụ cháy/nổ</label>

                                <select class="form-select" v-model="timkiemobj.maMucDoVuChayNo">
                                    <option v-for="mucdovuchayno in mucdovuchaynos" :key="mucdovuchayno.maMucDoVuChayNo"
                                        :value="mucdovuchayno.maMucDoVuChayNo">
                                        {{ mucdovuchayno.tenMucDoVuChayNo}}
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
                                <a href="/pccc/themvuchayno" style="color: white">
                                    Thêm vụ cháy/nổ
                                </a>
                            </button>
                            <button type="button" class="btn btn-info">Trích xuất</button>
                        </div>
                    </form>
                    <div class="row mt-3">
                        <div class="col-sm-7 d-flex justify-content-center  flex-column"
                            style="font-size: 14px; line-height: 1">
                            <p>Có <b>{{tongsovuchayno}}</b> vụ cháy/nổ được tìm thấy.</p>
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
                                    <th scope="col">Loại</th>
                                    <th scope="col">Mức độ vụ cháy/nổ</th>
                                    <th scope="col" width="25%">Nội dung</th>
                                    <th scope="col" width="25%">Nguyên nhân</th>
                                    <th scope="col">Ghi chú</th>                                
                                    <th scope="col">Tài sản thiệt hại (tr.đồng)</th>
                                    <th scope="col" width="7%" v-show="!is_CAT_User">Phê duyệt của đơn vị</th>
                                    <th scope="col" width="7%" v-show="!is_CAT_User && !is_PhongBan_User">Phê duyệt của cấp trên</th>
                                    <th scope="col">Chi tiết</th>
                                    <th scope="col">Sửa</th>
                                    <th scope="col">Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(vuchayno, index) in vuchaynos" :key="index">
                                    <td class="text-center">{{index +1 }}</td>
                                    <td>{{vuchayno.tenDonViThuLy}}</td>
                                    <td>{{vuchayno.tenQuanHuyen }}</td>
                                    <td>{{vuchayno.ngayXayRa}}</td>
                                    <td>{{vuchayno.ngayBaoCao}}</td>
                                    <td>{{vuchayno.laVuChay?'Cháy':'Nổ'}}</td>
                                    <td>{{vuchayno.tenMucDoVuChayNo}}</td>
                                    <td>{{vuchayno.noiDung}}</td>
                                    <td>{{vuchayno.nguyenNhan}}</td>            
                                    <td>{{vuchayno.ghiChu}}</td>                                    
                                    <td class="text-end"> {{vuchayno.taiSanThietHai}}</td>
                                    <td class="text-center" v-show="!is_CAT_User">
                                        <template v-if="vuchayno.trangThaiDonViPheDuyet=='Chưa duyệt' ">
                                            {{vuchayno.trangThaiDonViPheDuyet}}
                                        </template>
                                        <template v-if="vuchayno.trangThaiDonViPheDuyet=='Đang theo dõi'">
                                            <div class="text-danger">{{is_CAT_User?'Đang theo dõi':vuchayno.trangThaiDonViPheDuyet}} </div>
                                        </template>
                                        <template v-if="vuchayno.trangThaiDonViPheDuyet=='Đã duyệt'">
                                            <div class="text-success">{{is_CAT_User?'Đã gửi bộ':vuchayno.trangThaiDonViPheDuyet}}</div>
                                        </template>
                                        <div v-show="vuchayno.trangThaiCapTrenPheDuyet=='Chưa duyệt' || is_CAT_User">
                                            <button @click="pheduyetvuchayno_onclick(vuchayno.maVuChayNo);"
                                                class="btn btn-sm btn-primary ">Duyệt</button>
                                        </div>
                                    </td>
                                    <td v-show="!is_CAT_User && !is_PhongBan_User" class="text-center">
                                        <template v-if="vuchayno.trangThaiCapTrenPheDuyet=='Chưa duyệt'">
                                            <div class="text-primary">{{vuchayno.trangThaiCapTrenPheDuyet}} </div>
                                        </template>
                                        <template v-else-if="vuchayno.trangThaiCapTrenPheDuyet=='Đang theo dõi'">
                                            <div class="text-danger"> {{vuchayno.trangThaiCapTrenPheDuyet}}</div>
                                        </template>
                                        <template v-else>
                                            <div class="text-success">
                                                {{vuchayno.trangThaiCapTrenPheDuyet}}
                                            </div>
                                        </template>
                                    </td>
                                    <td class="text-center">
                                        <a :href="'/pccc/chitietvuchayno/'+vuchayno.maVuChayNo"><i class="bi bi-card-list"></i></a>
                                      </td>
                                    <td class="text-center">
                                        <i class="bi bi-pencil-square" role="button"
                                            @click="suavuchayno(vuchayno.maVuChayNo)"></i>
                                    </td>
                                    <td class="text-center">
                                        <i class="bi bi-trash" role="button"
                                            @click="xoavuchayno(vuchayno.maVuChayNo)"></i>
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
        <div class="modal modal-xl fade" id="modal_pheduyetvuchayno" tabindex="-1" aria-modal="true" role="dialog">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Phê duyệt Vụ cháy nổ</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label>Nội dung phê duyệt</label>
                        <input type="text" class="form-control" v-model="vuchaynopheduyet.noiDungPheDuyet" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="pheduyetvuchayno(1)">Duyệt</button>
                        <button type="button" class="btn btn-danger" @click="pheduyetvuchayno(2)">Không duyệt</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import PcccService from "../../services/pccc.service";

    export default {
        data() {
            return {
                quanhuyens: [], // Mảng lưu trữ các lĩnh vực
                donvis: [], // Mảng lưu trữ các lĩnh vực
                mucdovuchaynos: [], // Biến lưu trữ lựa chọn hiện tại
                vuchaynos: [],
                phan_trang_html: "",
                current_page_index: 1,
                num_row_one_page: 20,
                SoTrangTrenManHinh: 10,
                timkiemobj: {},
                tongsovuchayno: 0,
                vuchaynopheduyet: {},
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
                PcccService.laydulieudanhmuc().then(
                    (res) => {

                        loader.hide();
                        if (res.success) {
                            let list_danhmuc = res.data;

                            this.donvis = list_danhmuc[0];
                            this.timkiemobj.maDonViThuLy = this.donvis[0].maDonVi;
                            this.quanhuyens = list_danhmuc[1];
                            this.timkiemobj.maQuanHuyen = this.quanhuyens[0].maQuanHuyen;

                            this.mucdovuchaynos = list_danhmuc[2];
                            this.timkiemobj.maMucDoVuChayNo = this.mucdovuchaynos[0].maMucDoVuChayNo;
                            this.timkiemobj.loaiNgayTimKiem = 1;
                             this.timkiemobj.loaiVuChayNo = -1;
                            this.timkiemvuchayno();
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
            timkiemvuchayno() {
                let loader = this.$loading.show(this.LOADING_PARAM);
                this.timkiemobj.pageSize = this.num_row_one_page;
                this.timkiemobj.pageIndex = this.current_page_index; 
                PcccService.laydanhsachvuchayno(this.timkiemobj).then(
                    (res) => {
                        loader.hide();
                        if (res.success) {
                            this.vuchaynos = res.data;

                            this.tongsovuchayno = parseInt(res.alt);
                            this.phan_trang_html = this.getHTMLOfPageSplitter(
                                this.tongsovuchayno,
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
            suavuchayno(maVuChayNo) {
                this.$router.push('/pccc/suavuchayno/' + maVuChayNo);
            },
            xoavuchayno(maVuChayNo) {
                this.$swal.fire({
                    title: "Thông báo",
                    text: "Bạn có chắc muốn xóa vụ cháy/nổ này không?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Đồng ý",
                    cancelButtonText: "Không",
                }).then((result) => {
                    if (result.isConfirmed) {
                        let loader = this.$loading.show(this.LOADING_PARAM);
                        PcccService.xoavuchayno(maVuChayNo).then(
                            (res) => {
                                loader.hide();
                                if (res && res.success) {
                                    this.$swal.fire({
                                        title: "Thông báo",
                                        text: "Xóa vụ cháy/nổ thành công.",
                                        icon: "success"
                                    }).then((result) => {
                                        this.timkiemvuchayno();
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
           
            pheduyetvuchayno_onclick(mavuchayno) {
                this.vuchaynopheduyet = {
                    maVuChayNoPheDuyet: 0,
                    maVuChayNo: parseInt(mavuchayno),
                    noiDungPheDuyet: '',
                    loaiPheDuyet: 1,
                    ghiChu: ''
                }
                $('#modal_pheduyetvuchayno').modal('show');
            },
            pheduyetvuchayno(loaipheduyet) {
                this.vuchaynopheduyet.loaiPheDuyet = loaipheduyet;
                let loader = this.$loading.show(this.LOADING_PARAM);
                PcccService.pheduyetvuchayno(this.vuchaynopheduyet).then(
                    (res) => {
                        loader.hide();
                        $('#modal_pheduyetvuchayno').modal('hide');
                        if (res && res.success) {
                            this.$swal.fire({ title: "Thông báo!", text: "Thao tác thành công", icon: "success" }).then((result) => {
                                this.timkiemvuchayno();
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

                console.log((pageIndex - 1) / this.SoTrangTrenManHinh);
                startIdx =
                    Math.floor((pageIndex - 1) / this.SoTrangTrenManHinh) *
                    this.SoTrangTrenManHinh +
                    1;

                //thêm page trước
                if (startIdx <= this.SoTrangTrenManHinh) {
                    result +=
                        '<li class="page-vuviec disabled"><span class="page-link">Trước</span></li>';
                } else {
                    result += '<li class="page-vuviec">';
                    result +=
                        '<a class="page-link page-button" href="#" page-index="' +
                        (startIdx - 1) +
                        '">Trước</a></li>';
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
                        '<a class="page-link page-button" href="#" page-index="' +
                        (startIdx + this.SoTrangTrenManHinh) +
                        '">Sau</a></li>';
                } else {
                    result +=
                        '<li class="page-vuviec disabled"><span class="page-link">Sau</span></li>';
                }
                return result;
            },
            goto_page(page_index) {
                this.current_page_index = page_index;
                this.timkiemvuchayno();
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