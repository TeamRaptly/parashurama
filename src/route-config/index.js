import DefaultLayout from '../layouts/default';
import loadable from '@loadable/component';

// Make default layout loadable and a separate bundle
// useful if we have multiple layouts

// Note: Keep `webpackChunkName`(used by loadable) and `bundle` prop
// for a component same in this config to identify
// which bundle to load for a route to render on server side
export default [
  {
    path: '/',
    exact: true,
    component: DefaultLayout, //loadable(() => import('../layouts/default')),
    routes: [
      {
        resources: ['facts'],
        component: loadable(() =>
          import(/* webpackChunkName: "home" */ '../components/pages/home')
        ),
        bundle: 'home'
      }
    ]
  },
  {
    path: '/about',
    component: DefaultLayout, //loadable(() => import('../layouts/default')),
    routes: [
      {
        resources: [],
        component: loadable(() =>
          import(/* webpackChunkName: "about" */ '../components/pages/about')
        ),
        bundle: 'about'
      }
    ]
  },
  {
    path: '/sign-in',
    component: DefaultLayout, //loadable(() => import('../layouts/default')),
    routes: [
      {
        resources: [],
        component: loadable(() =>
          import(/* webpackChunkName: "sign-in" */ '../components/pages/sign-in')
        ),
        bundle: 'sign-in'
      }
    ]
  },
  {
    path: '/sign-up',
    component: DefaultLayout, //loadable(() => import('../layouts/default')),
    routes: [
      {
        resources: [],
        component: loadable(() =>
          import(/* webpackChunkName: "sign-up" */ '../components/pages/sign-up.js')
        ),
        bundle: 'sign-up'
      }
    ]
  },
  {
    // react-router-config use https://www.npmjs.com/package/path-to-regexp module
    // to match paths, hence the below regex
    path: '/_features(.*)',
    component: DefaultLayout, //loadable(() => import('../layouts/default')),
    routes: [
      {
        resources: [],
        component: loadable(() =>
          import(
            /* webpackChunkName: "features" */ '../components/pages/features'
          )
        ),
        bundle: 'features'
      }
    ]
  },
  {
    path: '*',
    component: DefaultLayout, //loadable(() => import('../layouts/default')),
    routes: [
      {
        resources: [],
        component: loadable(() =>
          import(/* webpackChunkName: "error" */ '../components/pages/error')
        ),
        bundle: 'error'
      }
    ]
  }
];
