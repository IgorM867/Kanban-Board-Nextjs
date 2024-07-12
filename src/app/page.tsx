import { getBoards } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function Home() {
  const boards = await getBoards();

  if (boards.length > 0) {
    redirect(`/${boards[0].id}`);
  }

  return <main></main>;
}
