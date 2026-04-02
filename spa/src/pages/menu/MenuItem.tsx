import type { MenuItemDto } from '@/types/MenuItemDto';

interface MenuItemProps {
  item: MenuItemDto;
}
export default function MenuItem({ item }: MenuItemProps) {
  return (
    <>
      <div className="menu-item-container">
        <div className="menu-item-name">{item.name}</div>
        <div className="menu-item-price">{item.price}</div>
        <div className="menu-item-ingredients">{item.ingredients}</div>
      </div>
    </>
  );
}
