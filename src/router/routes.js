import Create from '../Components/Create';
import CreateOther from '../Components/CreateOther';
import Homepage from '../Components/Homepage';
import Login from '../Components/Login';
import SignUp from '../Components/SignUp';

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
    component: Create,
    exact: false,
    private: true,
  },
  {
    path: '/createOther',
    name: 'Create other owes me',
    component: CreateOther,
    exact: false,
    private: true,
  },
  {
    path: '/',
    name: 'homepage',
    component: Homepage,
    exact: true,
    private: false,
  },
  // {
  //   path: "*",
  //   name: "homapage",
  //   component: Homepage,
  //   private: false,
  // }
]