<template>
    <div class="container">
      <!-- Account page navigation-->
      <h3 class="pt-4">
           
      </h3>
      <div class="card-deck mb-3 text-center">
        <div class="card mb-4 shadow-sm">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Chấm điểm CCHC</h4>
          </div>
          <div class="card-body">
            <h4 class="card-title pricing-card-title">&nbsp;</h4>
            <ul class="list-unstyled mt-3 mb-4">
              <li>&nbsp;</li>
              <li>&nbsp;</li>
              <li>&nbsp;</li>
              <li>&nbsp;</li>
            </ul>
       
                   
            <button type="button" class="btn btn-lg btn-block btn-outline-primary" @click="chamdiemcchc">Enter</button>  
          </div>
        </div>
        <div class="card mb-4 shadow-sm">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Công nghệ thông tin</h4>
          </div>
          <div class="card-body">
            <h4 class="card-title pricing-card-title">&nbsp;</h4>
            <ul class="list-unstyled mt-3 mb-4">
              <li>&nbsp;</li>
              <li>&nbsp;</li>
              <li>&nbsp;</li>
              <li>&nbsp;</li>
            </ul>
            <button type="button" class="btn btn-lg btn-block btn-primary" @click="thamdinhcchc">Enter</button>
          </div>
        </div>
        <div class="card mb-4 shadow-sm">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Biểu mẫu An ninh</h4>
          </div>
          <div class="card-body">
            <h4 class="card-title pricing-card-title">&nbsp;</h4>
            <ul class="list-unstyled mt-3 mb-4">
              <li>&nbsp;</li>
              <li>&nbsp;</li>
              <li>&nbsp;</li>
              <li>&nbsp;</li>
            </ul>
            <button type="button" class="btn btn-lg btn-block btn-primary" @click="thamdinhcchc">Enter</button>
          </div>
        </div>
        <div class="card mb-4 shadow-sm">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Quản lý cán bộ </h4>
          </div>
          <div class="card-body">
            <h4 class="card-title pricing-card-title">&nbsp;</h4>
            <ul class="list-unstyled mt-3 mb-4">
              <li>&nbsp;</li>
              <li>&nbsp;</li>
              <li>&nbsp;</li>
              <li>&nbsp;</li>
            </ul>
            <button type="button" class="btn btn-lg btn-block btn-primary" @click="goto_CanBo">Enter</button>
          </div>
        </div>
      </div>
     
    </div>
</template>
<script>
       
  import BaoCaoService from "../services/baocao.service";
  import api from "../services/api";
  export default{
      name:'HomeView',
      data(){
          return{  
           
          }
      },
      created(){
        this.chamdiemcchc();
      },
      methods:{
        chamdiemcchc(){        
          this.$router.push('/chamdiemcchc/dashboard');
        }, 
        goto_CanBo(){
          this.$router.push('/canbo');
        }      
      }
    }
</script>
