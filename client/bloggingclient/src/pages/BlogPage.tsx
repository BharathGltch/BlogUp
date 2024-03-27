import { useParams } from "react-router-dom";
import { blogState } from "../store/atoms/blog";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
function BlogPage(){

    const [value, setValue] = useState('Helllo asdasdasd');

    // let {blogId}=useParams();
    // if(blogId=='undefined'){
    //     return(
    //         <div>No blog</div>
    //     )
    // }
    // let blogIDNumber=Number(blogId);
    // const blog=useRecoilValue(blogState(blogIDNumber))
    // if(blog==null){
    //     return(
    //         <div>Blog Not available</div>
    //     )
    // }

     return(
        <div>
        <div>Blog Page</div>
        <ReactQuill theme="snow" value={value}  onChange={setValue} ></ReactQuill>
        </div>
     )
}

export default BlogPage;