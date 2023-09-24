import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBSwitch } from "mdb-react-ui-kit";

const Theme = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <MDBContainer>
      <MDBRow className={darkMode ? 'dark-mode' : 'light-mode'}>
        <MDBCol>
          <h1>Welcome to My Website</h1>
          <p>Some content here...</p>
            {/* <MDBBtn >
                Theme
            </MDBBtn> */}
            {/* <MDBBtn color='dark'>
                Dark
            </MDBBtn> */}
          <MDBSwitch checked={darkMode}  onChange ={handleToggle}/>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Theme;
