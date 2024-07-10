import { axiosClassic, instance } from '@/api/axios'

import { IAuthFormData, IUser } from '@/types'
import { removeFromStorage, saveTokenStorage } from './auth.helper'

interface IAuthResponse {
	accessToken: string
}

class AuthService {
	async main(type: 'login' | 'register', data: IAuthFormData) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)

		if (response.data.accessToken) {
			console.log('got token')
			saveTokenStorage(response.data.accessToken)
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
					Authorization: `Bearer ${refreshToken}`,
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
