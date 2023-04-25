import {Modal} from "react-responsive-modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Tab from "react-bootstrap/Tab";
import {useNavigate, useParams} from "react-router-dom";



const UPDATE_API = '/users/';


export default function Blog() {

    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [occupation, setOccupation] = useState('');
    const [location, setLocation] = useState('');
    const [twitter, setTwitter] = useState('');
    const [linkedIn, setlinkedIn] = useState('');
    const [success, setSuccess] = useState(false);


    const userAuth = useAuth();

    const navigate = useNavigate();

    const handleNavigate = () => {

        navigate(`/ShowProfile/${userAuth.userId}`);
    }






    const handleSubmit = async (e:any) => {
        e.preventDefault();


        const response = await axios.post(UPDATE_API + userAuth.userId,

            {
                userName: userAuth.username,
                bio: bio,
                occupation: occupation,
                location: location,
                twitter: twitter,
                linkedIn: linkedIn,
            }
        );
        console.log(response.data);
        await new Promise(r => setTimeout(r, 1000));
        setSuccess(true);


    }


    return (
        <div>
            <div className="bgAni"></div>
            <div className="bgAni bg2"></div>
            <div className="bgAni bg3"></div>
        {success ? <>{handleNavigate()}</> :



            <div className="container d-grid flex-wrap justify-content-center m10 ">
                <div className="card-log cardshadowed tesBox" style={{height: '770px', margin: '10px', paddingTop: '1px'}}>

                <Form className="dimEdit cen "  onSubmit={handleSubmit} >
                    <Form.Group className="mb-3 tes" >
                        <Form.Label >Bio</Form.Label>

                        <Form.Control
                            as="textarea"
                            rows={3}
                            style={{height: '300px'}}
                            id="body"
                            onChange={ (e) => setBio(e.target.value)}
                            placeholder="Start writing here"
                            required
                        />
                    </Form.Group>


                    <Form.Group className="mb-3 tes">
                        <Form.Label>Occupation</Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="What is your occupation?"
                            id="occupation"
                            onChange={(e) => setOccupation(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 tes">
                        <Form.Label >Location</Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="What is your Location"
                            id="Location"
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <div className='text-center tes' >

                        <Button variant="outline-dark" type="submit"  >Save</Button>


                    </div>
                </Form>
                </div>

            </div>}



        </div>

    );
}