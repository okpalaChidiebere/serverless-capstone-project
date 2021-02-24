export interface User {
    userId: string
    full_name?: string
    email?: string
    password_hash?: string
    store?: string
    createdAt?: string
    updatedAt?: string,
    tokenVersion?: number
    //salesMade?: string[]
    salesMade?: Set<string>
}