import { useState, useEffect} from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from '../api/axios';


const REGISTER_API = '/register';
const CHECK_USERNAME_API = '/usernamecheck';
type Props = {}

export default function Register({}: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errrormsg, setErrormsg] = useState('');




  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/verify");
  }


  useEffect(() => {
    if(username && username.length > 4) {
      console.log("username :" + username);
      const CheckUsername = async () => {
          try {
            const response = await axios.get(CHECK_USERNAME_API+'/'+username);
            console.log("response:");
            console.log(response.data);
            if(response.data){
              setErrormsg('Username alredy exists..');
              setIsError(true);
            } else {
              setErrormsg('Username available..');
              setIsError(false);
            }

          } catch (error:any) {
            setIsError(true);
            console.log("error");
            console.log(error);
            console.log("specific error :"+error.response.data.message)
            setErrormsg(error.response.data.message);
            //setErrormsg('Server Error');
          }
        }
      CheckUsername();
      } else setErrormsg('');
    },[ username, email ]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if(!isError){
      const response = await axios.post(REGISTER_API, 
        {
        userName: username,
          email: email,
        password: password,
        roles: "ROLE_USER",
        }
      );
      console.log("response:");
      console.log(response.data);
      // setSuccess(true);
    }
    setSuccess(!success)
    console.log('Data Submitted')};




    return (
<div className="log-fullscreen background-img center-bg p20" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/tech-blog.png)`}}>
    <div className="card-log cardshadowed p50 w400 mb0" style={{maxWidth: '100%'}}> 
    {success ? <>{handleNavigate()}</> :
    (<div>
      <h5 className='text-center mx-auto mt-5'>Register/Sign Up</h5>
      <div onSubmit={handleSubmit}>
      <div className='text-center mx-auto'>
      {(errrormsg && errrormsg==="Username available..") &&
        (<div className='alert alert-success p-0 mb-0 border-0'>
        <p aria-live="assertive">{errrormsg}</p>
        </div>)}
        {(errrormsg && (errrormsg==="Username alredy exists.." || errrormsg==="Server Error")) &&
        (<div className='alert alert-danger p-0 mb-0 border-0'>
        <p aria-live="assertive">{errrormsg}</p>
      </div>)}
      </div>
      <Form className='m-5 mt-4'>
      <Form.Group className="mb-3" >
        <Form.Label>Username</Form.Label>
        <Form.Control 
          type="text"
          placeholder="Username (min 5 characters)"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e:any) => setUsername(e.target.value)}
          required/>
      </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Email</Form.Label>
          <Form.Control
              type="text"
              placeholder="Email (min 5 characters)"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e:any) => setEmail(e.target.value)}
              required/>
        </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password"
          id="password"
          onChange={(e:any) => setPassword(e.target.value)}
          required />
      </Form.Group>
      <div className='text-center'>
      <Button variant="outline-dark" type="submit" disabled={isError} >
        Register
      </Button>
      <Form.Text className="text-muted">
      <hr className="w-30" />

          <br />Already have a account! go to <Link to='/login'>Login</Link>
        </Form.Text>
      </div>
    </Form>
    
    </div>


      
    </div>)}
    </div>   
    </div>
  )
}