import { UserRole } from '@/types'

export interface ITokenInside {
	id: number
	is_superuser: boolean
	iat: number
	exp: number
}

export type TProtectUserData = Omit<ITokenInside, 'iat' | 'exp'>
