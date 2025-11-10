import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/ui/app-sidebar';
import { BrowserRouter, Routes, Route } from 'react-router';
import { SiteHeader } from '@/components/ui/site-header';
import routes from '@/routes/routes';

function App() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <BrowserRouter>
        <AppSidebar />
        <SidebarInset>
          <main>
            <SiteHeader />
            <Routes>
              {routes.map((route) => (
                <Route path={route.path} element={route.element} />
              ))}
            </Routes>
          </main>
        </SidebarInset>
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;
