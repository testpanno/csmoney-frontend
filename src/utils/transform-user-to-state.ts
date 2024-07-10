import { TProtectUserData } from "@/services/auth/auth.types"
import { UserRole } from "@/types"

export type TUserDataState = {
    id: number
    isAdmin: boolean
    isLoggedIn: boolean
}

export const transformUserToState = (
    user: TProtectUserData
): TUserDataState | null => {
    return {
        ...user,
        isAdmin: user.is_superuser,
        isLoggedIn: true
    }
}