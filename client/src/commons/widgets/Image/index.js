import { forwardRef, useState } from 'react'
import noImage from '../../../assets/images/noImage.png'

const Image = forwardRef(
    (
        { src, alt, className, fallBack: customFallBack = noImage, ...props },
        ref
    ) => {
        const [fallBack, setFallBack] = useState('')
        const handleError = () => {
            setFallBack(customFallBack)
        }

        return (
            <img
                ref={ref}
                className={className}
                src={fallBack || src}
                alt={alt}
                {...props}
                onError={handleError}
            />
        )
    }
)

export default Image
