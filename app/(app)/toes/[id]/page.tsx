interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <>{params.id}</>;
}
