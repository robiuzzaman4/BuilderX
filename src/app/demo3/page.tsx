import { BlockRenderer } from "@/components/block-renderer";

const API_RESPONSE = [
  { order: 0, name: "header3" },
  { order: 1, name: "hero3" },
  { order: 2, name: "courses3" },
  { order: 3, name: "features3" },
  { order: 4, name: "cta3" },
  { order: 5, name: "footer3" },
];

const Demo3Page = () => {
  const sortedBlocks = [...API_RESPONSE].sort((a, b) => a.order - b.order);
  return (
    <main className="min-h-screen w-full bg-zinc-50">
      {sortedBlocks.map((block) => (
        <BlockRenderer key={`${block.name}-${block.order}`} name={block.name} />
      ))}
    </main>
  );
};

export default Demo3Page;
