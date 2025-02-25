<template>
  <div class="">
    <div class="row mt-3 mb-3">
      <div class="col-9" >
        <h2 class="text-center">Chi tiết vụ việc</h2>
        <table class="table table-bordered table-striped ">
          <col width="20%" />
          <col width="30%" />
          <col width="20%" />
          <col width="30%" />
          <tbody>
            <tr>
              <td class="text-end text-muted">Đơn vị thụ lý</td>
              <td colspan="3">{{ vuviec.tenDonViThuLy }}</td>
            </tr>
            <tr>
              <td class="text-end text-muted">Địa bàn xảy ra</td>
              <td colspan="3">{{ vuviec.tenQuanHuyen}} {{ vuviec.maPhuongXa!=0?'-'+ vuviec.tenPhuongXa:''}}</td>
            </tr>
            <tr>
              <td class="text-end text-muted">Ngày báo cáo</td>
              <td>{{ vuviec.ngayXayRa }}</td>
              <td class="text-end text-muted"> Ngày xảy ra </td>
              <td>{{ vuviec.ngayBaoCao }}</td>
            </tr>
            <tr>
              <td class="text-end text-muted">Tội danh</td>
              <td>{{ vuviec.tenToiDanh }}</td>
              <td class="text-end text-muted">Lĩnh vực vụ việc </td>
              <td> {{ vuviec.tenLinhVucVuViec }}</td>

            </tr>
            <tr>
              <td class="text-end text-muted">Nội dung vụ việc</td>
              <td colspan="3">{{ vuviec.noiDung }}</td>
            </tr>
            <tr>
              <td class="text-end text-muted">Ghi chú</td>
              <td colspan="3">{{ vuviec.ghiChu }}</td>
            </tr>
            <tr>
              <td class="text-end text-muted">Kết quả điều tra</td>
              <td>{{ vuviec.tenKetQuaDieuTra }}</td>
              <td class="text-end text-muted">Kết quả xử lý </td>
              <td> {{ vuviec.tenKetQuaXuLy }}</td>
            </tr>
            <tr>
              <td class="text-end text-muted">Mức độ vụ việc</td>
              <td>{{ vuviec.tenMucDoVuViec }}</td>

              <td class="text-end text-muted">Cấp xã thụ lý ban đầu</td>
              <td><i :class="vuviec.capXaThuLy?'bi bi-check-square':'bi bi-square'"></i></td>
            </tr>
            <tr>
              <td class="text-end text-muted">Đã gửi bộ</td>
              <td><i :class="vuviec.daGuiBo?'bi bi-check-square':'bi bi-square'"></i></td>

              <td class="text-end text-muted">QĐ phân công (Hồ sơ AD)</td>
              <td><i :class="vuviec.qdPhanCongHoSoAD?'bi bi-check-square':'bi bi-square'"></i></td>
            </tr>

           

          </tbody>
        </table>
      </div>
      <div class="col-3">
        <h4 class="text-center">Phụ lục </h4>
        <table class="table table-bordered table-sm table-striped small">
          <tbody>
            <tr>
              <td>Số người chết</td>
              <td>{{ vuviec.phuLucVuViec?.soNguoiChet }}</td>
            </tr>
            <tr>
              <td>Số người bị thương</td>
              <td>{{ vuviec.phuLucVuViec?.soNguoiBiThuong }}</td>
            </tr>
            <tr>
              <td>Số trẻ em bị xâm hại</td>
              <td>{{ vuviec.phuLucVuViec?.soTreEmGaiBiXamHai }}</td>
            </tr>
            <tr>
              <td> Tài sản thiệt hại (tr đồng)</td>
              <td>{{ vuviec.phuLucVuViec?.taiSanThietHai }}</td>
            </tr>
            <tr>
              <td> Tài sản thu hồi (tr đồng)</td>
              <td>{{ vuviec.phuLucVuViec?.taiSanThuHoi }}</td>
            </tr>
            <tr>
              <td> Súng (thu hồi)</td>
              <td>{{ vuviec.phuLucVuViec?.sung }}</td>
            </tr>
            <tr>
              <td>Thuốc nổ (kg) thu hồi</td>
              <td>{{ vuviec.phuLucVuViec?.thuocNo }}</td>
            </tr>
            <tr>
              <td>Heroin (g)</td>
              <td>{{ vuviec.phuLucVuViec?.heroin }} </td>
            </tr>
            <tr>
              <td>Thuốc phiện (g)</td>
              <td>{{ vuviec.phuLucVuViec?.thuocPhien }}</td>
            </tr>
            <tr>
              <td>Cần sa (g)</td>
              <td>{{ vuviec.phuLucVuViec?.canSa }}</td>
            </tr>
            <tr>
              <td>Cây có chứa chất ma túy</td>
              <td>{{ vuviec.phuLucVuViec?.cayCoChuaChatMaTuy }}</td>
            </tr>
            <tr>
              <td>Ma túy tổng hợp (g)</td>
              <td>{{ vuviec.phuLucVuViec?.maTuyTongHopGram }}</td>
            </tr>
            <tr>
              <td>Ma túy tổng hợp (viên)</td>
              <td>{{ vuviec.phuLucVuViec?.maTuyTongHopVien }}</td>
            </tr>
            <tr>
              <td>Loại ma túy khác (g)</td>
              <td>{{ vuviec.phuLucVuViec?.loaiMaTuyKhacGram }}</td>
            </tr>
            <tr>
              <td>Loại ma túy khác (ml)</td>
              <td>{{ vuviec.phuLucVuViec?.loaiMaTuyKhacMl }} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <h3 class="text-center">Danh sách đối tượng</h3>
      <div class="col-md-12">
        <table class="table table-bordered text-center table-sm small">
          <thead class="table-dark">
            <tr>
              <td width="3%">#</td>
              <td width="10%">Họ tên</td>
              <td width="5%">Ngày sinh</td>
              <td width="15%">Tội danh</td>
              <td width="10%">HKTT</td>
              <td width="10%">Nghề nghiệp</td>
              <td width="3%">Nữ giới</td>
              <td width="3%">Nghiện ma túy</td>
              <td width="3%">Tiền án tiền sự</td>
              <td width="3%">Khởi tố</td>
              <td width="3%">XL hành chính</td>
              <td width="10%">Tiền phạt (tr đồng)</td>

            </tr>
          </thead>
          <tbody>
            <template :key="idx" v-for="(doituong,idx) in vuviec.doiTuongs">
              <tr>
                <td>{{idx+1}}</td>
                <td>{{ doituong.hoTen }}</td>
                <td>{{ doituong.ngaySinh }}</td>
                <td>{{ doituong.tenToiDanh }}</td>
                <td>{{ doituong.tenTinhHKTT }}{{ doituong.maHuyenHKTT!=0?' - '+ doituong.tenHuyenHKTT:'' }}{{doituong.maXaHKTT!=0?' - '+doituong.tenXaHKTT:''  }}</td>
                <td>{{ doituong.tenNgheNghiepDoiTuong }}</td>
                <td><i :class="doituong.nuGioi?'bi bi-check-square':'bi bi-square'"></i></td>
                <td><i :class="doituong.nghienMaTuy?'bi bi-check-square':'bi bi-square'"></i></td>
                <td><i :class="doituong.tienAnTienSu?'bi bi-check-square':'bi bi-square'"></i></td>
                <td><i :class="doituong.khoiTo?'bi bi-check-square':'bi bi-square'"></i></td>
                <td><i :class="doituong.xLHC?'bi bi-check-square':'bi bi-square'"></i></td>
                <td class="text-end text-muted"> {{doituong.tienPhat}}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VuViecDetailComponent',
    props: ['id', 'modelValue', 'class'],
    setup(props) {
    },
    data() {

      return {
        render_key:0,
        vuviec:{}
      }      
    },
    mounted() {          
      this.$nextTick(function () {  
        this.vuviec = this.modelValue?this.modelValue:{};
     
      })

      
    }
   
  }
</script>