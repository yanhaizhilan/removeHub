import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import 'font-awesome/css/font-awesome.min.css'
import VueRouter from 'vue-router'

import routes from './vuex/routes'

Vue.use(ElementUI);
Vue.use(VueRouter);

const router = new VueRouter({
    routes
});
router.beforeEach((to,from,next) => {
    if(to.path == '/login'){
		sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(!user && to.path != '/login'){
        next({path:'/login'});
    }else{
        next();
    }
});

new Vue({
	//el: '#app',
	//template: '<App/>',
	router,
	// store,
	//components: { App }
	render: h => h(App)
}).$mount('#app');


//
// new Vue({
//     el: '#app',
//     render: h => h(App)
//
//
// });
//









