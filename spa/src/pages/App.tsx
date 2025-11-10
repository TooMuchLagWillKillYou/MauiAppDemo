import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/ui/app-sidebar';
import { BrowserRouter, Routes, Route } from 'react-router';
import Map from './Map';
import Menu from './Menu';
import Settings from './Settings';
import Reservations from './Reservations';
import WorkedHours from './WorkedHours';

function App() {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <Routes>
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/map" element={<Map />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/hours" element={<WorkedHours />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;
