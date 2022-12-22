import axios from 'axios'
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const { htmlToText } = require('html-to-text');
export const Blogs = () => {
  const [blogs, setBlog] = useState([]);
  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://innovation-blog.onrender.com/blogs',

    })
      .then((res) => setBlog(res.data.blogs))

      .catch((err) => console.log(err))
  }, [])

  console.log(blogs);
  return (
    <Container>
      {
        blogs.map((item) => (
          <Link to={`/blog/${item._id}`}><Post>
            <img src={item.image} alt="blog" />
            <PostInfo>
              <span className="postTitle">
                {item.title}
              </span>
              <span className="author">
                Author: {item.author}
              </span>
              <hr />
              <span className='postData'>{item.date}</span>
  
              <p className='postDesc'>{htmlToText(item.body)}</p>
            </PostInfo>


          </Post></Link>
        ))
      }

    </Container>
  )
}
const Container = styled.div`
  position:relative;
  display:grid;
  grid-template-columns:repeat(3,1fr);
  margin:5% 5% 0% 5%;
  justify-items:center;
  background-color:#d1d1d1;
  padding:5% 0%;
  border-radius:0.5rem;
  a{
    text-decoration:none;
  }
`;
const Post = styled.div`
width:400px;
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
.postTitle{
  font-family:'Jesefin Sans',sans-serif;
  font-size:24px;
  font-weight:700;
  color:black;
}
.author{
  color:black;
}
.postData{
  font-family:'Lora',serif;
  font-style:italic;
  font-size:13px;
  color:black;
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
  font-size: 16px;
    line-height: 32px;
    font-weight: 400;
    color: #36344D;
    letter-spacing: .3px;
}

`
