"use client";

import useModalUpload from "@/hooks/useModalUpload";
import Modal from "./Model";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useModalUpload();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }

    });

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        //upload to supabase
        try {
            setIsLoading(true);

            const song = values.song[0];
            const image = values.image[0];

            if (!song || !image || !user) {
                toast.error('You must select a song and an image');
                return; //exit
            }

            const uniqueID = uniqid();

            const {
                data: songData,
                error: songError
            } = await supabaseClient.storage
                .from('songs')
                .upload(`songs-${uniqueID}-${values.title}`, song, {
                    cacheControl: '3600',
                    upsert: false,
                });
            ;

            if (songError) {
                setIsLoading(false);
                return toast.error('Error uploading song');
            }

            //upload an image
            const {
                data: imageData,
                error: imageError
            } = await supabaseClient.storage
                .from('images')
                .upload(`image-${uniqueID}-${values.title}`, image, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (imageError) {
                setIsLoading(false);
                return toast.error('Error uploading image');
            }

            const {error: supabaseError} = await supabaseClient.from('songs').insert({
                user_id: user.id,
                title: values.title,
                author: values.author,
                image_path: imageData.path,
                song_path: songData.path,
            });
            
            if(supabaseError){
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Song uploaded successfully');
            reset();
            uploadModal.onClose();


        }
        catch (error) {
            toast.error('Error uploading song');
        } finally {
            setIsLoading(false);

        }
    }
    return (
        <Modal
            title="Add a new song"
            description=""
            isOpen={uploadModal.isOpen}
            onChange={onChange}>
            <form
                className="flex flex-col gap-y-2"
                onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', {
                        required: true,
                    })}
                    placeholder="Song title" />

                <Input
                    id="author"
                    disabled={isLoading}
                    {...register('author', {
                        required: true,
                    })}
                    placeholder="Song author" />

                <div>
                    <div className="pb-1">
                        Select a song to upload
                    </div>
                    <Input
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3 , .wav , .ogg , .flac , .m4a , .aac "
                        {...register('song', {
                            required: true,
                        })}
                    />

                    <div className="pb-1">
                        Select an image
                    </div>
                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register('image', {
                            required: true,
                        })}
                    />
                    <Button className="mt-4"
                        disabled={isLoading} type="submit">
                        Create
                    </Button>
                </div>

            </form>

        </Modal>
    )
};

export default UploadModal;