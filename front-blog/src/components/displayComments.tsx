
import moment from "moment/moment";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import { Card } from 'react-bootstrap';
import axios from "../api/axios";
import {useParams} from "react-router-dom";
import useAuth from "../hooks/useAuth";
const COMMENT_API = '/comment/show/';


type Props = {}


export default function DisplayComments({}: Props){
    const [commentsdata, setCommentsdata] = useState(
        [
            {
                id:'',
                content:''
            }
        ]);
    const [commentDisplay, setCommentDisplay] = useState();

    let userAuth = useAuth();
    let CommentId = useParams().id;


    useEffect(()=> {
        const getComment = async() => {
            const response = await axios.get(COMMENT_API+CommentId);
            setCommentsdata(response.data);
            console.log(response.data);
            await new Promise(r => setTimeout(r, 1));

        }
        getComment();
    }, [CommentId]);


    return (
        <Card className="text-center">
            <Card.Header>Featured</Card.Header>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
    );








}