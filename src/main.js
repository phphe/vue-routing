import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueRouter from 'vue-router'
import App from './App.vue'
import Users from './Users.vue'
import Gauge from './Gauge.vue'
import Home from './Home.vue'
//import Plotly from './Plotly.vue'

Vue.use(VueMaterial)
Vue.use(VueRouter)

const routes = [
  { path: '/users', component: Users },
  { path: '/', component: Home },
  { path: '/Gauge', component: Gauge },
//  { path: '/Plotly', component: Plotly },
]

const router = new VueRouter({
  routes: routes
})


Vue.material.registerTheme({
    default: {
      primary: {
        color: 'light-green',
        hue: 700
      },
      accent: 'red'
    },
    blue: {
      primary: 'blue',
      accent: 'pink'
    },
    orange: {
      primary: 'orange',
      accent: 'purple'
    },
    green: {
      primary: 'green',
      accent: 'white'
    }
  })


Vue.config.debug = true;
Vue.config.devtools = true;


new Vue({
  el: '#app', 
  components: {

  },

  router,
  render: h => h(App)
})
