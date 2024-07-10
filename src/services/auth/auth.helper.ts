import Cookies from 'js-cookie'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken',
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)

	console.log(accessToken)

	return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {

	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: 'localhost',
		sameSite: 'lax',
		expires: 1,
	})
}


export const saveRefreshTokenStorage = (refreshToken: string) => {

	Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, {
		domain: 'localhost',
		sameSite: 'lax',
		expires: 30,
	})
}


export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
	Cookies.remove(EnumTokens.REFRESH_TOKEN)
}
