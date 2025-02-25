<template>
 <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">

    <router-link  class="nav-link" to="/profile" :class="{ active: isShow==1 }">Thông tin</router-link>
    <router-link  to="/profile/cauhinh" class="nav-link"  :class="{ active: isShow==2 }">Cấu hình ứng dụng</router-link>
    <router-link  to="/profile/doimatkhau" class="nav-link" :class="{ active: isShow== 3}">Đổi mật khẩu</router-link>

 </div>
</template>
<script>
    export default {
        name: 'ProfileMenu',
        computed: {
        currentUser() {
            if(this.$store.state.auth.user){       
                return this.$store.state.auth.user;}
            },
        },
        props: {
        isShow : {
           type: Number,
           default: 1
        }},
        computed: {
            is_CAT_User(){
                return this.$store.getters['auth/is_CAT_User'];
            }
        }
    };
</script>
<style>
div.container-xl{margin-top:20px;
  margin-bottom:20px;

  color:#69707a;
}
.img-account-profile {
    height: 10rem;
}
.rounded-circle {
    border-radius: 50% !important;
}
.card {
    box-shadow: 0 0.15rem 0.75rem 0 rgb(33 40 50 / 15%);
}
.card .card-header {
    font-weight: 500;
}
.card-header:first-child {
    border-radius: 0.35rem 0.35rem 0 0;
}
.card-header {
    padding: 1rem 1.35rem;
    margin-bottom: 0;
    background-color: rgba(33, 40, 50, 0.03);
    border-bottom: 1px solid rgba(33, 40, 50, 0.125);
}
.nav-borders .nav-link.active {
    color: #0061f2;
    
}
.nav-borders .nav-link {
    color: #69707a;
    border-bottom-width: 0.125rem;
    border-bottom-style: solid;
    border-bottom-color: transparent;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0;
    padding-right: 0;
    margin-left: 1rem;
    margin-right: 1rem;
}
</style>