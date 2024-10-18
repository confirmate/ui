import { SortDefaults, Table, TableBody, TableHeader } from "@/components/table"

const defaults: SortDefaults = {
    sortedBy: "created_at",
    direction: "desc"
}

export default function Page() {
    if (!process.env.PLUGIN_CSAF_ENABLE) {
        return <>CSAF plugin not enabled</>
    }

    return <>
        <Table>
            <TableHeader defaults={defaults} columns={[
                {
                    name: "Title",
                    field: "title",
                },
                {
                    name: "Created From",
                    field: "created_from",
                },
                {
                    name: "Created At",
                    field: "created_at",
                }
            ]} />
            <TableBody>
                TODO
            </TableBody>
        </Table>
    </>
}