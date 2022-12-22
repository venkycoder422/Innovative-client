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


    // getAuth()
    //     .getUserByEmail(email)
    //     .then((userRecord) => {
    //         // See the UserRecord reference doc for the contents of userRecord.
    //         console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    //     })
    //     .catch((error) => {
    //         console.log('Error fetching user data:', error);
    //     });

        

    // const GetUsers = () => {

    //     axios({
    //         method: 'get',
    //         url: '',

    //     })
    //         .then((res) => setUser(res.data))

    //         .catch((err) => console.log(err));
    //     }



    // const config={
    //     placeholder:"Start typing...",

    // }

    // useEffect(
    //     () => {

    //         setUser(getCurrentUserDetail())
    //         loadAllCategories().then((data) => {
    //             console.log(data)
    //             setCategories(data)
    //         }).catch(error => {
    //             console.log(error)
    //         })
    //     },
    //     []
    // )

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
            url:'http://localhost:8080/create',
            data:post
        }).then((response) => {
            console.log(response);
            NotificationManager.success("Posted !!");
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
    // console.log("HI", post);
    // const html = (post.content);
    // const text = htmlToText(post.content);
    // // const text = htmlToFormattedText('<img src="https://opportunities.masaischool.com/images/lead_banner.svg" />');
    // console.log(text);

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
                                {/* <Input
                        type="textarea"
                        id="content"
                        placeholder="Enter here"
                        className="rounded-0"
                        style={{ height: '300px' }}
                    /> */}

                                <JoditEditor
                                    ref={editor}
                                    value={post.content}

                                    onChange={(newContent) => contentFieldChanaged(newContent)}
                                />
                            </div>

                            {/* file field  */}

                            <div className="mt-3">
                                <Label for="image">Enter Post banner</Label>
                                <Input id="image" type="text" onChange={handleFileChange} />
                            </div>

                            {/* <div className="my-3">
                                <Label for="category" >Post Category</Label>
                                <Input
                                    type="select"
                                    id="category"
                                    placeholder="Enter here"
                                    className="rounded-0"
                                    name="categoryId"
                                    onChange={fieldChanged}
                                    defaultValue={0}

                                >

                                     <option disabled value={0} >--Select category--</option>

                                    {

                                        categories.map((category) => (
                                            <option value={category.categoryId} key={category.categoryId}>
                                                {category.categoryTitle}
                                            </option>
                                        ))

                                    }



                                </Input>
                            </div> 

                                */}



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
