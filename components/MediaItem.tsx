
import Image from 'next/image'
import { Song } from '@/types'
import useLoadImage from '@/hooks/useLoadImage';

interface MediaItemProps {
    song: Song;
    onClick?: (id: string) => void;

}

const MediaItem: React.FC<MediaItemProps> = ({song, onClick}) => {
    const imagePath = useLoadImage(song);

    const handleClick = () => {
        if(onClick){
            onClick(song.id);
        }
    }
  return (
    <div 
    onClick={handleClick}
    className="flex 
    items-center 
    gap-x-3
    cursor-pointer
    hover:bg-neutral-800/50
    w-full
    p-2
    rounded-md"> 
    <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">

        <Image fill
                    src={imagePath || "/likedSongs.png"}
                   
                    className="object-cover rounded-md"
                    alt="" /> 
                    </div>
                    <div className="flex flex-col gap-y-1 overflow-hidden">
                        <p className="text-white font-medium truncate">{song.title}</p>
                        <p className="text-neutral-400 text-sm truncate">{song.author}</p>
                    </div>
    </div>
                    
            
  )
}

export default MediaItem