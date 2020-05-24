import DefaultLayout from '../layouts/default';
// import AboutPage from '../components/pages/about';
// import HomePage from '../components/pages/home';
// import FeaturesPage from '../components/pages/features';
// import ErrorPage from '../components/pages/error';
import loadable from '@loadable/component';

export default [
  {
    path: '/about',
    component: DefaultLayout, //loadable(() => import('../layouts/default')),
    routes: [
      {
        resources: [],
        component: loadable(() =>
          import(/* webpackChunkName: "about" */ '../components/pages/about')
        )
      }
    ]
  },
  {
    path: '/',
    exact: true,
    component: DefaultLayout, //loadable(() => import('../layouts/default')),
    routes: [
      {
        resources: ['facts'],
        component: loadable(() =>
          import(/* webpackChunkName: "home" */ '../components/pages/home')
        )
      }
    ]
  },
  {
    path: '/_features',
    component: DefaultLayout, //loadable(() => import('../layouts/default')),
    routes: [
      {
        resources: [],
        component: loadable(() =>
          import(
            /* webpackChunkName: "features" */ '../components/pages/features'
          )
        )
      }
    ]
  },
  {
    path: '/',
    component: DefaultLayout, //loadable(() => import('../layouts/default')),
    routes: [
      {
        resources: [],
        component: loadable(() =>
          import(/* webpackChunkName: "error" */ '../components/pages/error')
        )
      }
    ]
  }
];
