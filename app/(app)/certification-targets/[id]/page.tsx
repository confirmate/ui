import { redirect } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  redirect(`/certification-targets/${params.id}/activity`);
}
