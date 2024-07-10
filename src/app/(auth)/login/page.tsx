import type { Metadata } from 'next'
import { AuthForm } from '../AuthForm'

export const metadata: Metadata = {
	title: 'Login',
}

export default function LoginPage() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-neutral-950'>
			
			<AuthForm isLogin />
			
		</div>
	)
}
