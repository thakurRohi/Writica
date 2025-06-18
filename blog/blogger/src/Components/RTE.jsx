// in this file we are going to build a real time text editor
import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
// this is the functionality provided by react hook form by default
// it provides the control in order to keep track of changes
import {Controller } from 'react-hook-form';
// this conntrol comes from react hook form and responsible to take
// states  to that form 
export default function RTE({ name, control, label, defaultValue =""}){
    return(
    <div className='w-full'> 
         {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        <Controller
    // conditional endering , if name is prsent already then display it 
    // else write content by default
    name={name || "content"}
    control={control}
    // if there is any change happens then inform me with this field
    render={({field: {onChange}}) => (
        // this is the component that we have to render
        <Editor
        initialValue={defaultValue}
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY || "no-api-key"}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />



        </div>
    )
        
    

}