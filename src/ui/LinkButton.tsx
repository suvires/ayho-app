import Link from 'next/link'

interface IProps {
  href: string
  styling: string
  disabled?: boolean
  children: React.ReactNode
}

export const LinkButton: React.FC<IProps> = ({
  href,
  styling,
  disabled = false,
  children,
}) => {
  return (
    <Link
      className={`btn btn--${styling} ${disabled ? 'disabled' : ''}`}
      href={href}
    >
      {children}
    </Link>
  )
}
