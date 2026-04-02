import MenuPage from './MenuPage';
import { useRef, useEffect, useState } from 'react';
import type { MenuItemDto } from '@/types/MenuItemDto';
import MenuItem from './MenuItem';

const menuItems: MenuItemDto[] = [
  {
    name: 'Marinara',
    ingredients:
      'pomodoro pelato italiano macerato a mano, origano calabrese, aglio tritato ﬁne, olio extravergine di oliva 100% italiano, basilico fresco',
    price: 7,
  },
  {
    name: 'Bufala',
    ingredients:
      'pomodoro pelato San Marzano Dop, mozzarella di bufala campana DOP, parmigiano reggiano, olio extravergine 100% italiano, basilico fresco',
    price: 11,
  },
  {
    name: 'Veneta',
    ingredients:
      'base bianca senza pomodoro, mozzarella da latte 100% italiano, provola affumicata, gocce di olio aromatizzato al tartufo, porchetta trevigiana selezione oro a ﬁne cottura',
    price: 12.5,
  },
  {
    name: 'Saporita',
    ingredients:
      'base bianca senza pomodoro, mozzarella da latte 100% italiano, gorgonzola DOP, grana padano DOP grattuggiato, prosciutto cotto alta qualità a ﬁne cottura',
    price: 12,
  },
  {
    name: 'Sarda',
    ingredients:
      'pomodoro pelato italiano, origano calabrese, mozzarella da latte 100% italiano, salsiccia di maiale senza conservanti aggiunti, pecorino sardo DOP grattuggiato (in cottura)',
    price: 11,
  },
  {
    name: 'Bologna',
    ingredients:
      'base bianca senza pomodoro, mozzarella da latte 100% italiano, mortadella IGP antica bologna, stracciatella di burrata, granella di pistacchio',
    price: 13,
  },
  {
    name: 'Gricia',
    ingredients:
      'base bianca senza pomodoro, mozzarella da latte 100% italiano, pecorino Romano DOP grattugiato, guanciale di Sauris, pepe nero macinato a ﬁne cottura',
    price: 11.5,
  },
];

export default function Menu() {
  const [page, setPage] = useState<number>(1);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

    if (el) {
      const rect = el.getBoundingClientRect();

      console.log('Width:', rect.width);
      console.log('Height:', rect.height);

      if (rect.height >= 793.7) {
        setPage(page + 1);
      }
    }
  }, []);

  return (
    <>
      {Array.from({ length: page }).map((_, i) => (
        <MenuPage key={`menu-page-${i}`}>
          <div
            ref={ref}
            key={`menu-items-page-${i}`}
            className="menu-items-container"
          >
            {menuItems.map((item, x) => (
              <MenuItem key={x} item={item} />
            ))}
          </div>
        </MenuPage>
      ))}
    </>
  );
}
