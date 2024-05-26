"use client";

import { BiSolidPlaylist } from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useModalUpload from "@/hooks/useModalUpload";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface LibraryProps {
    songs: Song[];
}
const Library: React.FC<LibraryProps> = ({songs}) => {
    const subscribeModal = useSubscribeModal();
    const authModal = useAuthModal();
    const {user } = useUser();
    const uploadModal = useModalUpload();
    const onPlay = useOnPlay(songs);
    const onClick = () => {
        //Handle upload later
        if(!user){
            authModal.onOpen();
            return ;
        }
        //TODO: Check for subscription
        return uploadModal.onOpen();
    }
    return (
        <div className="flex flex-col">
        
        <div 
            className="
                flex 
                items-center 
                justify-between
                gap-y-2 
                px-5 
                pt-4" >
        <div className="inline-flex
        items-center
        gap-x-2">
            <BiSolidPlaylist className="text-neutral-400" size={20} />
            <p className="text-neutral-400 font-medium text-md">Your Library</p>
        
        </div>
        <AiOutlinePlus 
        onClick={onClick}
        size={20}
        className="text-neutral-400 cursor-pointer hover:text-white transition" />
        </div>
        <div className="
        flex
        flex-col
        gap-y-2
        mt-4
        px-3">
            {songs.map((song) => (
                
                    <MediaItem
                    onClick={(id: string) => onPlay(id)}
                    key={song.id} 
                    song={song} />
            ))}

        </div>
        </div>
    )
}

export default Library