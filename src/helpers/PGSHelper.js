//import pinCode from '../components/MainComponents/pinCodePad.vue';
import Vue from 'vue';
import _ from 'lodash';

import moment from 'moment';




export default class PGSHelper {
  constructor(Vue) {
    if (Vue) {
      this.vue = Vue;
    }
  }
  getDate(date = null) {
    let f = (date) ? moment(date) : moment();
    return f;
  }
  log(data, priority) {
    let useConsole = true;
    let printOnlyPriority = true;
    if (useConsole) {
      if (printOnlyPriority) {
        if (priority) {
          console.log(data);
        }
      } else {
        console.log(data);
      }
    }
  }
  checkVirtualKeyBoard(entorno) {
    let actualOption = localStorage.getItem("useVirtualKeyboard");
    actualOption = (actualOption == 'true')
    if (actualOption) {
      entorno.$uvVirtualKeyboard.init(() => {
        //this.$forceUpdate()
      });
    }
  }
  test() {
    alert('helper funcionando');
  }
  rand() {
    return Math.random().toString(36).substr(2);
  }
  token() {
    return this.rand() + this.rand();
  }
  getById(data, prop, code) {
    let data_fileter = {};
    data_fileter[prop] = code;
    let itemIndex = _.findIndex(data, data_fileter);
    if (itemIndex >= 0) {
      data[itemIndex].idx = itemIndex;
      return data[itemIndex];
    }

    return false;
  }
  writeConfigFile(idCaja, modulo, tenant = "TEST") {
  /*const store = new Store();
    var obj = {
      caja_id: idCaja,
      modulo,
      tenant
    };
    store.set({
      'ConfigCaja': obj
    });*/
    //saving LocaStorage
    let obj = {
      caja_id: idCaja,
      modulo,
      tenant
    };
    localStorage.setItem('configCaja',JSON.stringify(obj));

    //custom file save
    /*var fs = require('fs');
    fs.writeFile('configCaja.json', json, 'utf8',()=>{});*/
  }
  readConfig() {
    try {
      //const store = new Store();
      let config = localStorage.getItem("configComandero");
      if (config) {
        return JSON.parse(config)
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false
    }
  }
  cleanConfig() {
    try {
     /*const store = new Store();
      store.delete("ConfigCaja");
      store.delete("anchoTicket");
      store.delete("configPrinters");*/
      localStorage.removeItem('configCaja');
    } catch (e) {
      console.log(e);
    }

  }
  setConfig(key, value) {
    localStorage.setItem(key, value);
  }
  getConfig(key) {
    return localStorage.getItem(key);
  }
  /*getConfig(key) {
    const store = new Store();
    return store.get(key);
  }*/
  /*readConfig() {
    //var fs = require('fs');
    try {
      //const json = fs.readFileSync('configCaja.json', 'utf8');
      //let obj = JSON.parse(json);
      //if(Object.keys(obj).length === 0){
        if(localStorage.getItem('configCaja')){
          //fs.writeFile('configCaja.json', JSON.stringify(localStorage.getItem('configCaja')), 'utf8',()=>{});
          return JSON.parse(localStorage.getItem('configCaja'))
        }else{
          return false;
        }

      //}
      //return obj;
    }catch (err) {
      console.log(err);
    }
  }*/
  cloneObj(obj) {
    //clona el elemento sin la referencia de objeto
    return JSON.parse(JSON.stringify(obj))
  }

  restaurarCaja() {
    /*var obj = {};
    var json = JSON.stringify(obj);*/
    /*var fs = require('fs');
    fs.writeFile('configCaja.json', json, 'utf8', () => { });
    const store = new Store();
    store.delete("ConfigCaja");*/
    localStorage.removeItem('configCaja');
  }
  invertColor(hex, bw = true) {
    try {
      if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
      }
      // convert 3-digit hex to 6-digits.
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }

      var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
      if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
          ? '#000000'
          : '#FFFFFF';
      }
      // invert color components
      r = (255 - r).toString(16);
      g = (255 - g).toString(16);
      b = (255 - b).toString(16);
      // pad each with zeros and return
      return "#" + this.padZero(r) + this.padZero(g) + this.padZero(b);
    } catch (e) {
      return '#FFFFFF';
    }
  }



  padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }
  roundDecimals(value) {
    let valFloat = parseFloat(value).toFixed(2);
    return Number(valFloat)
  }
  formatNumber(num) {
    let rounded = this.roundDecimals(Number(num))
    return rounded.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  checkLimitCaja(limit, vue, confirmCallback) {
    let caja = JSON.parse(localStorage.getItem('caja'));
    if (!caja) {
      caja = { open: false };
    } else {

      if ((caja.totalVentas) - caja.totalRetiros > limit) {

        vue.$swal({
          icon: 'warning',
          title: 'Se alcanzo el limite de efectivo permitido en la caja',
          text: '',
          confirmButtonText: 'Realizar un retiro',
          cancelButtonText: "Continuar sin retirar",
          showCancelButton: true,
        }).then((result) => {
          if (result.value) {
            confirmCallback();
          }
        });
        return false;
      }
    }
  }
  onlyNumber($event, value) {
    try {
      value = value.toString();
      //
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);

      // only allow number and one dot
      if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || value.indexOf('.') != -1)) { // 46 is dot
        $event.preventDefault();
      }
      if (value != 0) {
        // restrict to 2 decimal places
        if (value != null && value.indexOf(".") > -20 && (value.split('.')[1]?.length > 20)) {
          $event.preventDefault();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  verifyPermissions(action, permissions) {
    if (permissions[action]) {
      return true;
    } else {
      return false;
    }
  }
  getDayName(numberDay, mode) {
    let days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
    let daysCompletName = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    if (mode == "Simple") {
      return days[numberDay];
    } else {
      return daysCompletName[numberDay];
    }
  }
  ArrayObjectToArray(object) {
    let arrayObject = Object.entries(object);
    let parseArray = [];
    arrayObject.forEach(function (element) {
      parseArray.push({ id: element[0], ...element[1] });
    });
    return parseArray;
  }
  getHtmlFromComponent(vue, component, props = {}) {
    try {
      let ComponentClass = Vue.extend(component)
      let instance = new ComponentClass({ propsData: props })
      instance.$mount()
      return instance.$el.innerHTML
    } catch (e) {
      console.log(e)
    }
  }
  getIvaByFamilia(Familias,idFamilia){
    let exist = this.getById(Familias,"id",idFamilia)
    if(exist){
      if(exist.Giva){
        if (typeof exist.Giva === "string" || typeof exist.Giva === "number" ){
          return Number(exist.Giva)
        }else{
          return 16
        }
      }else{
        return 0
      }
    }else{
      return 0
    }
   
  }
  
  async getTicketCss() {
    let css = await fetch('/ticket.css')
    let text = await css.text();
    return text;
  }
  uiConfig() {
    let conf = this.readConfig();
    let color = "light-blue darken-4";
    if (conf.modulo?.includes('AYB')) {
      color = "indigo";
    } else if (conf.modulo == "ClubPlaya") {
      color = "light-blue darken-3"
    }
    return {
      mainColor: color,
      appName: 'ParGolfSolutions'
    }
  }

}