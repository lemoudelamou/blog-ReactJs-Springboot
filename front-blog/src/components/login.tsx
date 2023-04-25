import React, { useState,useEffect } from 'react';
import axios from '../api/axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Load from "../helpers/load";

const LOGIN_API = '/authenticate';
const CHECK_ACTIVATION_API = '/verify';
type Props = {}

export default function Login({}: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [verificationCode, setVerificationCode] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setLoading] = useState(true)




  const userAuth = useAuth();

  const navigate = useNavigate();

  const handleNavigate = () => {

      navigate(`/showProfile/${userAuth.userId}`);
  }

  useEffect(() => {
    if(verificationCode){
      console.log("verificationCode :" + verificationCode);
      const checkActivation = async () => {
        try {

            const response = await axios.get(CHECK_ACTIVATION_API + '/' + verificationCode);
          if(response.data) {
            console.log("response:");
            console.log(response.data);
            setVerificationCode(true);
          } else {
            console.log("error")
          }

        } catch (e) {
          console.log("user account not activated")
        }

      }
      checkActivation();
    }

  }, [verificationCode])


    const handleSubmit = async (e:any) => {

    setError(false);
    e.preventDefault();

    try {

      const response = await axios.post(LOGIN_API,

          {
            userName: username,
            password: password,
          }
      );
      console.log(response.data.jwt);

        localStorage.setItem('token', response.data.jwt);
        userAuth.setIsAuthenticated(true);
      await new Promise(r => setTimeout(r, 1000));
      setSuccess(true);
      setLoading(false);

    } catch (error){

      setError(true);
    }
  }




    return (


            <div>
           {success ? ( isLoading ? <Load/> : <>{handleNavigate()}</>) :
              (<div onSubmit={handleSubmit} className="log-fullscreen background-img center-bg p-20"
                    style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/tech-blog.png)`}}>
                <div className="card-log cardshadowed p50 w400 mb0" style={{maxWidth: '100%'}}>
                  <h1 className='text-center mx-auto mt-5'>Login</h1>
                  <div className='text-center mx-auto'>
                    {error ? (
                        <div className="alert alert-danger p-0 mb-0 border-0" role="alert">
                          <p aria-live="assertive">INCORRECT PASSWORD OR USERNAME</p>
                        </div>
                    ) : null}
                  </div>
                  <Form className='m-5'>
                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                          type="text"
                          id="username"
                          placeholder="Enter a registered username"
                          onChange={(e) => setUsername(e.target.value)}
                          required/>

                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>

                      <Form.Control
                          type="password"
                          placeholder="Your Password"
                          id="password"
                          onChange={(e) => setPassword(e.target.value)}
                          required/>
                    </Form.Group>
                    <div className='text-center'>

                        <Button variant="outline-dark" type="submit" >


                          <span>Login</span>
                        </Button>


                      <Form.Text className="text-muted">
                        <hr className="w-30"/>

                        <br/>Don't have a account yet! go to <Link to='/register'>Register</Link>
                      </Form.Text>
                    </div>
                  </Form>

                </div>
              </div>)}

        </div>
    )

}