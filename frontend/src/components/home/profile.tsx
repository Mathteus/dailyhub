import { timeFormated } from "@/lib/utils";

interface IProfile {
  name?: string;
}

export function Profile({ name}: IProfile ) {
  return (
    <header>
      <p>{timeFormated()}</p>
      <p>{name ?? "Convidado"}</p>
    </header>
  );
}