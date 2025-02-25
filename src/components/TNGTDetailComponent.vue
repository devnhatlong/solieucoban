<template>
  <div class="">
    <div class="row mt-3 mb-3">
      <div class="col-12">
        <h2 class="text-center">Chi tiết vụ TNGT</h2>
        <table class="table table-bordered table-striped ">
          <col width="20%" />
          <col width="30%" />
          <col width="20%" />
          <col width="30%" />
          <tbody>
            <tr>
              <td class="text-end text-muted">Đơn vị thụ lý</td>
              <td colspan="3">{{ tngt.tenDonViThuLy }}</td>
            </tr>
            <tr>
              <td class="text-end text-muted">Địa bàn xảy ra</td>
              <td colspan="3">{{ tngt.tenQuanHuyen}}</td>
            </tr>
            <tr>
              <td class="text-end text-muted">Ngày báo cáo</td>
              <td>{{ tngt.ngayXayRa }}</td>
              <td class="text-end text-muted"> Ngày xảy ra </td>
              <td>{{ tngt.ngayBaoCao }}</td>
            </tr>

            <tr>
              <td class="text-end text-muted">Nội dung</td>
              <td colspan="3">{{ tngt.noiDung }}</td>
            </tr>
         
            <tr>
              <td class="text-end text-muted">Mức độ TNGT</td>
              <td>{{ tngt.tenMucDoTNGT }}</td>

              <td class="text-end text-muted">Đã chốt số liệu</td>
              <td><i :class="tngt.daChotSoLieu?'bi bi-check-square':'bi bi-square'"></i></td>
            </tr>
            <tr>
              <td class="text-end text-muted">Số người chết</td>
              <td>{{ tngt.soNguoiChet }}</td>

              <td class="text-end text-muted">Số người bị thương</td>
              <td>{{ tngt.soNguoiBiThuong }}</td>
            </tr>
            <tr>
              <td class="text-end text-muted">Số ô tô bị hư hỏng</td>
              <td>{{ tngt.soOtoHuHong }}</td>

              <td class="text-end text-muted">Số mô tô bị hư hỏng</td>
              <td>{{ tngt.soMotoHuHong }}</td>
            </tr>
            <tr>
              <td class="text-end text-muted">Ghi chú</td>
              <td colspan="3">{{ tngt.ghiChu }}</td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'TNGTDetailComponent',
    props: ['id', 'modelValue', 'class'],
    setup(props) {
    },
    data() {

      return {
        render_key: 0,
        tngt: {}
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.tngt = this.modelValue ? this.modelValue : {};

      })


    }

  }
</script>