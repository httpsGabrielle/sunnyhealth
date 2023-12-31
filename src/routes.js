import { useRoutes } from 'react-router-dom';
// layouts

// paginas
import SignIn from './pages/auth/form/SignIn';
import SignUp from './pages/auth/form/SignUp';
import BreathRoom from './pages/sensorial/breath-room/BreathRoom';
import Layout from './layout/Layout';
import Home from './pages/home';
import MoodTracker from './pages/moodtracker';
import TasksList from './pages/tasks/TasksList';
import HabitsList from './pages/habits/HabitsList'
import Profile from './pages/profile';
import Achievements from './pages/profile/Achievements';
import Settings from './pages/profile/Settings';

// ----------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
      {
        path: 'login',
        element: <SignIn />,
      }, 
      {
        path: 'register',
        element: <SignUp />,
      },
      {
        path: '/',
        element: <Layout/>,
        children:[
          {element: <Home/>, index: true},
          {path: '/breath-room', element: <BreathRoom/>},
          {path: '/mood-tracker/:create?', element: <MoodTracker/>},
          {path: '/tarefas', element: <TasksList/>},
          {path: '/habitos', element: <HabitsList/>},
          {path: '/profile', element: <Profile/>},
          {path: '/profile/Achievements', element: <Achievements/>},
        ]
      },
      {path: '/terms', element: <Settings/>}
    ]);
  
    return routes;
}