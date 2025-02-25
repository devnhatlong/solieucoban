<template>

  <div class="container-xl px-4 mt-4 row">
    <!-- Account page navigation-->
    <div class="col-3">
      <TheMenu :isShow="2"/>
    </div>
        <div class="col-9">
        <div class="card mb-4">
            <div class="card-header">Danh sách biểu mẫu</div>
            <div class="card-body p-0 ">
                <!-- Billing history table-->
                <div class="">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="border-gray-200" scope="col">STT</th>
                                <th class="border-gray-200" scope="col">Tên Biểu mẫu</th>
                                <th class="border-gray-200" scope="col">Quyền</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr :key="index" v-for="(phanquyen,index) in phanquyens">
                            <td>{{index + 1}}</td>
                            <td>{{phanquyen.tenBieuMau}}</td>
                            <td v-if="phanquyen.quyen==1"><font-awesome-icon icon="file-lines" /> &nbsp; Báo cáo</td>
                            <td v-if="phanquyen.quyen==2"> <font-awesome-icon icon="layer-group" /> &nbsp; Tổng hợp</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </div>

</template>

<script>
import TheMenu from './Menu';
export default {
  name: 'ProfileBieuMau',
    components:{
        TheMenu,
      },
      data(){
          return{     
              user:{},        
              phanquyens:[]
          }
      },
       created(){
        this.user = this.$store.state.auth.user;
        this.getAll()
      },
      methods:{
            getAll(){
            let loader = this.$loading.show(this.LOADING_PARAM);        
   
            this.$request.get(process.env.VUE_APP_ROOT_API +`PhanQuyen/taikhoan/${this.user.maTaiKhoan}`).then(res=> {
                    if(res.data.success){
                      this.phanquyens = res.data.data;                   
                      loader.hide();
                    }
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