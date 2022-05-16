export interface Member {
    name: string
    title?: string
    email: string
    role: string
}

export type Team = {
    id: string
    logo: string
    name: string
    city?: string
}

export interface Action {
    title: string
    href: string
    icon: (props: any) => JSX.Element
    iconBackground: string
    iconForeground: string
}
