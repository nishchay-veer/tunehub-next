"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { BiPlay } from "react-icons/bi";

interface ListItemProps {

    image: string;
    name: string;
    href: string;

}

const ListItem: React.FC<ListItemProps>= ({
    image,
    name,
    href
}) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(href);
    }
    return  (
    <button 
    onClick={handleClick}
    className="
    relative
    group
    flex
    items-center
    rounded-md
    overflow-hidden
    gap-x-4
    bg-neutral-100/10
    hover:bg-neutral-100/20 transition
    pr-4 ">

        <div className="
        relative 
        min-h-[64px] 
        min-w-[64px] ">
            <Image className="
            object-cover" fill src={image} alt="" />
        </div>
        <p className="truncate font-medium py-5">{name}</p>
        <div className="
        absolute
        transition
        opacity-0
        rounded-full
        flex
        items-center
        justify-center
        bg-green-500
        p-2
        drop-shadow-md
        right-5
        group-hover:opacity-100
        hover:scale-110
        ">
            <BiPlay size={30} className="text-black" />
        </div>

        
    </button> )
}

export default ListItem