export default [
  {
    path: '/',
    component: resolve => require(['./views/index.vue'], resolve)
  },
  {
    path: '/register',
    component: resolve => require(['./views/register.vue'], resolve)
  },
  {
    path: '/login',
    component: resolve => require(['./views/login.vue'], resolve)
  },
  {
    path: '/login_phone',
    component: resolve => require(['./views/login_phone.vue'], resolve)
  },
  {
    path: '/file_upload',
    component: resolve => require(['./views/file_upload.vue'], resolve)
  }
]
