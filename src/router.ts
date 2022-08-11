import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/articles",
    name: "articles",
    component: () => import("./components/ArticlesList.vue"),
  },
  {
    path: "/articles/:id",
    name: "article-details",
    component: () => import("./components/ArticleDetails.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
