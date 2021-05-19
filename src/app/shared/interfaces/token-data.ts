export interface ITokenData {
    UserId?: string
    role?: string | Array<string>
    exp?: number
    iat?: number
    nbf?: number
}