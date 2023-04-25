import { Form, Button } from 'react-bootstrap';

type Props = {}

export default function VerificationFailed({}: Props) {



    return (

        <div className="log-fullscreen background-img center-bg p20" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/tech-blog.png)`}}>
            <div className="card-log cardshadowed p50 w400 mb0" style={{maxWidth: '100%'}}>
                <div className="text-center" >
                    <h4>Verification failed: User not found </h4>



                </div>
            </div>
        </div>
    )
}