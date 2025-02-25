<template>
    <div class="user-list">
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h2 class="display-4">Quản lý tài khoản</h2>
            <p><router-link to="/taikhoan/create">Thêm tài khoản</router-link></p>
          </div>
          <div class="container">
            <div class="card-deck mb-3 text-center">
              <table class="table table-bordered table-sm">
                <thead>
                    <th scope="row">1</th>
                    <th>Tài khoản</th>
                    <th>Tên Đơn vị</th>
                    <th>Loại tài khoản</th>
                 
                    <th>Thao tác</th>
                  
                </thead>
                <tbody>
                  <tr :key="index" v-for="(user,index) in users">
                            <td>{{index + 1}}</td>
                            <td>{{user.tenTaiKhoan}}</td>
                            <td>{{user.tenDonVi}}</td>
                            <td>{{user.tenLoaiTaiKhoan}}</td>
                           
                            <td><button class="btn btn-primary btn-sm">Chỉnh sửa</button></td>
                        </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
               
    </div>
</template>
<script>
export default {
  name: 'TaiKhoan.DanhSach',
   
      data(){
          return{     
              user:{},        
              users:[]
          }
      },
       created(){
        this.user = this.$store.state.auth.user;
        this.getAll()
      },
      methods:{
            getAll(){
            let loader = this.$loading.show(this.LOADING_PARAM);        
          
            this.$request.get(process.env.VUE_APP_ROOT_API +`taikhoan`).then(res=> {
                    if(res.data.success){
                      console.log(res.data.data);
                      this.users = res.data.data;                   
                     
                    }
                    loader.hide();
                  })
        },
    },
    mounted() {
    if (!this.user) {
      this.$router.push('/login');
    }
  }
};
</script>