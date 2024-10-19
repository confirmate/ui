import Button from "@/components/button";
import JsonView from "@/components/csaf/json-view";
import FormattedDate from "@/components/formatted-date";
import PropertyList from "@/components/property-list";
import { getAdvisoryRequest } from "@/lib/api/csaf-generator";
import { logger } from "@/logger";

interface PageProps {
    params: {
        id: string,
        requestId: string
    }
}

export default async function Page({ params }: PageProps) {
    logger.debug("Before getAdvisoryRequest")
    const request = await getAdvisoryRequest(params.requestId);
    logger.info("after getAdvisoryRequest", request)
    return request ? <div className="space-y-6">
        <PropertyList title={request.csaf.document.title} description={`This CSAF ${request.csaf.document.csaf_version} document was generated by ${request.csaf.document.tracking.generator.engine.name}.`} entries={
            [
                { key: "Category", value: request.csaf.document.category },
                { key: "CSAF Version", value: request.csaf.document.csaf_version },
                { key: "Publisher - Name", value: request.csaf.document.publisher.name },
                { key: "Publisher - Namespace", value: request.csaf.document.publisher.namespace },
                { key: "CSAF Version", value: request.csaf.document.category },
                { key: "Current Release Date", value: <FormattedDate value={request.csaf.document.tracking.current_release_date} /> }
            ]
        } />
        <PropertyList title="Affected Products" description="The following products are affected." entries={
            [
                { key: "Category", value: request.csaf.product_tree.branches[0].category },
                { key: "Name", value: request.csaf.product_tree.branches[0].name },
                { key: "Product - Name", value: request.csaf.product_tree.branches[0].product.name },
                { key: "Product - ID", value: request.csaf.product_tree.branches[0].product.product_id },
            ]
        } />
        <PropertyList title={request.csaf.vulnerabilities[0].notes[0].title} description={request.csaf.vulnerabilities[0].notes[0].text} entries={
            [
                { key: "CVE", value: request.csaf.vulnerabilities[0].cve },
                { key: "CVSS - Base Score", value: request.csaf.vulnerabilities[0].scores.baseScore },
                { key: "CVSS - Vector", value: <a href={`https://www.first.org/cvss/calculator/3.1#${request.csaf.vulnerabilities[0].scores.vectorString}`} target="_blank">{request.csaf.vulnerabilities[0].scores.vectorString}</a> },
            ]
        } />
        <PropertyList title={"Remediation"} description={request.csaf.vulnerabilities[0].remediations[0].details} entries={
            [
                { key: "Category", value: request.csaf.vulnerabilities[0].remediations[0].category },
            ]
        } />
        <JsonView json={request.csaf} />
    </div> : <>Advisory does not exist</>
}