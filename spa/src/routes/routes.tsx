import Map from '@/pages/Map';
import Menu from '@/pages/Menu';
import Reservations from '@/pages/reservation/Reservations';
import Settings from '@/pages/Settings';
import WorkedHours from '@/pages/WorkedHours';
import {
  BookMarked,
  MapIcon,
  Utensils,
  NotebookPen,
  SettingsIcon,
} from 'lucide-react';

const routes = [
  {
    title: 'Reservations',
    path: '/reservations',
    icon: BookMarked,
    element: <Reservations />,
  },
  {
    title: 'Map',
    path: '/map',
    icon: MapIcon,
    element: <Map />,
  },
  {
    title: 'Menu',
    path: '/menu',
    icon: Utensils,
    element: <Menu />,
  },
  {
    title: 'Worked hours',
    path: '/workedHours',
    icon: NotebookPen,
    element: <WorkedHours />,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: SettingsIcon,
    element: <Settings />,
  },
];

export default routes;
