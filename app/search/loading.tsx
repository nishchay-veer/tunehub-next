"use client";
import Box from "@/components/Box";
import {BounceLoader} from "react-spinners"
const Loading = () => {
    return (
        <Box className='h-full flex items-center justify-center'>
            <BounceLoader color='#b83280' size={40} />
            </Box>
    )
}

export default Loading