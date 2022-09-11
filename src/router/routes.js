const routes = [
  {
    path: "/",
    component: () => import("src/layouts/UserLayout.vue"),
    children: [
      {
        path: "/userClasses",
        component: () => import("src/pages/Users/UserClasses.vue"),
      },
      {
        path: "/allClasses",
        component: () => import("src/pages/Users/AllClasses.vue"),
      },
      {
        path: "/calendar",
        component: () => import("src/pages/Common/Calendar.vue"),
      },
      {
        path: "/settings",
        component: () => import("src/pages/Users/Settings.vue"),
      },
      {
        path: "/chats",
        component: () => import("src/pages/Common/Chats.vue"),
      },
    ],
  },
  {
    path: "/chat/:id",
    component: () => import("src/pages/Common/Chat.vue"),
  },
  {
    path: "/class",
    component: () => import("src/pages/Common/Class.vue"),
  },
  {
    path: "/home",
    component: () => import("layouts/HomeLayout.vue"),
    children: [
      {
        path: "/home",
        component: () => import("src/pages/Auth/Home.vue"),
      },
      {
        path: "/login",
        component: () => import("src/pages/Auth/LogIn.vue"),
      },
      {
        path: "/signUp",
        component: () => import("src/pages/Auth/SignUp.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "students",
        component: () => import("src/pages/Admin/AdminStudent.vue"),
      },
      {
        path: "classes",
        component: () => import("src/pages/Admin/AdminClasses.vue"),
      },
      {
        path: "class",
        component: () => import("src/pages/Common/Class.vue"),
      },
      {
        path: "student/:id",
        component: () => import("src/pages/Admin/Student.vue"),
      },
      {
        path: "calendar",
        component: () => import("src/pages/Common/Calendar.vue"),
      },
      {
        path: "code",
        component: () => import("src/pages/Admin/SignUpCode.vue"),
      },
      {
        path: "chats",
        component: () => import("src/pages/Common/Chats.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },

  {
    path: "/error",
    component: () => import("src/pages/Error404.vue"),
  },
];

export default routes;
