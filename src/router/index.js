import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../components/Dashboard.vue";
import AdminPanel from '../components/AdminPanel';
import NewStudent from '../components/NewStudent';
import EditStudent from '../components/EditStudent';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminPanel
  },
  {
    path: "/new-student",
    name: "new-student",
    component: NewStudent
  },
  {
    path: "/edit-student/:student_id",
    name: "edit",
    component: EditStudent
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
