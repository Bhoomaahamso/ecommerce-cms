import useOrigin from "@/hooks/use-origin";
import ApiAlert from "./ApiAlert";
import { useParams } from "next/navigation";

const ApiList = ({ name, idName }: { name: string; idName: string }) => {
  const origin = useOrigin();
  const params = useParams();

  const baseUrl = `${origin}/api/${params.storeId}`;
  return (
    <div className="my-4 space-y-4">
      <ApiAlert
        title="GET"
        variant="Public"
        description={`${baseUrl}/${name}`}
      />
      <ApiAlert
        title="GET"
        variant="Public"
        description={`${baseUrl}/${name}/{${idName}}`}
      />
      <ApiAlert
        title="POST"
        variant="Admin"
        description={`${baseUrl}/${name}/{${idName}}`}
      />
      <ApiAlert
        title="PATCH"
        variant="Admin"
        description={`${baseUrl}/${name}/{${idName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="Admin"
        description={`${baseUrl}/${name}/{${idName}}`}
      />
    </div>
  );
};
export default ApiList;
