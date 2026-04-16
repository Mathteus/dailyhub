import { FaGithub } from "react-icons/fa";
import { RiGitRepositoryLine } from "react-icons/ri";
import { CiLinkedin } from "react-icons/ci";
import { ButtonIcons } from "./button-icons-sidebar";
import { Profile } from "./profile";
import { ItensSidebar } from "./itens-sidebar";

export function Sidebar() {
  return (
    <aside className="text-white w-64 h-full p-4 flex flex-col justify-between">
      <Profile name="Matheus" />
      <hr />
        <ItensSidebar />
      <hr />
      <footer className="flex items-center justify-around">
        <ButtonIcons link="https://github.com/Mathteus/dailyhub" Icon={RiGitRepositoryLine} />
        <ButtonIcons link="https://github.com/Mathteus" Icon={FaGithub} />
        <ButtonIcons link="https://www.linkedin.com/in/matheus-henrique-63698b189/" Icon={CiLinkedin} />
      </footer>
    </aside>
  );
}