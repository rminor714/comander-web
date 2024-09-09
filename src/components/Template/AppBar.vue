<template>
  <div>
    <v-app-bar v-if="true" :color="$uiConfig.mainColor" elevation="0" app dark>
      <v-app-bar-nav-icon v-if="showMenu" @click="toogleSidebar" />
      <v-btn v-if="showBack" @click="(useAction)?returnEmit():goBack()" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer style="margin-left: -50px;" v-if="centerTitle"></v-spacer>
      <h2>{{ title ? title : getAppName }}</h2>
      <v-spacer v-if="centerTitle"></v-spacer>
      <slot></slot>
    </v-app-bar>
    <v-app-bar v-if="false" color="white" elevation="0" app dark>
      <v-app-bar-nav-icon class="mainColorText" v-if="showMenu" @click="toogleSidebar" />
      <v-btn v-if="showBack"  @click="goBack()" icon>
        <v-icon class="mainColorText">mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer style="margin-left: -50px;" v-if="centerTitle"></v-spacer>
      <h2 class="mainColorText">{{ title ? title : getAppName }}</h2>
      <v-spacer v-if="centerTitle"></v-spacer>
      <slot></slot>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      color="white"
      app
      clipped
      left
      :mini-variant="miniSidebar"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar :color="$uiConfig.mainColor">
            <span  class="white--text text-h5">
              M
            </span>
          </v-list-item-avatar>
          <v-list-item-content>
            <h3 class="mainColorText">
              {{ Nombre}}
            </h3>
            <v-list-item-subtitle>Mesero</v-list-item-subtitle>
            Version : {{ version }}
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list dense>
        <template v-for="(item, index) in menu">
          <v-list-item
            :key="index"
            class="mb-3 mainColorText"
            @click="$router.push(item.link)"
          >
            <v-list-item-icon>
              <v-icon class="mainColorText">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <h3 class="mainColorText">{{ item.title }}</h3>
            </v-list-item-content>
          </v-list-item>
        </template>
       
        <v-list-item class="mb-3 mainColorText" @click="reloadForUpdate()">
          <v-list-item-icon>
            <v-icon class="mainColorText">mdi-update</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <h3 class="mainColorText">Actualizar App</h3>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout()">
          <v-list-item-icon>
            <v-icon class="mainColorText">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <h3 class="mainColorText">Cerrar Sesión</h3>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
//import Swal from 'sweetalert2'
//import { mapGetters } from "vuex";
import { version } from "../../../package";
export default {
  name: "AppBar",
  components: {},
  props: {
    title: String,
    profileName: String,
    useAction: { type: Boolean, default: false },
    showMenu: { type: Boolean, default: false },
    showBack: { type: Boolean, default: false },
    centerTitle: { type: Boolean, default: false },
  },
  data() {
    return {
      indexUpdate:0,
      dialogMode: false,
      drawer: false,
      miniSidebar: false,
    };
  },
  computed: {
    menu() {
      let playerData = [
        {title:"Configuración", icon: "mdi-cogs", link: "/configuracion"},
        {title:"Galeria", icon: "mdi-image-multiple", link: "/galeria"}
        /*{ title: this.$t("My Tournaments"), icon: "mdi-view-list", link: "/mytournaments" },
        { title: this.$t("Support"), icon: "mdi-face-agent", link: "/support" },*/
        /*{ title: "Configuration", icon: "mdi-cogs", link: "/config" },*/
      ];
      return playerData;
    },
    appMode(){
      return localStorage.getItem('appMode')
    },
    isAdminPlayer() {
      return false;
    },
    version() {
      return version;
    },
    Nombre(){
      return "TEST"
    }
  },
  methods: {
    returnEmit(){
      this.$emit("customAction")
    },
    goBack(){
      const history = window.history.length;
      if (history > 2) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },
    /*setAppMode(mode){
      localStorage.setItem('appMode',mode);
      this.dialogMode = false
      this.indexUpdate++;
    },*/
    reloadForUpdate() {
      location.reload();
    },
    toogleSidebar() {
      this.drawer = !this.drawer;
      //this.miniSidebar = !this.miniSidebar
    },
    async logout() {
      
    },
  },
  async mounted() {
  },
};
</script>
<style scoped>
</style>