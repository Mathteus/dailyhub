import { timeFormated } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useUserStore } from "@/hooks/users";

export function Profile() {
  const { user, login } = useUserStore();
  const [seconds, setSeconds] = useState<Date>(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <header>
      <p>{timeFormated(seconds)}</p>
      <p>{user?.name ?? "Convidado"}</p>
    </header>
  );
}