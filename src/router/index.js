import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AuthView from '@/views/AuthView.vue';
import SignInView from '@/views/SignInView.vue';
import SignUpView from '@/views/SignUpView.vue';
import SignOutView from '@/views/SignOutView.vue';
import UserStore from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      children: [
        {
          path: 'sign-in',
          name: 'sign-in',
          component: SignInView
        },
        {
          path: 'sign-up',
          name: 'sign-up',
          component: SignUpView
        },
        {
          path: 'sign-out',
          name: 'sign-out',
          component: SignOutView
        }
      ]
    },
  ]
})

export default router


router.beforeEach((to) => {
  const useUserStore = UserStore()
  const isSigninIn = useUserStore.user !== null;
   if (!isSigninIn && to.name !== 'sign-in' && to.name !== 'sign-up' ) {
    return {
       name: 'sign-in'
    }
   }
})