export default function TextImage({ asset, className = '', plumbId }) {
  return (
    <img
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      className={`text-image ${className}`.trim()}
      data-plumb-id={plumbId}
      draggable={false}
    />
  )
}
