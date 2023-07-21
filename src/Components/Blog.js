import { useState,useRef , useEffect, useReducer } from "react";

//Blogging App using Hooks
function blogReducer(state,action)
{
    switch(action.type)
    {
        case "ADD": 
            return [action.blog,...state]; 
        case "REMOVE":
            return state.filter((blog,index)=>index !== action.index);
        default:
            return [];
    }
}
export default function Blog(){
    // const [title, setTitle] = useState("");
    // const [content, setContent] = useState("");

    const [formData , setFormData ] = useState({title:"",content:""});

    //const [Blog, setBlog] = useState([]);
    const [Blog,dispatch] = useReducer(blogReducer,[]);

    const titleRef = useRef('');        // set title ref first time with ''  value.
    
    useEffect(()=>{                     // to pinint ref at first render
        titleRef.current.focus();} ,[]);
    
    useEffect(()=>{
        if(Blog.length && Blog[0].title.length)
        {
            document.title=Blog[0].title;
        }
        else{
            document.title="No Blogs!!";
        }
        
       
    },[Blog]);
    
    //Passing the synthetic event as argument to stop refreshing the page on submit
    function handleSubmit(e) {
        e.preventDefault();
       
        //setBlog([ {title:formData.title, content:formData.content},...Blog]); // Use spread operator to append the new blog to the existing array
        dispatch({type:"ADD" ,blog:{title:formData.title, content:formData.content} });

        setFormData({title:"",content:""});
        titleRef.current.focus();
    }
    function removeBlog(i)
    {
        //setBlog(Blog.filter((blog,index)=>i!==index));
        dispatch({type:"REMOVE",index:i});
    }
    return(
        <>
        {/* Heading of the page */}
        <h1>Write a Blog!</h1>

        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                value={formData.title}
                                ref = {titleRef}
                                onChange={(e)=>setFormData({ ...formData,title:e.target.value})}
                                />
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.."
                                value={formData.content}
                                required
                                onChange={(e)=>setFormData({ ...formData,content:e.target.value})}
                                />
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
            {
            Blog.map((blog, i) => (
                <div className="blog" key={i}>
                    <h3>{blog.title}</h3>
                    <p>{blog.content}</p>
                    <div className="blog-btn">
                        <button onClick={()=>removeBlog(i)} className="btn remove">
                            Delete
                        </button>
                    </div> 
                </div>
            ))
            }
        </>
        )
}

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
