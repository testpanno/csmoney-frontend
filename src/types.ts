export enum UserRole {
	User = 'USER',
	Admin = 'ADMIN',
}

export interface IUser {
	id: number
	username?: string
	email: string
	avatarUrl?: string
	country?: string
	is_superuser: boolean
}

export interface ISteamAuth {
	id: number
	user_ip: string
	created_at: string
	steam_id: string
	username: string
	domain_id: number
	domain_name: number
}

export interface ISteamLog {
	id: number
	created_at: string
	offer_id: string
	skins: string
	total_price: number
	status: string
	target_steam_id: string
	bot_steam_id: string
	hold: string
}


export interface IAuthFormData extends Pick<IUser, 'email'> {
	password: string
}
