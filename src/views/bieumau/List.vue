
<template>
    <div class="bieumau-list">
        <div class=" px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h2 class="display-4">Danh sách Biểu Mẫu</h2>
            <p><router-link to="/bieumau/create">Thêm mới</router-link></p>
          </div>
          <div class="container">
            <div class="card-deck mb-3 text-center">
              <table class="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th scope="col" width="10%">STT</th>
                    <th scope="col" width="40%">Tên Biểu mẫu</th>
                    <th scope="col" width="20%">Mô tả</th>
                    <th scope="col" width="30%">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="index" v-for="(bieumau,index) in bieumaus">
                    <th scope="row">{{bieumau.maBieuMau}}</th>
                    <td>{{bieumau.tenBieuMau}}</td>
                    <td>{{bieumau.moTa}}</td>
                    <td>
                       <button class="btn btn-info btn-sm" @click="xulyphanquyen(bieumau.maBieuMau)">Phân quyền</button>&nbsp;
                      <router-link :to="{name: 'bieumau.edit', params:{id:bieumau.maBieuMau}}">
                      <button class="btn btn-primary btn-sm">Sửa</button></router-link>&nbsp;
                      
                      <button class="btn btn-danger btn-sm" @click="onDelete(bieumau.maBieuMau)">Xóa</button>
                    </td>
                  </tr>
                 
                </tbody>
              </table>
            </div>
          </div>
               
    </div>
</template>
<script>
import BaoCaoService from "../../services/baocao.service";
  export default {
      name: 'bieumauList',
      
      data(){
          return{             
              bieumaus:[]
          }
      },
      created(){
        this.getAll()
      },
      methods:{
       
        getAll(){
          let loader = this.$loading.show(this.LOADING_PARAM);
          
          BaoCaoService.laydanhsachbieumau().then(
            (res) => {           
           
              this.bieumaus = res.data;
              loader.hide()
            },
            (error) => {
             console.log(
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString());
               
                loader.hide()
            }
          );
         
        },
        xulyphanquyen(mabieumau){
           this.$router.push({name:'bieumau.phanquyen', params:{      
                  mabieumau:mabieumau}} );
        },
        onDelete(mabieumau){
              this.$swal.fire({
              title: 'Do you want to save the changes?',
              showDenyButton: false,
              showCancelButton: true,
              confirmButtonText: 'OK',
             
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
                if(result.isConfirmed)
                {
                  //app.use(authHeader);
                  this.$request.delete(process.env.VUE_APP_ROOT_API +`BieuMau/${mabieumau}`).then(res=> {
                    if(res.data.success){
                      this.getAll()
                      this.$swal.fire('Deleted!', '', 'success')
                    }
                  })
                  
                }
            })
        }
      }
    }
  </script>