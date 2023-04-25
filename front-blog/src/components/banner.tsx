import React from 'react';

type Props = {
  subtitle: string;
  title: string;
  backgroundImage: string;
}

export const Banner: React.FC<Props>  = ({ backgroundImage, subtitle, title}) => {
  return (
     <header style={{marginTop: '2rem'}} data-overlay={8}>
        <div className="container text-center">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2" >
              <h1 className='banner-text'>{title}</h1>
              <p className="fs-20 opacity-70 banner-text">{subtitle}</p>
            </div>
          </div>
        </div>
      </header>
  );
}

export default Banner;