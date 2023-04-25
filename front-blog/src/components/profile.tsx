import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button, Container } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import useAuth from '../hooks/useAuth';
import { myUsersType, BlogType, ConnectionType } from '../types/api-types';
import Load from "../helpers/load";
import Form from "react-bootstrap/Form";
import moment from "moment";


const PUBLIC_PROFILE_API = '/user/';
const PROFILE_API = '/showProfile/';

const PUBLIC_BLOGS_API = '/getBlogs/';
const USER_CONNECTIONS_API = '/user/connections-all-type/';
const USER_FOLLOWERS_API = '/user/followers/';
const USER_PENDING_API = '/user/pending-connections/';
const CONNECTION_CHECK_API = 'user/connections/status';
const UPDATE_API = '/users/';



type Props = {
}

export default function PublicProfile({}: Props) {
  const [userdata, setUserdata] = useState<myUsersType>();
  const [blogsdata, setBlogsdata] = useState<Array<BlogType>>([]);
  const [connections, setConnections] = useState<Array<ConnectionType>>([]);
  const [userAuth, setUserAuth] = useState(useAuth());
  const [update, setUpdate] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [occupation, setOccupation] = useState('');
  const [location, setLocation] = useState('');


  let myuserId = useParams().id;


  useEffect(() => {
    setUpdate(!update);
  }, []);



  useEffect(()=> {
    const getProfile = async() => {
    const response = await axios.get(PROFILE_API + myuserId);
    console.log(response.data);
      setUserdata(response.data);
  }
  getProfile();
  },[myuserId, update]);

  useEffect(()=> {
    const getBlogs = async() => {
    const response = await axios.get(PUBLIC_BLOGS_API + myuserId);
    setBlogsdata(response.data);
  }
  getBlogs();
  },[userAuth, update]);


  useEffect(()=> {
    const getConnections = async() => {
    const response = await axios.get(USER_CONNECTIONS_API + userAuth.username);
    
    if(response.data && (response.data.length > 0)) {
      setConnections(response.data);
    }
    console.log(connections);
  }
  getConnections();
  },[blogsdata]);
 

  const handleRemove = async (connectionId: number)=>{
    await axios.get('/user/connections/remove/'+connectionId);
    setUpdate(!update)
  }

  const handleAccept = async (connectionId: number, senderId: number)=>{
    await axios.get('/user/connections/remove/'+connectionId);
    await axios.post('/user/connections/add',
        {
          receiver: {id: userAuth.userId},
          sender: {id: senderId},
          following: 1,
          requested: 0,
          accepted: 1
      }
      );
      await axios.post('/user/connections/add',
        {
          receiver: {id: senderId},
          sender: {id: userAuth.userId},
          following: 1,
          requested: 0,
          accepted: 1
      }
      );
    setUpdate(!update)
  }




  return (

      (

    <Container >
      <div className="bgAni"></div>
      <div className="bgAni bg2"></div>
      <div className="bgAni bg3"></div>
      <div className="d-flex flex-lg-row flex-md-row flex-column p-3">
      <div style={{paddingBottom: '20px'}}>
      <Card style={{ width: '18rem',  filter: 'drop-shadow(16px 16px 10px black)', marginRight: '20px'}} >
      <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/img/avatar/2.jpg`}/>
      <Card.Body>
        <Card.Title> {userdata?.userName}  </Card.Title>

      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item><p style={{fontWeight: 'bold'}}>Bio:<br/></p> {userdata?.bio}
        </ListGroup.Item>
        <ListGroup.Item><p style={{fontWeight: 'bold'}}>Email:</p> {userdata?.email}</ListGroup.Item>
        <ListGroup.Item><p style={{fontWeight: 'bold'}}>Occupation:</p> {userdata?.occupation}</ListGroup.Item>
        <ListGroup.Item><p style={{fontWeight: 'bold'}}>Location:</p> {userdata?.location}</ListGroup.Item>
      </ListGroup>

    </Card>
    </div>

    <div>
    <Tabs
      defaultActiveKey="posts"
      id="uncontrolled-tab-example"
      className="mb-3"
      >
      <Tab eventKey="posts" title="Blog Posts">
      <div className="container d-flex flex-wrap">
      <div className=" align-self-center align-items-center align-content-center">
        <h1 className="text-center pb-2">Recent Posts</h1>
      </div>
    {blogsdata.map((blog) => 
      <div style={{marginBottom:'50px',  filter: 'drop-shadow(16px 16px 10px black)'}}>
        <Link to={`/blog/${blog.id}`}
          style={{textDecoration: 'none'}}
          className="m-0 p-0">
        <Card
          bg='dark'
          key={blog.id}
          text='light'
          style={{ width: '50vw'}}
          className="m-0 p-0">
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Text>
              {blog.body}
              <br></br>
              <br/>
              {moment(blog.publishedDate).format('MMMM DD, YYYY')}
            </Card.Text>
          </Card.Body>
        </Card>
        </Link>
      </div>
)}
    </div>
      </Tab>



      <Tab eventKey="connections" title="Connections">
      <div className="container d-flex flex-wrap">
      <div className=" align-self-center align-items-center align-content-center">
        <h1 className="text-center pb-2">Recent Connections</h1>
      </div>
    {connections.map((connection) => 
    {return connection.accepted===true &&
      <>
        <Link to={`/user/${connection.sender.userName}`}
          style={{textDecoration: 'none'}}
          className="m-0 p-0">
        <Card
          bg='light'
          key={connection.id}
          text='dark'
          style={{ width: '40vw', height: '50px'}}
          className="m-0 p-0">
          <Card.Body className="m-0 p-0">
            <div className='row'>
            <div className='col-3 text-center'><Card.Img style={{width: '45px',height: '45px', borderRadius: '50%' }}src={`https://avatars.dicebear.com/api/avataaars/${connection.sender.userName}.svg`}/></div>
            <div className='col-4 ms-5'>
              <div className='row mx-auto mt-2'><Card.Title>{connection.sender.userName}</Card.Title></div>
            </div>
            <div className='col-3 text-center mt-1'><Button onClick={()=>handleRemove(connection.id)}>Remove</Button></div>
            </div>
          </Card.Body>
        </Card>
        </Link>
      </>})}
    </div>
      </Tab>


      
      <Tab eventKey="followers" title="Followers">
      <div className="container d-flex flex-wrap">
      <div className=" align-self-center align-items-center align-content-center">
        <h1 className="text-center pb-2">Recent Followers</h1>
      </div>
    {connections.map((connection) => 
    {return connection.following===true &&
      <>
        <Link to={`/user/${connection.sender.userName}`}
          style={{textDecoration: 'none'}}
          className="m-0 p-0">
        <Card
          bg='light'
          key={connection.id}
          text='dark'
          style={{ width: '50vw'}}
          className="m-0 p-0">
          <Card.Body className="m-0 p-0">
            <div className='row'>
            <div className='col-3 text-center'><Card.Img style={{width: '45px',height: '45px', borderRadius: '50%' }} src={`https://avatars.dicebear.com/api/avataaars/${connection.sender.userName}.svg`}/></div>
            <div className='col-5 ms-5'>
              <div className='row mx-auto mt-2'><Card.Title>{connection.sender.userName}</Card.Title></div>
              {/* <div className='row'><Card.Text>{connection.sender.bio}</Card.Text></div> */}
            </div>
            </div>
          </Card.Body>
        </Card>
        </Link>
      </>})}
    </div>
      </Tab>

      <Tab eventKey="pending" title="Connections Pending">
      <div className="container d-flex flex-wrap">
      <div className=" align-self-center align-items-center align-content-center">
        <h1 className="text-center pb-2">Recent Requests</h1>
      </div>
    {connections.map((connection) => 
    {return connection.requested===true &&
      <>
        <Link to={`/user/${connection.sender.userName}`}
          style={{textDecoration: 'none'}}
          className="m-0 p-0">
        <Card
          bg='light'
          key={connection.id}
          text='dark'
          style={{ width: '50vw'}}
          className="m-0 p-0">
          <Card.Body className="m-0 p-0">
            <div className='row'>
            <div className='col-3 text-center'><Card.Img style={{width: '45px',height: '45px', borderRadius: '50%' }}src={`https://avatars.dicebear.com/api/avataaars/${connection.sender.userName}.svg`}/></div>
            <div className='col-4 ms-5'>
              <div className='row mx-auto mt-2'><Card.Title>{connection.sender.userName}</Card.Title></div>
              {/* <div className='row'><Card.Text>{connection.sender.bio}</Card.Text></div> */}
            </div>
            <div className='col-3 text-center mt-1'><Button onClick={()=>handleAccept(connection.id, connection.sender.id)}>Accept Request</Button></div>
            </div>
          </Card.Body>
        </Card>
        </Link>
      </>})}
    </div>
      </Tab>



      
    </Tabs>
    </div>


    </div>
    </Container>)
    )
}