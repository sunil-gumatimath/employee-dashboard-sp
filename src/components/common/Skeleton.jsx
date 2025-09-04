import './Skeleton.css'

const Skeleton = ({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
  className = '',
  variant = 'rectangular' // rectangular, circular, text
}) => {
  const baseClass = 'skeleton'
  const variantClass = `skeleton-${variant}`
  const classes = `${baseClass} ${variantClass} ${className}`.trim()

  const style = {
    width,
    height: variant === 'circular' ? width : height,
    borderRadius: variant === 'circular' ? '50%' : borderRadius
  }

  return <div className={classes} style={style} />
}

export default Skeleton