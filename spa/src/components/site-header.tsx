import { useLocation } from 'react-router';
import routes from '@/routes/routes';
import { SidebarTrigger } from './ui/sidebar';
import { Separator } from './ui/separator';
import Forecast from './forecast';
export function SiteHeader() {
  const { pathname } = useLocation();
  const currentRoute = routes.find((r) => r.path === pathname);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">
          {currentRoute?.title ?? 'Untitled Page'}
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Forecast />
        </div>
      </div>
    </header>
  );
}
