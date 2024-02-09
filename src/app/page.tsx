import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-2xl font-bold mb-[5vh]">Dashboard</div>
      <Link className="p-4 border rounded-lg text-xs" href='/courses'>View All Cources</Link>
    </div>
  );
}
