import React, { useEffect, useState } from "react"
import { CarouselContainer, Indicadores, Inner, Next, Prev } from "./styles.js"
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useSwipeable } from "react-swipeable";

export const Carousel=({children, translateVar, margin}) => {


    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] =useState(false);

    const updateIndex = (newIndex) =>{
        if(newIndex <0){
            newIndex = 0;
        }
        else if (newIndex>= React.Children.count(children)){
            newIndex = React.Children.count(children) -1;
        }
        setActiveIndex(newIndex)
    };

// useEffect(()=>{
//     const interval = setInterval(()=>{
//         if(!paused){
//             updateIndex(activeIndex +1);
//         }
//     }, 6000);
//     return()=>{
//         if(interval){
//             clearInterval(interval)
//         }
//     }
// })

    const handlers = useSwipeable({
        onSwipedLeft:()=>updateIndex(activeIndex+1),
        onSwipedRight:()=>updateIndex(activeIndex-1)
    })
    return (
        <>
            <CarouselContainer
                {...handlers}
                //onMouseEnter={()=> setPaused(true)}
                //onMouseLeave={()=> setPaused(false)}
            >
                <Indicadores>
                    <Prev onClick={()=>{
                        updateIndex(activeIndex -1)
                    }}>
                        <AiOutlineDoubleLeft
                            style={{ color: "#f45d01ff", fontSize: "40px" }}
                        />
                    </Prev>
                    <Inner style={{transform: `translateX(-${(activeIndex*translateVar)}vh`}}>
                        {React.Children.map(children,(child, index)=>{
                            return React.cloneElement(child, {width:"fit-content", margin: margin})
                        })}
                    </Inner>

                    <Next onClick={()=>{
                        updateIndex(activeIndex +1)
                    }}>
                        <AiOutlineDoubleRight
                            style={{ color: "#f45d01ff", fontSize: "40px" }}
                        />
                    </Next>
                </Indicadores>
            </CarouselContainer>
        </>

    )
}
