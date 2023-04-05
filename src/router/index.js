import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Info from '../views/Info.vue'
import Request from '../views/Request.vue'
import StudentDetails from '../views/StudentDetails.vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{requiresAuth: false}
  },
  {
    path: '/login',
    name: 'Login',
    component : Login,
    meta:{requiresAuth: false}
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component : Dashboard,
    meta:{requiresAuth: true}
  },
  {
    path:'/info',
    name:'Info',
    component: Info,
    meta:{requiresAuth: true}
  },
  {
    path:'/request',
    name:'Request',
    component: Request,
    meta:{requiresAuth: true}
  },
  {
    path:'/studentdetails',
    name:'StudentDetails',
    component:StudentDetails,
    meta:{requiresAuth: true}
  },
  {
    path: '/student',
    name: 'year',
    component: () => import( '../views/studentlist.vue'),
    meta:{requiresAuth: true}
  },
  {
    path: '/student/:uid',
    component: () => import( '../views/StudentHistory.vue'),
    meta:{requiresAuth: true}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/register',
    name:'Register',
    component:()=>import('../views/Register.vue'),
  },{
    path:'/add',
    name:'Add',
    component: ()=>import('../views/Add.vue'),
  },
  {
    path:'/94324149236291171004',
    name:'Admin',
    component: ()=>import('../views/AddAdmin.vue'),
  },
  {
    path:'/*',
    name: '404',
    component:()=>import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,form,next)=>{
  const requiresAuth = to.matched.some(record=> record.meta.requiresAuth);
  const isAuth = firebase.auth().currentUser;
  if(requiresAuth && !isAuth){
    next("/login");
  }else{
    next();
  }
})

export default router
