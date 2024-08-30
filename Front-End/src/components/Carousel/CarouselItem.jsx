
import { DivCarouselItem } from "./styles.js"

export const CarouselItem=({children, width, margin})=> {

    return (
        <>
            <DivCarouselItem style={{width:width, margin: margin}}>
                {children}
            </DivCarouselItem>
        </>

    )
}

export default CarouselItem
