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
}

export interface IAuthFormData extends Pick<IUser, 'email'> {
	password: string
}
