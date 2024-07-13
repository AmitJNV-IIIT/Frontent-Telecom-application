import React from 'react';
//
import './css/Support.css';
import {
  Grid,
  Typography,
  TextField,
  Container,
  InputAdornment,
  // IconButton,
  Button
} from '@mui/material';
// import Navbar from "../Navbar";
//
import support from '../../assets/images/SUpportImg.jpg';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/service-unavailable');
  };
  return (
    <>
      <Container maxWidth="xl" className="container-support">
        <Grid
          style={{
            justifyContent: 'center',
            marginBottom: '3%',
            alignItems: 'center'
          }}
          container
          spacing={2}
          data-testid="support-component"
        >
          <Grid
            style={{ display: 'flex', justifyContent: 'center' }}
            item
            xs={7}
            className="leftContent"
          >
            <div
              style={{
                marginTop: '3%',
                marginBottom: '2%'
              }}
            >
              <Typography
                variant="h5"
                component="div"
                className="centered-text purple-gradient-lighter"
                style={{ fontSize: '50px' }}
              >
                Excitel Customer Support
              </Typography>
              <Typography
                variant="h6"
                style={{
                  color: '#FFF',
                  textAlign: 'center',
                  marginBottom: '30px'
                }}
              >
                How can we help you?
              </Typography>

              <TextField
                InputProps={{
                  style: {
                    fontSize: '15px',
                    color: '#555',
                    marginRight: '0.5rem'
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={handleClick}
                        className="button-container"
                        style={{
                          background:
                            'linear-gradient(to bottom right, #0080ff, #8000ff)', // Gradient background color
                          color: '#ffffff', // White text color
                          borderRadius: '14px',
                          fontSize: '14px',
                          height: '40px',
                          width: '50px',
                          marginRight: '-1%'
                        }}
                      >
                        Go
                      </Button>
                    </InputAdornment>
                  )
                }}
                InputLabelProps={{
                  style: {
                    fontSize: '15px',
                    color: '#555',
                    marginRight: '0.5rem'
                  }
                }}
                style={{
                  background: 'whitesmoke',
                  borderRadius: '10px'
                }}
                placeholder="Write your query here, we'll be back in 24 hours..."
                variant="outlined"
                fullWidth
              />
            </div>
          </Grid>
          <Grid item xs={3.4} className="rightContent">
            <img
              style={{ borderRadius: '6%' }}
              src={support}
              alt="Right Image"
              className="image"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Support;
