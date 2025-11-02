import { Button } from "@/components/ui/button";

const BuilderPage = () => {
  return (
    <div className="bg-muted h-full w-full grid lg:grid-cols-2 gap-4 px-4 py-4">
      <div className="h-full px-4 py-2 rounded-lg bg-background border">
        
      </div>
      <div className="h-full rounded-lg bg-background border">
        <div className="px-4 py-2 border-b flex items-center justify-between gap-4">
          <p className="text-sm font-medium">Preview</p>
          <Button size="sm">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
