import client from "@/lib/api/orchestrator"

interface PageProps {
    params: {
        id: string
        catalogId: string
    }
}

export default async function Page({ params }: PageProps) {
    const { data: catalog } = await client.GET("/v1/orchestrator/catalogs/{catalogId}", {
        params: {
            path: {
                catalogId: params.catalogId
            }
        }
    })

    return <>Audit Scope for {params.id}, {params.catalogId}</>
}