<template>
  <div id="app">
    <Header v-if="!$route.meta.hideNavbar"/>
    <Sidebar v-if="!$route.meta.hideNavbar"/>
    <router-view />
  </div>
</template>


<script>

  import EventBus from "./common/EventBus";
  import Header from './views/Header.vue';
  import Sidebar from './views/Sidebar.vue';
  export default {
    name: 'App',
    components: {
      Header,
      Sidebar
    },
    created(){
      
    },

    computed: {

      showAdminBoard() {
        if (this.currentUser && this.currentUser['roles']) {
          return this.currentUser['roles'].includes('ROLE_ADMIN');
        }
        return false;
      },
      showModeratorBoard() {
        if (this.currentUser && this.currentUser['roles']) {
          return this.currentUser['roles'].includes('ROLE_MODERATOR');
        }
        return false;
      }
    },

    methods: {
      logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      },
      gotologin() {
        this.$router.push('/login');
      }
    },
    mounted() {
      EventBus.on("logout", () => {
        this.logOut();
      });
      EventBus.on("gotologin", () => {
        this.gotologin();
      });
    },
    beforeUnmount() {
      EventBus.remove("logout");
      EventBus.remove("gotologin");
    }
  };

</script>