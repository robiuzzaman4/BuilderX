import { BlockRenderer } from "@/components/block-renderer";

const API_RESPONSE = [
  { order: 0, name: "header2" },
  { order: 1, name: "hero2" },
  { order: 2, name: "courses2" },
  { order: 3, name: "features2" },
  { order: 4, name: "cta2" },
  { order: 5, name: "footer2" },
];

const Demo2Page = () => {
  const sortedBlocks = [...API_RESPONSE].sort((a, b) => a.order - b.order);
  return (
    <main className="min-h-screen w-full bg-zinc-50">
      {sortedBlocks.map((block) => (
        <BlockRenderer key={`${block.name}-${block.order}`} name={block.name} />
      ))}
    </main>
  );
};

export default Demo2Page;
