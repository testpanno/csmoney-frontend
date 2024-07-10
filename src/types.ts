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

export interface IAuthFormData extends Pick<IUser, 'email'> {
	password: string
}
