import React from 'react'
import ReactDOM from 'react-dom/client';
import { useRef, useState, useEffect } from "react"
import { Card, CardBody, Form, Input, Label, Button, Container } from "reactstrap";
// import { createPost as doCreatePost, uploadPostImage } from "../services/Post-services"
import JoditEditor from "jodit-react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import htmlToFormattedText from "html-to-formatted-text";
import { BackgroundImage } from '../components/BackgroundImg';
import { getAuth } from '@firebase/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// const { convert } = require('html-to-text');
import {onAuthStateChanged} from '@firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
const { htmlToText } = require('html-to-text');

export const CreateBlog = () => {
    const editor = useRef(null)
    const [content, setContent] = useState('')
    const [categories, setCategories] = useState([])
    const [user, setUser] = useState(undefined);
    const [image, setImage] = useState('');
    const [post, setPost] = useState({
        title: '',
        body: '',
        image: '',
        author: ''
    })
const navigate = useNavigate();
    //field changed function
    const fieldChanged = (event) => {
        // console.log(event)
        setPost({ ...post, 'title': event.target.value })
    }

    const contentFieldChanaged = (data) => {

        setPost({ ...post, 'body': data })


    }


    //create post function
    const createPost = (event) => {

        onAuthStateChanged(firebaseAuth, (currentUser) => {

            if (currentUser) {
                let user=currentUser.email.split('@');
                setPost({ ...post, 'author':  user[0]});
            }else{
                NotificationManager.error("Login is required !!");
                return
            }
        
        })
        event.preventDefault();
        if (post.title.trim() === '') {
            console.log(post)
            NotificationManager.error('Title is required !!');
            return;
        }

        if (post.body.trim() === '') {
            NotificationManager.error("post content is required !!")
            return;
        }

        if (post.image === '') {
            NotificationManager.error("Image is required !!")
            return;
        }
        console.log(post);
        axios({
            method:'post',
            url:'https://innovation-blog.onrender.com/create',
            data:post
        }).then((response) => {
            console.log(response);
            NotificationManager.success("Posted !!");
            navigate('/')
          })
          .catch(function (error) {
            // handle error
            NotificationManager.error("Error occured !!");
          });

    }

    //handling file chagne event
    const handleFileChange = (event) => {
        console.log(event.target.value)
        // setImage(event.target.value);

        setPost({ ...post, image: event.target.value })

    }
    return (
        <>
            <BackgroundImage />
            <div className="wrapper">

                <Card className="shadow-sm  border-0 mt-2" style={{ margin: '0% 5%', backgroundColor: '#87bde8' }}>
                    <CardBody>
                        {/* {JSON.stringify(post)} */}
                        <h3>What going in your mind ?</h3>
                        <Form onSubmit={createPost}>
                            <div className="my-3">
                                <Label for="title" >Post title</Label>
                                <Input
                                    type="text"
                                    id="title"
                                    placeholder="Enter here"
                                    className="rounded-0"
                                    name="title"
                                    onChange={fieldChanged}
                                />
                            </div>

                            <div className="my-3">
                                <Label for="content" >Post Content</Label>
                            
                                <JoditEditor
                                    ref={editor}
                                    value={post.content}

                                    onChange={(newContent) => contentFieldChanaged(newContent)}
                                />
                            </div>

                            {/* file field  */}

                            <div className="mt-3">
                                <Label for="image">Paste Image URL</Label>
                                <Input id="image" type="text" onChange={handleFileChange} />
                            </div>

                            <Container className="text-center">
                                <Button type="submit" className="rounded-0" color="primary">Create Post</Button>
                                <Button className="rounded-0 ms-2" color="danger">Reset Content</Button>
                            </Container>
                        </Form>
                    </CardBody>

                    <NotificationContainer />
                </Card>
            </div>
        </>
    )
}
