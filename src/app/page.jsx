import Image from "next/image";

export default function Home() {
  return (
    <main className="p-6">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      />
      <button className="btn btn-primary mt-10">ItemHub Button</button>
    </main>
  );
}
