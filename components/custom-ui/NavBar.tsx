import { UserButton, auth } from "@clerk/nextjs";
import { StoreSelector } from "./StoreSelector";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import MainNav from "./MainNav";

export default async function NavBar() {
  const { userId } = auth();

  if (!userId) redirect("/sign-up");

  const store = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="h-16 flex items-center px-4 border-b">
      <div className="">
        <StoreSelector items={store} />
      </div>
      <div className="ml-2">
        <MainNav />
        </div>
      <div className="ml-auto">
        <UserButton afterSignOutUrl="/sign-up" />
      </div>
    </div>
  );
}
