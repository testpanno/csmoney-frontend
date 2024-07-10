import { getAccessToken, saveTokenStorage } from '@/services/auth/auth.helper'
import authService from '@/services/auth/auth.service'
import { transformUserToState } from '@/utils/transform-user-to-state'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export function useProfile() {

    const queryClient = useQueryClient();

	// Fetch new tokens if necessary
    const { data: accessToken, isSuccess: isTokensSuccess, isLoading: isTokensLoading } = useQuery({
        queryKey: ['new tokens'],
        queryFn: () => getAccessToken(),
    });

    // Save new tokens to storage
    useEffect(() => {
        if (isTokensSuccess && accessToken) {
            saveTokenStorage(accessToken);

            queryClient.invalidateQueries({
                queryKey: ['profile']
            });
        }
    }, [isTokensSuccess, accessToken]);

    // Fetch profile data after tokens are fetched and saved
    const { data: profileData, isLoading: isProfileLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: () => authService.profile(),
        enabled: isTokensSuccess, // Enable fetching profile only if tokens are successfully fetched and saved
    });
 
	const profile = profileData?.data;

    const userState = profile ? transformUserToState(profile) : null;

    return {
        isLoading: isProfileLoading || isTokensLoading,
        user: {
        ...profile,
        ...userState, 
        },  
    };
}
 