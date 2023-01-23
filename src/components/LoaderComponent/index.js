import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const LoaderComponent = () => {

    const [dataShow, setdata] = useState(false)

    const { data } = useSelector((state) => state.Loader);

    useEffect(() => {
        setdata(dataShow)
    }, [data])


    return (
        <div className="alter-gif-loader" style={{ display: dataShow ? 'block' : "none" }}>
            <div className="lightgreen"></div>
            <div className="darkgreen"></div>
        </div>
    )
}

export default LoaderComponent