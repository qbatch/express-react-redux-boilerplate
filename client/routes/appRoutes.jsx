import Dashboard from '../pages/Dashboard';
import Users from '../pages/Dashboard/users';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import PageNotFound from '../pages/PageNotFound';

import AppLayout from '../layouts/AppLayout';
import DashboardLayout from '../layouts/DashboardLayout';

export default {
  dashboard: {
    path: '/dashboard',
    exact: true,
    isPrivate: true,
    component: Dashboard,
    withLayout: DashboardLayout,
    childRoutes: {
      users: {
        path: '/dashboard/users',
        exact: true,
        isPrivate: true,
        component: Users,
      },
    },
  },
  login: {
    path: '/login',
    exact: true,
    isAuthRoute: true,
    component: Login,
    withLayout: AppLayout,
  },
  register: {
    path: '/register',
    exact: true,
    isAuthRoute: true,
    component: Register,
    withLayout: AppLayout,
  },
  notFound: {
    path: '/not-found',
    exact: true,
    component: PageNotFound,
  },
  redirect: {
    path: '/',
    isRedirect: true,
    to: '/login',
    exact: true,
    isAuthRoute: true,
    component: Login,
  }
};
