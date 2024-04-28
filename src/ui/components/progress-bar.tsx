interface IProps {
  progress: number
}

export function ProgressBar({ progress }: IProps) {
  return (
    <div className="progress-bar">
      <span style={{ width: `calc(100% - ${progress}%)` }}></span>
    </div>
  )
}
