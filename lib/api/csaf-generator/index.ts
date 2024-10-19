interface GenerationRequest {
    metricId: string
    assessmentId: string
    compliant: boolean
    productId: string
    productName: string
    productVersion: string
    functionality: {
        cryptographicHash: {
            algorithm: string
            withSalt: false
        }
    }
}

interface GenerationResponse {
    id: string
    metricId: string
    assessmentId: string
    status: "pending" | "done" | "error"
    /**
     * Contains the title. This might be set to 'Pending' or an error, if the status is error or pending.
     */
    title: string
    createdAt?: string
    csaf?: any
}
