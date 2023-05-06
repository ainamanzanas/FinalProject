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

router.beforeEach(async (to) => {

  const { name } = to
  console.log(name)

  const store  = UserStore();
  await store.fetchUser()

  const { user } = UserStore.getState()
  console.log(user)
  if (!user && name !== 'sign-in' && name !== 'sign-up') {
    return {
      name: 'sign-in'
    }
  }
})


export default router
