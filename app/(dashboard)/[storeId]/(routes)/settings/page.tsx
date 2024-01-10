import SettingsForm from "@/components/custom-ui/SettingsForm";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const SettingsPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-up");

  const store = await prismadb.store.findFirst({
    where: {
      userId,
      id: params.storeId,
    },
  });

  if (!store) redirect("/");

  return (
    <div className="m-4">
      <SettingsForm initialData={store} />
    </div>
  );
};
export default SettingsPage;
