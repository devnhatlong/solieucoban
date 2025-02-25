<template>
  <div class="">
    <div class="row mt-3 mb-3">
      <div class="col-12">
        <h2 class="text-center">Chi tiết vụ cháy/nổ</h2>
        <table class="table table-bordered table-striped ">
          <col width="20%" />
          <col width="30%" />
          <col width="20%" />
          <col width="30%" />
          <tbody>
            <tr>
              <td class="text-end text-muted">Đơn vị thụ lý</td>
              <td colspan="3">{{ vuchayno.tenDonViThuLy }}</td>
            </tr>
            <tr>
              <td class="text-end text-muted">Địa bàn xảy ra</td>
              <td colspan="3">{{ vuchayno.tenQuanHuyen}}</td>
            </tr>
            <tr>
              <td class="text-end text-muted">Ngày báo cáo</td>
              <td>{{ vuchayno.ngayXayRa }}</td>
              <td class="text-end text-muted"> Ngày xảy ra </td>
              <td>{{ vuchayno.ngayBaoCao }}</td>
            </tr>

            <tr>
              <td class="text-end text-muted">Nội dung</td>
              <td colspan="3">{{ vuchayno.noiDung }}</td>
            </tr>
            <tr>
              <td class="text-end text-muted">Nguyên nhân</td>
              <td colspan="3">{{ vuchayno.nguyenNhan }}</td>
            </tr>
            <tr>
              <td class="text-end text-muted">Loại</td>
              <td>{{ vuchayno.laVuChay?'Vụ cháy':'vụ nổ' }}</td>
        
              <td class="text-end text-muted">Mức độ vụ cháy/nổ</td>
              <td>{{ vuchayno.tenMucDoVuChayNo }}</td>
            </tr>
            <tr>
              <td class="text-end text-muted">Tài sản thiệt hại (triệu đồng)</td>
              <td>{{ vuchayno.taiSanThietHai }}</td>
              <td class="text-end text-muted">Số người chết</td>
              <td>{{ vuchayno.soNguoiChet }}</td>

             
            </tr>
            <tr>
             
              <td class="text-end text-muted">Số người bị thương nặng</td>
              <td>{{ vuchayno.soNguoiBiThuongNang }}</td>
              <td class="text-end text-muted">Số người bị thương nhẹ</td>
              <td>{{ vuchayno.soNguoiBiThuongNhe }}</td>
            </tr>
            <tr>
             
              <td class="text-end text-muted">Ghi chú</td>
              <td >{{ vuchayno.ghiChu }}</td>
              <td class="text-end text-muted">Đã chốt số liệu</td>
              <td><i :class="vuchayno.daChotSoLieu?'bi bi-check-square':'bi bi-square'"></i></td>
             
            </tr>
         
           
          </tbody>
        </table>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'VuChayNoDetailComponent',
    props: ['id', 'modelValue', 'class'],
    setup(props) {
    },
    data() {

      return {
        render_key: 0,
        vuchayno: {}
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.vuchayno = this.modelValue ? this.modelValue : {};

      })


    }

  }
</script>