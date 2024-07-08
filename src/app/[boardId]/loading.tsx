import { CricleNotchIcon } from "@/components/Icons/CircleNotchIcon";

function loading() {
  return (
    <main className="flex-grow grid place-items-center">
      <CricleNotchIcon className="w-14 h-14 fill-font-primary-color animate-spin ease-in-out" />
    </main>
  );
}

export default loading;
