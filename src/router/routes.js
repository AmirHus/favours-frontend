import CreateFavour from '../Components/CreateFavour';
import Login from '../Components/Login';
import SignUp from '../Components/SignUp';
import NewIndex from "../views/NewIndex.js";

export const routes = [
  {
    path: '/login/',
    name: 'homepage',
    component: Login,
    exact: false,
    private: false,
  },
  {
    path: '/signup',
    name: 'homepage',
    component: SignUp,
    exact: false,
    private: false,
  },
  {
    path: '/create',
    name: 'Create a favour',
    component: CreateFavour,
    exact: false,
    private: true,
  },
  {
    path: '/',
    name: 'homepage',
    component: NewIndex,
    exact: false,
    private: false,
  },
]
