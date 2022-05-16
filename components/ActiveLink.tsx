import React from 'react'
import Link, { LinkProps } from 'next/link'
import { classNames } from '../utils'
import { useRouter } from 'next/router'
interface ActiceLinkProps extends LinkProps {
    inactiveClassName: string
    activeClassName: string
    children?: React.ReactNode
    className?: string

}
const ActiveLink = ({ inactiveClassName, activeClassName, children, passHref = true, ...props }: ActiceLinkProps) => {
    const router = useRouter();
    return (
        <Link {...props} passHref={passHref}>
            <a className={classNames(
                router.pathname === props.href ? activeClassName : inactiveClassName,
                props.className ?? '')
            }>
                {children}
            </a>
        </Link>
    )
}

export default ActiveLink