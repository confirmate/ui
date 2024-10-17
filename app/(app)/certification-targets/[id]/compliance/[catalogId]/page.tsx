interface PageProps {
    params: {
        id: string
        catalogId: string
    }
}

export default function Page({ params }: PageProps) {
    return <>Audit Scope for {params.id}, {params.catalogId}</>
}