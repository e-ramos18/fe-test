import { createRouter, createWebHistory } from "vue-router";
import Welcome from "./views/Welcome.vue";
import ViewRecords from "./views/ViewRecords.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Home from "./views/Home.vue";
import { isLoggedIn, isAdmin, getCurrentUser } from "./services/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { requiresGuest: true },
    },
    {
      path: "/welcome",
      name: "Welcome",
      component: Welcome,
      meta: { requiresAuth: true },
    },
    {
      path: "/view-records",
      name: "ViewRecords",
      component: ViewRecords,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { requiresGuest: true },
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: { requiresGuest: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = getCurrentUser();

  if (to.meta.requiresAuth) {
    if (!isLoggedIn()) {
      next("login");
    } else if (to.meta.requiresAdmin && !isAdmin(user)) {
      next("welcome"); // Redirect to default page if user is not an admin
    } else {
      next();
    }
  } else if (to.meta.requiresGuest && isLoggedIn()) {
    next("welcome"); // Redirect to default page if user is already logged in
  } else {
    next();
  }
});

export default router;
