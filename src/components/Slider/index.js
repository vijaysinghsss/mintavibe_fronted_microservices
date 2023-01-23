import React from 'react'
import Slider from "react-slick";


const SliderParent = ({ children, ...props }) => {
    // console.log('props', props);
    return (
        <Slider {...props}    >
            {children}
        </Slider>
    )
}

export default SliderParent