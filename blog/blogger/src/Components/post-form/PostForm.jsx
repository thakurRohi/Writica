import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
// this is the information that useForm is going to provide
// gives watch capabilities also for continous monitor
// control provided also that further passed to RTE
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
// we take information by making a "post" , on the base of that info we can decide wether the
// user has came to esit ot upload new post
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {

        if (post) {
        // use appwrite service to upload file
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
        // once file is uploaded dedlet the older one
            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }
        // update the post now by giving data , post.id is slug
     
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                   // overwrite featured image
                featuredImage: file ? file.$id : undefined,
            });
        // once evrything oden succesfuly navigate user
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } 
        // if there is no post that measn the user wants to create something new
        //// aslo he doesn have to update anything
        else {
            // so we handle file first
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({
                     ...data, userId: userData.$id 
                    });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    // we have two nput fields , title an dslug , watch tittle sonstantly and convert space
    // to -

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
     // else return empty string
        return "";
    }, []);



    React.useEffect(() => {
        //this varibale could be of any name , basicaly it is used for optimasation of
        // use Effect 
        // lets say we called a method in useEffect now we optimize it by storing in a variale
        // naming subsription or any and at the end unsubsribe it to stop it from getting called
        // in loop
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}