<template>
  <div id="main" class="main">
    <div class="pagetitle">
      <h1>Danh sách nhật ký hoạt động</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
          <li class="breadcrumb-item">Nhật ký sử dụng</li>
        </ol>
      </nav>
    </div>

    <section class="section">
      <div class="card">
        <div class="card-body">
          <h3 style="text-align: center; margin-top: 1%">
            Hiển thị danh sách tất cả hoạt động theo thời gian gần nhất
          </h3>
          <form>
            <div class="mb-3">
              <label for="inputText" class="form-label"
                >Tìm theo nội dung</label
              >
              <input type="text" class="form-control" id="inputText" />
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="inputDateFrom" class="form-label">Từ ngày</label>
                <input type="date" class="form-control" id="inputDateFrom" />
              </div>
              <div class="col-md-6">
                <label for="inputDateTo" class="form-label">Đến ngày</label>
                <input type="date" class="form-control" id="inputDateTo" />
              </div>
            </div>
            <div class="mb-3 text-center">
              <button type="submit" class="btn btn-primary">Tìm kiếm</button>
            </div>
          </form>
          <p>Có <b>0</b> hoạt động được tìm thấy.</p>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tài khoản</th>
                <th scope="col">Thời gian</th>
                <th scope="col">Thao tác</th>
                <th scope="col">Nội dung</th>
                <th scope="col">Chi tiết</th>
                <th scope="col">Xóa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>phongpv01</td>
                <td>24/10/2024 3:51:22 PM</td>
                <td>Sửa vụ việc</td>
                <td>
                  Mã vụ việc: 34363 Trạng thái duyệt thay đổi từ Không sang Có
                </td>
                <td style="text-align: center; cursor: pointer">
                  <i
                    data-bs-toggle="modal"
                    data-bs-target="#ModalNhatky"
                    class="bi bi-clipboard-check"
                  ></i>
                  <div class="modal fade" id="ModalNhatky" tabindex="-1">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Chi tiết</h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <p>Mã vụ việc: 34363</p>
                          <p>Trạng thái duyệt thay đổi từ Không sang Có</p>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Đóng
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td style="text-align: center; cursor: pointer">
                  <i class="bi bi-trash"></i>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>phongpv01</td>
                <td>24/10/2024 3:51:22 PM</td>
                <td>Sửa vụ việc</td>
                <td>
                  Mã vụ việc: 34363 Trạng thái duyệt thay đổi từ Không sang Có
                </td>
                <td style="text-align: center; cursor: pointer">
                  <i class="bi bi-clipboard-check"></i>
                </td>
                <td style="text-align: center; cursor: pointer">
                  <i class="bi bi-trash"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>
