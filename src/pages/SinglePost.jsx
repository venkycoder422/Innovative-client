import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import axios from 'axios';
const { htmlToText } = require('html-to-text');


export const SinglePost = () => {
    const [blog, setBlog] = useState({});
    const { id } = useParams();
    console.log(id);
    React.useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8080/blog/${id}`,
        })
            .then((res) => setBlog(res.data))
            .catch((err) => console.log(err))
    }, [id]);
    console.log("Blog", blog);
    return (

        <Container>


            <Post>
                <img src={blog.image} alt="blog" />
                <PostInfo>
                    <div className='post-icons'>
                        <div className='post-details'>
                            <span className='postCat'>{blog.author}</span>
                            <span className="postTitle">{blog.title}</span>
                            <span className='postData'>{blog.date}</span>
                        </div>

                        <div className='Icons'>
                            {/* <FaRegEdit /> */}
                            <Link to={`/delete/${blog._id}`}><RiDeleteBinLine className='svg2' /></Link>
                        </div>


                    </div>

                    <p className='postDesc'>{htmlToText(blog.body)}</p>
                </PostInfo>
            </Post>



        </Container>

    )
}

const Container = styled.div`
position:relative;
  display:grid;
  grid-template-columns:repeat(1,1fr);
  margin:5% 5% 0% 5%;
  justify-items:center;
`;
const Post = styled.div`
width:80%;
  img{
  width:100%;
  height:280px;
  object-fit:cover;
  border-radius:7px;
  }
`

const PostInfo = styled.div`
display:flex;
flex-direction:column;
.post-icons{
    display:flex;
    justify-content:space-between;
}
.post-details{
    display:flex;
    flex-direction:column;
}
.postTitle{
  font-family:'Jesefin Sans',sans-serif;
  font-size:24px;
  font-weight:700;
}
.postData{
  font-family:'Lora',serif;
  font-style:italic;
  font-size:13px;
  color:#999;
}
.Icons{
    padding: 0.5rem;
    svg{
        width:1.7rem;
        height:1.4rem;
    }
    .svg2{
        width:1.7rem;
        height:1.4rem;
        color:red;
    }
}

.postDesc{
font-family: 'Varela Round',dans-serif;
font-size:14px;
color:#444;
line-height:24px;
margin-top:15px;
overflow:hidden;
text-overflow:ellipsis;
display:-webkit-box;
-webkit-line-clamp:4;
-webkit-box-orient:vertical;
}

`