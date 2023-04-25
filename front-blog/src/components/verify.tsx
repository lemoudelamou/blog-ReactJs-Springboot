import { Form, Button } from 'react-bootstrap';

type Props = {}

export default function Verify({}: Props) {



    return (

        <div className="log-fullscreen background-img center-bg p20" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/tech-blog.png)`}}>
            <div className="card-log cardshadowed p50 w400 mb0" style={{maxWidth: '100%'}}>
                <div className="text-center" >
                    <h4>Please verify your account </h4>
                    <div >

                        <Form className='mt-4'>
                            <div className='text-center'>

                                <h5> <a href={'/login'}>Click here to login </a> </h5>

                            </div>
                        </Form>

                    </div>


                </div>
            </div>
        </div>
    )
}