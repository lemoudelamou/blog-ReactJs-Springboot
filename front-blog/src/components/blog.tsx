import React, {useEffect, useRef, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {ButtonGroup, Card, DropdownButton, Dropdown, Col,Row, Accordion} from 'react-bootstrap';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {myUsersType} from "../types/api-types";
import { LikeStatusType, BlogType }  from '../types/api-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown, faHashtag, faList, faGear, faComments, faSignsPost, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import Comments from '../components/add-comment'


import AddPost from "./add-post";


import moment from "moment/moment";
import Form from "react-bootstrap/Form";
import {render} from "react-dom";
import Button from "react-bootstrap/Button";

const PUBLIC_SINGLE_BLOG_API = '/blogs/show/';
const COMMENT_API = '/comment/show/';
const DELETE_COMMENT_API = '/comment/deleteComm/';
const DELETE_COMMENTSBLOG_API = '/comment/deleteCommBlog/';
const DELETE_BLOG_API = '/deleteBlog/';
//const BLOG_LIKES_API = '/blogs/likes/';
//const BLOG_UNLIKES_API = '/blogs/unlikes/';
//const BLOG_ADD_LIKEUNLIKE_API = '/blogs/likeunlike/';
//const BLOG_REMOVE_LIKEUNLIKE_API = '/blogs/likeunlike/remove/';

type Props = {}


export default function Blog({}: Props) {
    const [blogdata, setBlogdata] = useState<BlogType>();
    const [likes, setLikes] = useState(0);
    const [unlikes, setUnlikes] = useState(0);
    const [likeStatus, setLikeStatus] = useState<LikeStatusType>();
    // const [isLikedUnliked, setIsLikedUnliked] = useState(false);
    const [isAuth, setIsAuth] = useState(useAuth)

    const [content, setContent] = useState('');
    //const [success, setSuccess] = useState(false);
    //const [userName, setUsername] = useState('');
    const [date, setDate] = useState('');
    const [commentsdata, setCommentsdata] = useState(
        [
            {
                id: '',
                content: '',
                blog_id: '',
                username: '',
                createdAt: '',
                myUsers: {
                    id: '',
                    userName: ''
                }
            }
        ]);


    const datetimeSQL = new Date().toISOString().replace(/T/, ' ').replace(/Z/, '');
    const startDate = moment(datetimeSQL).format('YYYY-MM-DDTHH:mm:ss.SSSSZ');
    const navigate = useNavigate();

    let blogId = useParams().id;
    let CommentId = useParams().id;
    let userAuth = useAuth();


    const handleNavigate = () => {
        navigate("/login");
    }
    const handleNavigateToHome = () => {
        navigate("/");
    }


    const handleCommentSubmit = async (e: any) => {
        e.preventDefault();

        if (userAuth.isAuthenticated) {
            const response = await axios.post('/comment/create',
                {
                    content: content,
                    blog: {id: blogId},
                    createdAt: startDate,
                    myUsers: {
                        id: userAuth.userId,
                        userName: userAuth.username
                    }
                },
            );

            await new Promise(r => setTimeout(r, 100));
            setDate(startDate);
            console.log(response.data);
            e.target.reset();
        } else {
            handleNavigate()
        }
        const getComment = async () => {
            const response = await axios.get(COMMENT_API + CommentId);
            setCommentsdata(response.data);
            console.log(response.data);

        }
        getComment();

    }


    useEffect(() => {
        const getComment = async () => {
            const response = await axios.get(COMMENT_API + CommentId);
            setCommentsdata(response.data);
            console.log(response.data);
        }
        getComment();
    }, [CommentId]);


    const deleteComment = async (CommentId: string) => {

        const response = await axios.delete(DELETE_COMMENT_API + CommentId + "/" + userAuth.userId);
        console.log(response.data);
        window.location.reload();

    }

    const deleteBlog = async (BlogId: string) => {

        const response1 = await axios.delete(DELETE_COMMENTSBLOG_API + BlogId);
        if (response1) {
            const response2 = await axios.delete(DELETE_BLOG_API + BlogId + "/" + userAuth.userId);
            handleNavigateToHome();
            console.log(response2.data);
        }

    }


    useEffect(() => {
        const getBlog = async () => {
            const response = await axios.get(PUBLIC_SINGLE_BLOG_API + blogId);
            setBlogdata(response.data);
            console.log(response.data);
        }
        getBlog();
    }, [blogId]);


    /*
    useEffect(()=> {
        const getBlogLikes = async() => {
            const response = await axios.get(BLOG_LIKES_API+blogId);
            setLikes(response.data);
            console.log(response.data);
        }
        getBlogLikes();
    }, [blogId, isLikedUnliked]);
    useEffect(()=> {
        const getBlogUnLikes = async() => {
            const response = await axios.get(BLOG_UNLIKES_API+blogId);
            setUnlikes(response.data);
            console.log(response.data);
        }
        getBlogUnLikes();
    }, [blogId, isLikedUnliked]);
    useEffect(()=> {
        if(userAuth.isAuthenticated){
            const likeStatus = async() => {
                const response = await axios.get('blogs/'+blogId+'/'+userAuth.username);
                console.log(response.data);
                setLikeStatus(response.data);
            }
            likeStatus();
        }}, [blogId, userAuth.isAuthenticated, isLikedUnliked]);

    const handleLikeUnlike = async(status: string) => {



        if(status === 'like'){
            if(likeStatus?.id){
                await axios.post(BLOG_REMOVE_LIKEUNLIKE_API+likeStatus.id);
                await axios.post(BLOG_ADD_LIKEUNLIKE_API, {
                    blog: {id: blogId},
                    likedBy: {id: userAuth.userId}
                })
                setIsLikedUnliked(!isLikedUnliked);
            } else {
                await axios.post(BLOG_ADD_LIKEUNLIKE_API, {
                    blog: {id: blogId},
                    likedBy: {id: userAuth.userId}
                })
                setIsLikedUnliked(!isLikedUnliked);
            }
        } else if(status === 'unlike'){
            if(likeStatus?.id){
                await axios.post(BLOG_REMOVE_LIKEUNLIKE_API+likeStatus.id);
                await axios.post(BLOG_ADD_LIKEUNLIKE_API, {
                    blog: {id: blogId},
                    unlikedBy: {id: userAuth.userId}
                })
                setIsLikedUnliked(!isLikedUnliked);
            } else {
                await axios.post(BLOG_ADD_LIKEUNLIKE_API, {
                    blog: {id: blogId},
                    unlikedBy: {id: userAuth.userId}
                })
                setIsLikedUnliked(!isLikedUnliked);
            }
        }


    }
    */


    let formatedDate = moment(blogdata?.publishedDate).format('MMMM DD, YYYY')


        return (
            <div>


                {/* Header */}
                <header  className="header header-inverse h-fullscreen pb-80 header-overlay" style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/writing-article.jpeg)`,
                    filter: 'drop-shadow(16px 16px 10px black)'}} data-overlay={8}>
                    <div className="container text-center overlay">

                        <div className="row h-full ">
                            <div className="col-12 col-lg-8 offset-lg-2 align-self-center">

                                <br/>
                                <p className="opacity-70" style={{color: 'white'}}>Article</p>


                                <br/>
                                <br/>


                                <h1 className="display-4 hidden-sm-down" style={{color: 'white'}}>{blogdata?.title}</h1>
                                <span className="opacity-70 mr-20 pr3 " style={{color: 'white'}}>By</span>
                                <Link to={`/user/${blogdata?.myUsers.userName}`} className="text-decoration-none">
                                    <p>


                                        <a href="#">{blogdata?.myUsers.userName}</a>
                                    </p>

                                </Link>

                                <p>
                                    <img className="rounded-circle w-40"
                                         src={`${process.env.PUBLIC_URL}/assets/img/avatar/2.jpg`} alt="..."/>
                                </p>
                            </div>

                        </div>
                    </div>
                </header>
                <hr className="w-100"/>

                {/* END Header */}
                {/* Main container */}
                <main className="main-content">
                    {/*
|‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
| Blog content
|‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
!*/}
                    <br/>
                    <br/>
                    <div className="section" id="section-content">
                        <div className="container">


                            <br/>
                            <div className="row">
                                <div className="col-12 col-lg-8 offset-lg-2 tt ">
                                    <p>
                                        {blogdata?.body}
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>

                    <footer>
                        <hr className="w-100"/>

                        <div className="row p-5">
                            <div className="col-12 col-lg-8 offset-lg-2">


                                { userAuth.isAuthenticated && userAuth.userId == blogdata?.myUsers.id ?
                                <div className='leftbox mb50'>
                                    <Button className="center"  variant="outline-dark" type="submit" onClick={() => deleteBlog(`${blogdata?.id}`)} ><FontAwesomeIcon icon={ faTrashCan }/>
                                        Delete Article
                                    </Button>
                                </div> : <></>}
                                <div className="middlebox">
                                    <div className="pm cen">
                                        <p className="fs-9 ps text-sm-center ">
                                            <FontAwesomeIcon icon={faHashtag}/>
                                            {blogdata?.category}</p>
                                    </div>
                                </div>
                                <div className='rightbox mb30'>
                                    <p className="fs-9 text-end">Published on: {formatedDate}</p>
                                </div>

                            </div>
                        </div>
                    </footer>
                    {/*


|‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
| Comments
|‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
!*/}
                    <hr className="w-100"/>

                    <Accordion defaultActiveKey="0" style={{padding: '30px', marginBottom: '50px'}}>
                        <Accordion.Item eventKey="0" >
                            <Accordion.Header><FontAwesomeIcon icon={ faComments }/>  Comments</Accordion.Header>
                            <Accordion.Body>
                    <Card className='m-5 mx-auto padd75 cen' style={{
                        backgroundColor: "white",
                        paddingLeft: '100px',
                        paddingRight: '100px',
                        paddingBottom: '1px',
                    }}>


                        <div className="p50" style={{marginBottom: '40px', filter: 'drop-shadow(16px 16px 10px black)'}}>
                            {commentsdata.map((comment) =>
                                <Card className="box test" style={{display: 'block', marginTop: '20px'}}>
                                    <Card.Header className="text-left test">

                                        <div>
                                            <Card.Img className="rounded-circle w-20 "
                                                      style={{width: '40px', height: '40px', marginRight: '10px'}}
                                                      src={`${process.env.PUBLIC_URL}/assets/img/avatar/2.jpg`}/>
                                            {comment.myUsers.userName}
                                        </div>
                                        {userAuth.isAuthenticated && userAuth.userId.toString() == comment.myUsers.id ?
                                            <div>

                                                <Button variant="outline-dark" onClick={() => deleteComment(`${comment.id}`)}><FontAwesomeIcon icon={ faTrashCan }/> Delete</Button>

                                            </div> : <div></div>
                                        }

                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title></Card.Title>
                                        <Card.Text>
                                            {comment.content}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className=""
                                                 style={{alignSelf: 'flex-end'}}>{moment(comment?.createdAt).format('MMMM DD, YYYY, hh:mm')}</Card.Footer>
                                </Card>
                            )}
                        </div>
                        <div className="p50">
                            <div className='container' onSubmit={handleCommentSubmit}>
                                <h3 className="font-light text-lg text-gray-600 fz">Leave a Comment</h3>
                                <form className="mt-4 w-full">


                                    <Form.Group className="mb-3 box" controlId="ControlTextarea">
                                        <Form.Label>Your Comment</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            style={{height: '300px', filter: 'drop-shadow(16px 16px 10px gray)'}}
                                            id="content"
                                            className="fs-9"
                                            placeholder="Start writing here"
                                            onChange={(e) => setContent(e.target.value)}
                                            required/>
                                    </Form.Group>
                                    <div className="cenButt fz">
                                    <button
                                        className=" rounded px-3 py-2 "
                                        style={{
                                            backgroundColor: 'white',
                                            color: 'black',
                                            fontFamily: 'revert-layer'
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faSignsPost}/>
                                        Post a comment
                                    </button>
                                    </div>
                                </form>
                            </div>

                        </div>


                    </Card>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                </main>
                {/* END Main container */}


            </div>
        )
    }


