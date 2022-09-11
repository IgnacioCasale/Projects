import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar';

export default boot(({router}) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getItem('loggedIn');


    if(!loggedIn && (to.path == '/home' || to.path == '/signUp'  || to.path == '/error')) {
      next();
    }else if(!loggedIn && to.path !== '/login'){
      next('/home');
    }else{
      next();
    }

    if(to.path == '/') next('/home')

  })
})
