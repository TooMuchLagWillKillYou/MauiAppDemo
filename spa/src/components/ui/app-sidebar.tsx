import { BookMarked, Map, Utensils, NotebookPen, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from 'react-router';

// Menu items.
const items = [
  {
    title: 'Reservations',
    url: '/reservations',
    icon: BookMarked,
  },
  {
    title: 'Map',
    url: '/map',
    icon: Map,
  },
  {
    title: 'Menu',
    url: '/menu',
    icon: Utensils,
  },
  {
    title: 'Worked hours',
    url: 'hours',
    icon: NotebookPen,
  },
  {
    title: 'Settings',
    url: 'settings',
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Restaurant Manager</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
