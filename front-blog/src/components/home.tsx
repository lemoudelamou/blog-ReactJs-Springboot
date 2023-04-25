import {useEffect, useState} from 'react'
import { Card } from 'react-bootstrap';
import axios from '../api/axios';
import Blog from './blog';
import { Link } from 'react-router-dom';
import '../css/animbackground.css'
import Banner from './banner';
import Pagination from "./pagination";
import Load from "../helpers/load";
import Button from "react-bootstrap/Button";

const PUBLIC_BLOGS_API = '/blogs';

type Props = {}



export default function Home({}: Props) {
    const [blogsdata, setBlogsdata] = useState(
        [
            {
                id:'',
                title:'',
                body:'',
                coverURL: '',
                publishedDate:null,
                published:true
            }
        ]);

    const [isLoading, setLoading] = useState(true)
    const [showPerPage, setShowPerPage] = useState(6);
    const [pagination, setPagination] = useState({
        start: 0,
        end: showPerPage,
    });

// @ts-ignore
    const onPaginationChange = (start, end) => {
        setPagination({ start: start, end: end });
    };

    // @ts-ignore
    const truncate = (input) => {
        return input?.length > 600 ? `${input.substring(0, 500)}...` : input;
    };

    useEffect(()=> {
        const getBlogs = async() => {
            const response = await axios.get(PUBLIC_BLOGS_API);


            setBlogsdata(response.data);
            console.log(response.data);
            setLoading(false)
        }
        getBlogs();
    },[]);




    return (
        isLoading ? (<Load/>):

            (<div>



                <div className="bgAni"></div>
                <div className="bgAni bg2"></div>
                <div className="bgAni bg3"></div>
                <div className="p-5 mb-4 bg-light"style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/first.png)`, height:'300px' ,filter: 'drop-shadow(16px 16px 10px black)'}}>
                    <div className="container-fluid  " >
                        <h1 className="display-5  mt-5 text-center" style={{color: 'white'}}>Welcome To Tech Blog</h1>
                        <p className="fs-5 mt-5 text-center" style={{color: 'white'}}>For all passionate about Technology and programming languages</p>
                    </div>
                </div>
                <div className="container d-grid flex-wrap justify-content-center">

                {blogsdata.slice(pagination.start, pagination.end).map((blog) =>
                        <div style={{
                            paddingBottom: '2rem', filter: 'drop-shadow(16px 16px 10px black)'
                        }}>
                                <Card

                                    onClick={() => {
                                        <Blog/>
                                    }}
                                    bg='light'
                                    key={blog.id}
                                    text='dark'
                                    style={{
                                        width: '50vw',
                                        height: '70vh',
                                        margin: '0.5rem',
                                        borderRadius:'5px',
                                        boxShadow: '0px 0px 15px 0px rgba(2,67,233,0.08)'
                                    }}
                                    className="mb-2 border-0 text-center"
                                >
                                    <Card.Img
                                        variant="top"
                                        src={`${process.env.PUBLIC_URL}/assets/img/writing-article.jpeg`}
                                        style={{width: '50vw', height: '30vh', borderRadius: '5px'}}/>
                                    <Card.Body>
                                        <Card.Title>
                                            <div className="text-center">{blog.title}</div>

                                        </Card.Title>

                                        <Card.Text>
                                            <div className="text-center tt size">{truncate(blog.body)}</div>

                                            <br/>

                                        </Card.Text>

                                    </Card.Body>
                                    <Card.Footer>
                                        <Button className="center" size="sm" variant="outline-dark" type="submit" href={`/blog/${blog.id}`} >
                                           read more
                                        </Button>
                                    </Card.Footer>
                                </Card>

                        </div>)

                }


            </div>

            <Pagination
                showPerPage={showPerPage}
                onPaginationChange={onPaginationChange}
                total={blogsdata.length}
            />

        </div>)
    )
}