import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoadingSpinner = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
	  flexDirection: 'column', 
      height: 'max-h-screen', // Takes full viewport height
      width: '100%',    // Takes full width
	
    }}>
      <div style={{
        width: '250px',  // Set your desired width
        height: '250px',  // Set your desired height
		marginTop: '100px'
      }}>
        <DotLottieReact
          src="/animations/loading.json"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;