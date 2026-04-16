import type { IconType } from "react-icons/lib";
import { ImNewspaper } from "react-icons/im";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { VscTools } from "react-icons/vsc";
import { TbBrandBlogger } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { GrJava } from "react-icons/gr";
import { useState } from "react";

export type IItemSidebar = {
  name: string;
  icon: IconType;
}

const itens: IItemSidebar[] = [
  {
    name: "Noticias",
    icon: ImNewspaper,
  },
  {
    name: "Finanças",
    icon: RiMoneyDollarCircleLine,
  },
  {
    name: "Tarefas",
    icon: FaTasks,
  },
  {
    name: "Ferramentas",
    icon: VscTools,
  },
  {
    name: "Blog",
    icon: TbBrandBlogger,
  },
  {
    name: "Configurações",
    icon: IoSettingsOutline,
  },
  {
    name: "Pague me um café",
    icon: GrJava,
  },
];

const activeItemClass = "bg-white text-black";

export function ItensSidebar() {
  const [activeItem, setActiveItem] = useState<string>("Noticias");
  return (
    <ul className="list-none">
      {itens.map((item) => (
        <li key={item.name} className="my-5">
          <button 
            type="button" 
            className={`hover:bg-white/90 hover:text-black active:scale-95 cursor-pointer flex items-center w-full py-2 px-4 rounded-2xl ${activeItem === item.name ? activeItemClass: ""}`} 
            onClick={() => setActiveItem(item.name)}
          >
            <item.icon className="mr-4" /> {item.name}  
          </button>
        </li>
      ))}
    </ul>
  );
}