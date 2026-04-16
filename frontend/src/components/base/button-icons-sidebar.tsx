import type { IconType } from "react-icons/lib";

export interface IButtonSidebarProps {
  link: string;
  Icon: IconType;
}

const sizeIconsFooter = 40;

//"https://www.linkedin.com/in/matheus-henrique-63698b189/"

export function ButtonIcons({ link, Icon }: IButtonSidebarProps) {
  return (
    <div>
      <button type="button">
        <a href={link} target="_blank">
          <Icon size={sizeIconsFooter} />
        </a>
      </button>
    </div>
  );
}