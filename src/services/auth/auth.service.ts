import { axiosClassic, instance } from '@/api/axios'

import { IAuthFormData, IUser } from '@/types'
import { EnumTokens, getAccessToken, removeFromStorage, saveRefreshTokenStorage, saveTokenStorage } from './auth.helper'

interface IAuthResponse {
	accessToken: string
	refreshToken: string
}

class AuthService {
	async main(type: 'login' | 'register', data: IAuthFormData) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)

		if (response.data.accessToken) {
		
			saveTokenStorage(response.data.accessToken)
			saveRefreshTokenStorage(response.data.refreshToken)
		}

		return response
	}

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/refresh'
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	}

	async getNewTokensByRefresh(refreshToken: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/refresh',
			{},
			{
				headers: {
					Cookie: `refreshToken=${refreshToken}`,
				},
			}
		)

		return response.data
	}

	async logout() {


		const response = await axiosClassic.post<boolean>('/auth/logout')
		
		if (response.data) removeFromStorage()

		return response
	}

	async profile() {
		return instance.get<IUser>(`/auth/profile`)
	}
}

export default new AuthService()
