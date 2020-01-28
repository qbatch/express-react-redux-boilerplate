import Dashboard from '../pages/Dashboard';
import Users from '../pages/Dashboard/users';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import PageNotFound from '../pages/PageNotFound';

export default [
  {
    path: '/dashboard',
    exact: true,
    isPrivate: true,
    component: Dashboard,
    childRoutes: {
      users: {
        path: '/dashboard/users',
        exact: true,
        isPrivate: true,
        component: Users,
      },
    },
  },
  {
    path: '/login',
    exact: true,
    isAuthRoute: true,
    component: Login,
  },
  {
    path: '/register',
    exact: true,
    isAuthRoute: true,
    component: Register,
  },
  {
    path: '/not-found',
    exact: true,
    component: PageNotFound,
  },
  {
    path: '/',
    isRedirect: true,
    to: '/login',
    exact: true,
    isAuthRoute: true,
    component: Login,
  }
];
