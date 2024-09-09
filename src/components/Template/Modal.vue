<template>
  <v-dialog
    v-model="value"
    :fullscreen="fullscreen"
    transition="dialog-bottom-transition"
    max-width="800"
  >
    <v-card elevation="0">
      <v-toolbar dark :color="$uiConfig.mainColor">
        <v-btn v-if="!hideCloseBtn" icon dark @click="toggle()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items> </v-toolbar-items>
      </v-toolbar>
      <div>
        <slot></slot>
      </div>
      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["value", "show", "title", "showFooter", "disableScroll","fullscreen","hideCloseBtn"],
  data() {
    return {
      titulo: "",
    };
  },
  mounted: function () {
    this.titulo = this.title;
    /*document.addEventListener("keydown", (e) => {
            if (this.show && e.keyCode == 27) {
                this.close()
            }
        })*/
  },
  computed: {
    showModal() {
      return this.show;
    },
    scroll() {
      if (this.disableScroll) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    /*toggle() {
            let toggleValue = !this.showModal;
            this.$emit('toggle',toggleValue);
        },*/
    toggle() {
      this.$emit("input", !this.value);
    },
    setTitle(value) {
      this.titulo = value;
    },
  },
};
</script>