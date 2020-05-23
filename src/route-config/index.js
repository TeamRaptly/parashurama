import DefaultLayout from '../layouts/default';
import AboutPage from '../components/pages/about';
import HomePage from '../components/pages/home';
import FeaturesPage from '../components/pages/features';
import ErrorPage from '../components/pages/error';

export default [
  {
    path: '/about',
    component: DefaultLayout,
    routes: [
      {
        resources: [],
        component: AboutPage
      }
    ]
  },
  {
    path: '/',
    exact: true,
    component: DefaultLayout,
    routes: [
      {
        resources: ['facts'],
        component: HomePage
      }
    ]
  },
  {
    path: '/_features',
    component: DefaultLayout,
    routes: [
      {
        resources: [],
        component: FeaturesPage
      }
    ]
  },
  {
    path: '/',
    component: DefaultLayout,
    routes: [
      {
        resources: [],
        component: ErrorPage
      }
    ]
  }
];
