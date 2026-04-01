export function DeviceFrame({ src, alt, size = 'default', className = '', priority = false }) {
  const cls = ['device-frame', size !== 'default' && `device-frame--${size}`, className]
    .filter(Boolean)
    .join(' ')
  return (
    <figure className={cls}>
      <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" />
    </figure>
  )
}
