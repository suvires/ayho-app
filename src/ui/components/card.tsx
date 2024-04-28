interface IProps {
  children: React.ReactNode
}

export function Card({ children }: IProps) {
  return <div className="card">{children}</div>
}
