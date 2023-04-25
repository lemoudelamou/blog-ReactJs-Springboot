import { useEffect, useState } from 'react'
import React from "react";
import Form from "react-bootstrap/Form";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import {useNavigate, useParams} from "react-router-dom";
import {BlogType} from "../types/api-types";

const PUBLIC_SINGLE_BLOG_API = '/blogs/show/';


export default function AddComment(){

    const [content, setContent] = useState('');
    const [username, setUsername] = useState('');
    const [success, setSuccess] = useState(false);


    const userAuth = useAuth();
    let blogId = useParams().id;

    const navigate = useNavigate();


    const handleNavigate = () => {
        navigate("/login");
    }



    const handleCommentSubmit = async (e:any) => {
        e.preventDefault();

        if(userAuth.isAuthenticated) {
            const response = await axios.post('/comment/create',
                {
                    content: content,
                    blog: {id: blogId},
                    username: userAuth.username,
                    myUsers: {id: userAuth.userId,
                        userName: userAuth.username},
                }
            );
            await new Promise(r => setTimeout(r, 100));
            setUsername(userAuth.username)

            setSuccess(true);
        } else {
            handleNavigate()
        }

    }



    return (

        <div className='container' onSubmit={handleCommentSubmit} >
            <h3 className="font-light text-lg text-gray-600">Leave a Comment</h3>
            <Form.Control
                type="text"
                placeholder="Normal text"
                onChange={(e) => setUsername(e.target.value)}
                required/>
            <form className="mt-4 w-full" >


                <br/>
                <Form.Group className="mb-3" controlId="ControlTextarea">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        style={{height: '300px'}}
                        id="content"
                        placeholder="Start writing here"
                        onChange={(e) => setContent(e.target.value)}
                        required/>
                </Form.Group>

                <button
                    className=" rounded px-3 py-2"
                    style={{backgroundColor: 'black',
                    color:'white',
                    fontFamily:'revert-layer'}}

                >
                    Submit
                </button>
            </form>
        </div>


    )

}

