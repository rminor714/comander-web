<template>
  <div>
    <appbar
      :showMenu="false"
      :showBack="false"
      :useAction="true"

      :profileName="'Juan'"
      :title="'Cuenta'"
    >
    </appbar>

    <v-row>
      <v-col md="8" cols="8" lg="8">
        <h2 v-if="cuenta">{{ cuenta.Cliente.Nombre }}</h2>
        <h3 v-if="cuenta"># Cuenta: {{ cuenta.CD }}</h3>
        <h3 v-if="cuenta">Alias: {{ cuenta.Cliente.Apodo }}</h3>
        <h3 v-if="cuenta">Mesa: {{ cuenta.Contenedor.Nombre }}</h3>
        <h3 v-if="cuenta">
          Comensales: {{ cuenta.Comensales }} -
          
        </h3>
      </v-col>
      <v-col md="4" cols="4" lg="4">
        
      </v-col>
    </v-row>


    <v-list v-if="cuenta">
      <v-list-item style="min-height: 25px">
        <v-row align="center" justify="center">
          <v-col cols="2" sm="2" md="2" class="text-center justify-center py-0">
            <b>Cnt</b>
          </v-col>
          <v-col cols="6" sm="6" md="6" class="py-0">
            <b>Producto</b>
          </v-col>
          <v-col cols="2" sm="2" md="2" class="py-0">
            <b>P. U.</b>
          </v-col>
          <v-col cols="2" sm="2" md="2" class="py-0">
            <b>Total</b>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider></v-divider>
      <template v-for="(producto, index) in cuenta.Catalogo">
        <v-list-item
          :key="index"
          @click="
            sheet = true;
            selectedIndex = index;
            notas = producto.Notas;
          "
        >
          <v-row align="center" justify="center">
            <v-col cols="2" sm="2" md="2" class="text-center justify-center">
              <v-list-item-title>
                <b>{{ producto.Cnt }}</b>
              </v-list-item-title>
            </v-col>
            <v-col cols="6" sm="6" md="6">
              <v-list-item-title>
                <b>{{ producto.Nombre }}</b>
              </v-list-item-title>
              <span v-if="producto.Notas">Nota: {{ producto.Notas }}</span>
              <ul>
                <template
                  v-for="(modi, indexModi) in producto.modificadoresList"
                >
                  <li :key="indexModi">
                    {{ modi.Cnt / producto.Cnt }} {{ modi.nam }} ${{
                      $pgsHelper.formatNumber(
                        (modi.Cnt / producto.Cnt) * modi.pco.C
                      )
                    }}
                  </li>
                </template>
              </ul>
            </v-col>
            <v-col cols="2" sm="2" md="2">
              ${{
                producto.Pco.C 
              }}
            </v-col>
            <v-col cols="2" sm="2" md="2">
              ${{
                $pgsHelper.formatNumber(
                  producto.Pco.C * producto.Cnt 
                )
              }}
            </v-col>
          </v-row>
        </v-list-item>

        <v-divider :key="'div' + index"></v-divider>
      </template>
      <v-list-item>
        <v-row align="center" justify="center">
          <v-col cols="2" sm="2" md="2" class="text-center justify-center">
            <v-list-item-title>
              <b></b>
            </v-list-item-title>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-list-item-title>
              <b>TOTAL</b>
            </v-list-item-title>
          </v-col>
          <v-col cols="2" sm="2" md="2"> </v-col>
          <v-col cols="2" sm="2" md="2">
            <b>${{ $pgsHelper.formatNumber(totalAccount) }}</b>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
    <v-btn block class="mt-4" @click="paymentProcess()" color="success bold" >Cobrar ${{ $pgsHelper.formatNumber(totalAccount) }} </v-btn>








  </div>
</template>

<script>

import appbar from "../../components/Template/AppBar.vue";
import Account from "../../clases/Account"
export default {
  name: "Comanda",
  components: {
    appbar,
    
  },
  props: {},
  data() {
    return {
      cuenta: Account,
    };
  },
  methods: {
    paymentProcess(){
      window.alert("Pagando")
    },
  },
  async mounted() {
    
  },
  computed: {
    totalAccount() {
        let totalAccount = 0;
        this.cuenta.Catalogo.forEach((prod) => {
          let precio = parseFloat(prod.Precio) * prod.Cnt;
          prod.Descuentos.forEach((desc) => {
            // verifica los precios quitando los descuentos aplicados por otras promociones
            if (desc.Activo) {
              precio = precio + desc.Cnt * desc.Cur.C;
            }
          });
          if (prod.modificadoresList) {
            prod.modificadoresList.forEach((modi) => {
              // verifica los modificadores aplicados al producto
              precio = precio + modi.pco.C * modi.Cnt;
            });
          }
          totalAccount += precio;
        });
        return totalAccount;
      },
  },
};
</script>
<style scoped></style>
