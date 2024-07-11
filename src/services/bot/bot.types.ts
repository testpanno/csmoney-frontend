export interface ICreateBot {
    steam_id: string
    account_name: string
    password: string
    shared_secret: string
    port: number
}

export interface ICreateBotResponse {
    status: string
    container_id: string
}

export interface IBotResponse {
    id: string
    name: string
    status: string
}