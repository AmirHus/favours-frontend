import Create from '../Components/Create';
import CreateOther from '../Components/CreateOther';
import Index from '../views/HomePage';
import Login from '../Components/Login';
import SignUp from '../Components/SignUp';
import HomeIndex from "../views/Index";
import NewIndex from "../views/NewIndex";

export const routes = [
  {
    path: '/login/',
    name: 'homepage',
    component: Login,
    exact: false,
    private: false,
  },
  {
    path: '/homeIndex',
    name: 'homepage',
    component: HomeIndex,
    exact: false,
    private: false,
  },
    {
        path: '/newIndex',
        name: 'homepage',
        component: NewIndex,
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
    component: NewIndex,
    exact: false,
    private: false,
  },

  // {
  //   path: "*",
  //   name: "homapage",
  //   component: Index,
  //   private: false,
  // }
]
