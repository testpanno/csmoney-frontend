import { Button } from '@/components/ui/button'
import { useProfile } from '@/hooks/useProfile'
import authService from '@/services/auth/auth.service'
import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function ProfileInfo() {
	const { push } = useRouter()

	const { user } = useProfile()

	const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			push('/login')
		},
	})

	return (
		user && (
			<div className='mb-8 flex gap-5'>
				
				<Button onClick={() => mutateLogout()} disabled={isLogoutPending}>
					<LogOut />
				</Button>
				
			</div>
		)
	)
}
