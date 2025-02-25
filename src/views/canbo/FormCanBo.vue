<template>
    <div id="main" class="main">
        <div class="pagetitle">
            <h1>Danh sách cán bộ</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
                    <li class="breadcrumb-item">Tổ chức, cán bộ</li>
                    <li class="breadcrumb-item active">Danh sách</li>
                </ol>
            </nav>
        </div>
        <section class="section dashboard">
            <div class="row accordion" id="accordion">
                <div class="card info-card customers-card">
                    <div class="filter">

                        <a class="icon-collapse text-black " href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapse_1">
                            <i class="bi bi-chevron-down ms-auto"></i>
                        </a>

                    </div>
                    <div class="card-body ">
                        <h5 class="card-title">Thông tin chung
                        </h5>
                        <div></div>
                        <div class="collapse show" id="collapse_1" data-bs-parent="#accordion">
                            <form @submit.prevent="save()">
                                <div class="row mb-3">
                                    <label class="col-sm-2 col-form-label">Họ tên </label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="canbo.hoTenCanBo" />
                                    </div>

                                    <label class="col-sm-2 col-form-label">Ngày sinh</label>
                                    <div class="col-sm-4">
                                        <input type="date" class="form-control" v-model="canbo.ngayThangNamSinh" />
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <label class="col-sm-2 col-form-label">Quê Quán</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="canbo.queQuan" />
                                    </div>

                                    <label class="col-sm-2 col-form-label">Nơi sinh</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="canbo.quequan" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-sm-2 col-form-label">HKTT</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="canbo.hktt" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-sm-2 col-form-label">Chổ ở hiện nay</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="canbo.hktt" />
                                    </div>
                                </div>
                                <div class="row mb-3">

                                    <label class="col-sm-2 col-form-label">Đơn vị</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="canbo.tenDonViDayDu" />
                                    </div>
                                    <label class="col-sm-2 col-form-label">Số hiệu CAND</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="canbo.tencanbo" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-sm-2 col-form-label">Ngày vào Ngành</label>
                                    <div class="col-sm-4">
                                        <input type="date" class="form-control" />
                                    </div>

                                    <label class="col-sm-2 col-form-label">Ngày về đơn vị</label>
                                    <div class="col-sm-4">
                                        <input type="date" class="form-control" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-sm-2 col-form-label">Ngày vào đảng</label>
                                    <div class="col-sm-4">
                                        <input type="date" class="form-control" />
                                    </div>

                                    <label class="col-sm-2 col-form-label">Chính thức</label>
                                    <div class="col-sm-4">
                                        <input type="date" class="form-control" />
                                    </div>
                                </div>




                                <div class="row mb-3">
                                    <label class="col-sm-2 col-form-label">Nhiệm kỳ quy hoạch đảng</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="canbo.tencanbo" />
                                    </div>

                                    <label class="col-sm-2 col-form-label">Nhiệm kỳ quy hoạch chính
                                        quyền</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="canbo.tencanbo" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-sm-2 col-form-label">Tiêu chuẩn chính trị</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="canbo.tencanbo" />
                                    </div>

                                    <label class="col-sm-2 col-form-label">Năm thực hiện</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="canbo.tencanbo" />
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <label class="col-sm-2 col-form-label">Huy chương</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="canbo.tencanbo" />
                                    </div>

                                    <label class="col-sm-2 col-form-label">Số thẻ BHYT</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="canbo.tencanbo" />
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <label class="col-sm-3 col-form-label"></label>
                                    <div class="col-sm-9 text-left">
                                        <button type="submit" class="btn btn-primary">Lưu</button> &nbsp;
                                        <button type="reset" class="btn btn-danger">Hủy</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="card ">
                    <div class="filter">
                        <a class="icon-collapse text-black " href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapse_2">
                            <i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Cấp bậc
                        </h5>
                        <div class="collapse" id="collapse_2" data-bs-parent="#accordion">
                            <table class="table table-bordered table-sm text-center">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên cấp bậc</th>
                                        <th>Ngày tháng năm</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>1</td>
                                    <td>Thiếu úy</td>
                                    <td>Tháng 6/2020</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Trung úy</td>
                                    <td>Tháng 6/2022</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card info-card customers-card">
                    <div class="filter">
                        <a class="icon-collapse text-black " href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapse_3">
                            <i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Trình độ nghiệp vụ
                        </h5>
                        <div class="collapse" id="collapse_3" data-bs-parent="#accordion">
                            <table class="table table-bordered table-sm text-center">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Trình độ</th>
                                        <th>Ngày tháng năm</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>1</td>
                                    <td>?</td>
                                    <td>Tháng 6/2020</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>?</td>
                                    <td>Tháng 6/2022</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card info-card customers-card">
                    <div class="filter">
                        <a class="icon-collapse text-black " href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapse_4">
                            <i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Trình độ chuyên môn
                        </h5>
                        <div class="collapse" id="collapse_4" data-bs-parent="#accordion">
                            <table class="table table-bordered table-sm">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Trình độ</th>
                                        <th>Ngày tháng năm</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>1</td>
                                    <td>?</td>
                                    <td>Tháng 6/2020</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>?</td>
                                    <td>Tháng 6/2022</td>
                                </tr>
                            </table>
                        </div>

                    </div>
                </div>
                <div class="card info-card customers-card">
                    <div class="filter">
                        <a class="icon-collapse text-black " href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapse_5">
                            <i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Trình độ ngoại ngữ
                        </h5>
                        <div class="collapse" id="collapse_5" data-bs-parent="#accordion">
                            <table class="table table-bordered table-sm">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Trình độ</th>
                                        <th>Ngày tháng năm</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>1</td>
                                    <td>?</td>
                                    <td>Tháng 6/2020</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>?</td>
                                    <td>Tháng 6/2022</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card info-card customers-card">
                    <div class="filter">
                        <a class="icon-collapse text-black " href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapse_6">
                            <i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Trình độ tin học
                        </h5>
                        <div class="collapse" id="collapse_6" data-bs-parent="#accordion">
                            <table class="table table-bordered table-sm">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Trình độ</th>
                                        <th>Ngày tháng năm</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>1</td>
                                    <td>?</td>
                                    <td>Tháng 6/2020</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>?</td>
                                    <td>Tháng 6/2022</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card info-card customers-card">
                    <div class="filter">
                        <a class="icon-collapse text-black " href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapse_7">
                            <i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Trình độ lý luận chính trị
                        </h5>
                        <div class="collapse" id="collapse_7" data-bs-parent="#accordion">
                            <table class="table table-bordered table-sm">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>STT</th>
                                        <th>Trình độ</th>
                                        <th>Ngày tháng năm</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>1</td>
                                    <td>?</td>
                                    <td>Tháng 6/2020</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>?</td>
                                    <td>Tháng 6/2022</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card info-card customers-card">
                    <div class="filter">
                        <a class="icon-collapse text-black " href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapse_8">
                            <i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Xếp loại cán bộ
                        </h5>
                        <div class="collapse" id="collapse_8" data-bs-parent="#accordion">
                            <table class="table table-bordered table-sm">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>STT</th>
                                        <th>Xếp loại cán bộ</th>
                                        <th>Ngày tháng năm</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>1</td>
                                    <td>Hoàn thành tốt nhiệm vụ</td>
                                    <td>2020</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Hoàn thành tốt nhiệm vụ</td>
                                    <td>2021</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Hoàn thành tốt nhiệm vụ</td>
                                    <td>2022</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Hoàn thành tốt nhiệm vụ</td>
                                    <td>2023</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card info-card customers-card">
                    <div class="filter">
                        <a class="icon-collapse text-black " href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapse_9">
                            <i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Xếp loại đảng viên
                        </h5>
                        <div class="collapse" id="collapse_9" data-bs-parent="#accordion">
                            <table class="table table-bordered table-sm">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Xếp loại cán bộ</th>
                                        <th>Ngày tháng năm</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>1</td>
                                    <td>Hoàn thành tốt nhiệm vụ</td>
                                    <td>2020</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Hoàn thành tốt nhiệm vụ</td>
                                    <td>2021</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Hoàn thành tốt nhiệm vụ</td>
                                    <td>2022</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Hoàn thành tốt nhiệm vụ</td>
                                    <td>2023</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card info-card customers-card">
                    <div class="filter">
                        <a class="icon-collapse text-black " href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapse_10">
                            <i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Phân loại thi đua
                        </h5>
                        <div class="collapse" id="collapse_10" data-bs-parent="#accordion">
                            <table class="table table-bordered table-sm">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>STT</th>
                                        <th>Phân loại thi đua</th>
                                        <th>Ngày tháng năm</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>1</td>
                                    <td>Chiến sĩ tiên tiến</td>
                                    <td>2020</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td></td>
                                    <td>2021</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Chiến sĩ tiên tiến</td>
                                    <td>2022</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Chiến sĩ thi đua</td>
                                    <td>2023</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card info-card customers-card">
                    <div class="filter">
                        <a class="icon-collapse text-black " href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapse_11">
                            <i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Thông tin nghỉ dưỡng
                        </h5>
                        <div class="collapse" id="collapse_11" data-bs-parent="#accordion">
                            <table class="table table-bordered table-sm">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Xếp loại cán bộ</th>
                                        <th>Ngày tháng năm</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>1</td>
                                    <td>Hoàn thành tốt nhiệm vụ</td>
                                    <td>2020</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Hoàn thành tốt nhiệm vụ</td>
                                    <td>2021</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Hoàn thành tốt nhiệm vụ</td>
                                    <td>2022</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Hoàn thành tốt nhiệm vụ</td>
                                    <td>2023</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>
<script>

    import CanBoService from "../../services/canbo.service";

    export default {
        data() {
            return {
                canbo: {
                    tencanbo: "",
                    madonvi: "18",
                    quequan: "",
                    hktt: "",
                    ngaysinh: ""
                }
            };
        },
        methods: {
            save() {
                let loader = this.$loading.show(this.LOADING_PARAM);

                CanBoService.luucanbo(this.canbo).then(
                    (res) => {

                        console.log(res);
                        loader.hide()
                    },
                    (error) => {
                        console.log(
                            (error.response && error.response.data && error.response.data.message) || error.message || error.toString());
                        loader.hide()
                    }
                );
            }
        }
    }
</script>