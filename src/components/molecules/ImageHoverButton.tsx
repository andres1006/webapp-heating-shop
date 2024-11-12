import { useState } from 'react'

type Props = {
  image: string
  imageHover: string
  label: string
  onClick: () => void
  active: boolean
  backgroundImage?: string
}
const ImageHoverButton = ({ image, imageHover, label, onClick, active, backgroundImage }: Props) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative  text-white hover:scale-110 rounded-md text-center shadow-md hover:shadow-lg 
      transition-all duration-200 ${active ? 'bg-blue-200/30 text-white' : 'bg-white hover:bg-blue-200/20'}`}
    >
      <div
        className={`relative  h-40 w-40 rounded-lg overflow-hidden  transform transition-transform duration-300 cursor-pointer`}
      >
        {/* <img src={backgroundImage} alt={'casfsa'} className="w-full h-full object-cover opacity-40" /> */}
        <div className="absolute m-5 inset-0 flex flex-col justify-center items-center text-center text-white p-4">
          <img
            src={image}
            alt={label}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <img
            src={imageHover}
            alt={`${label} hover`}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              isHovered ? 'opacity-100 ' : 'opacity-0'
            }`}
          />
        </div>
      </div>
      <h2 className="text-center text-md font-bold py-2 text-gray-700">{label}</h2>
    </button>
  )
}

export default ImageHoverButton
