import type { PropsWithChildren } from 'react'

export function Heading({ children }: PropsWithChildren) {
	return <h1 className='text-7xl font-bold text-white'>{children}</h1>
}
