import React, {createRef, useRef, useState} from 'react';
import axios from '../api/axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Card, Col, Row} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import moment from 'moment';





const LOGIN_API = '/authenticate';
const ADD_POST_API = '/blogs/add';


type Props = {}

export default function AddPost({}: Props) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('');
    const [coverURL, setCoverURL] = useState('');
    const [success, setSuccess] = useState(false);


    const datetimeSQL = new Date().toISOString().replace(/T/, ' ').replace(/Z/, '');
    const startDate = moment(datetimeSQL).format('YYYY-MM-DDTHH:mm:ss.SSSSZ');

    const userAuth = useAuth();
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/showProfile/${userAuth.userId}`);
    }




    const handleChange = (e:any) =>{
        setCoverURL(URL.createObjectURL(e.target.files[0]));
        console.log(e.target.files[0]);
    }


    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const response = await axios.post(ADD_POST_API,
            {
                title: title,
                body: body,
                category: category,
                coverURL:  coverURL,
                publishedDate: startDate,
                published: true,
                myUsers: {id: userAuth.userId},
            }
        );
            setCoverURL(response.data);

        await new Promise(r => setTimeout(r, 100));
        console.log(response.config)
        setSuccess(true);

    }




    return (
        <div>
            <div className="bgAni"></div>
            <div className="bgAni bg2"></div>
            <div className="bgAni bg3"></div>

            {success ? <>{handleNavigate()}</> :
                (<div onSubmit={handleSubmit}  className='container' >
                    <h1 className='text-center mx-auto mt-5'>Write New Post</h1>
                    <Card className='m-5   mx-auto' style={{backgroundColor: 'lightgray',  filter: 'drop-shadow(16px 16px 10px black)' }}>
                        <Form className='m-5'>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" >
                                        <Form.Control
                                            type="text"
                                            id="title"
                                            placeholder="Blog title"
                                            onChange={(e) => setTitle(e.target.value)}
                                            required/>

                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" >
                                        <Form.Control
                                            type="text"
                                            id="category"
                                            placeholder="Category"
                                            onChange={(e) => setCategory(e.target.value)}
                                            required/>

                                    </Form.Group>
                                </Col>
                            </Row>



                            <Form.Group className="mb-3" >
                                <Form.Control
                                    as="textarea"
                                    rows={10}
                                    style={{height: '300px'}}
                                    id="body"
                                    placeholder="Start writing here"
                                    onChange={(e) => setBody(e.target.value)}
                                    required/>
                            </Form.Group>
                            <div className='text-center'>
                                <Button variant="outline-dark"  type="submit" >
                                    Create article
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </div>)}
        </div>
    )
}