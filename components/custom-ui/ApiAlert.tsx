import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Copy, Server } from "lucide-react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const ApiAlert = ({
  title,
  description,
  variant,
}: {
  title: string;
  description: string;
  variant: "Public" | "Admin";
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API route copied to clipboard");
  };
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-2 text-sm">
        {title}
        <Badge variant={variant === "Public" ? "secondary" : "destructive"}>
          {variant}
        </Badge>
      </AlertTitle>
      <AlertDescription className="flex flex-1 justify-between items-center mt-3">
        <code className="rounded bg-muted font-mono font-semibold text-sm p-1">
          {description}{" "}
        </code>
        <Button variant="outline" size="sm" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
export default ApiAlert;
