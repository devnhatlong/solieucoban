
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
    <section class="section">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Danh sách cán bộ
                </h5>
            
              <table class="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th scope="col" >STT</th>
                    <th scope="col" >Tên cán bộ</th>
                    <th scope="col" >Đơn vị</th>
                    <th scope="col" >Ngày Sinh</th>
                    <th scope="col" >Quê quán</th>                    
                    <th scope="col" >HKTT</th>
                    <th scope="col" >Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="index" v-for="(canbo,index) in canbos">
                    <td>{{index + 1}}</td>
                    <td>{{canbo.tenCanBo}}</td>
                    <td>{{canbo.tenDonVi}}</td>                  
                    <td>{{canbo.ngaySinh}}</td>
                    <td>{{canbo.queQuan}}</td> 
                    <td>{{canbo.hktt}}</td> 
                    <td> <button type="button" class="btn btn-sm btn-primary" @click="goto_themcanbo">Sửa</button>
                      &nbsp;<button type="button" class="btn btn-sm btn-info" @click="goto_themcanbo">Chi tiết</button></td> 
                  </tr>
                 
                </tbody>
              </table>
              <button type="button" class="btn btn-sm btn-primary" @click="goto_themcanbo">Thêm Cán bộ</button>
          </div>
          
    </div>
    </section>
  </div>
</template>
<script>
import CanBoService from "../../services/canbo.service";
import AuthService from "../../services/auth.service";
  export default {
      name: 'canbo.list',
      data(){
          return{             
            canbos:[]
          }
      },
      created(){
        this.getListCanBo();
      },
      methods:{       
        getListCanBo(){
          let loader = this.$loading.show(this.LOADING_PARAM);          
          CanBoService.laydanhsachcanbo().then(
            (res) => {
              this.canbos = res.data;    
              console.log(this.canbos);
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
        goto_themcanbo(){
          this.$router.push('/canbo/themcanbo');
        }   
       
      }
    }
  </script>