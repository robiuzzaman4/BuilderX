import { BlockRenderer } from "@/components/block-renderer";

const API_RESPONSE = [
  { order: 0, name: "header1" },
  { order: 1, name: "hero1" },
  { order: 2, name: "courses1" },
  { order: 3, name: "features1" },
  { order: 4, name: "cta1" },
  { order: 5, name: "footer1" },
];

const Demo1Page = () => {
  const sortedBlocks = [...API_RESPONSE].sort((a, b) => a.order - b.order);
  return (
    <main className="min-h-screen w-full bg-zinc-50">
      {sortedBlocks.map((block) => (
        <BlockRenderer key={`${block.name}-${block.order}`} name={block.name} />
      ))}
    </main>
  );
};

export default Demo1Page;
