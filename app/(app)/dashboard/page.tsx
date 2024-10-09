import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p className="text-base">Very awesome stuff here</p>
      You can try a <Link href="/certification-targets">list of something</Link>
    </>
  );
}
