import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const p = await params;
  redirect(`/certification-targets/${p.id}/compliance`);
}
