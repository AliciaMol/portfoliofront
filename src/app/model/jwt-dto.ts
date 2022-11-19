export interface JwtDTO {
    token: string;
    type: string;
    nameUser: string;
    authorities: string[];
}
