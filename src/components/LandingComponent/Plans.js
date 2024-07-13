/*eslint-disable*/
import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { CardMedia } from '@mui/material';
import logo from '../../assets/images/couponlogo.png';
import { trendingPlansUrl } from '../../constants/Constants';
import './css/Plans.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestNoHeader } from '../../axios/AxiosHelper';
import { useAuth } from '../../hooks/contextApi/AuthContext';
import Confirmation from '../Confirmation/ConfirmationModal';
import PrepaidDetailsModal from '../Prepaid/PrepaidDetailsModal';
import Swal from 'sweetalert2';
//
const TrendingPackage = ({
  hovered,
  setHovered,
  handleClick,
  trendingPlans,
  Plan,
  ott,
  noOtts
}) => {
  return (
    <div
      className="main-plan-section"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'relative'
      }}
    >
      <div style={{ position: 'relative', flex: 1 }}>
        <Card
          size="lg"
          variant="solid"
          color="neutral"
          invertedColors
          //style={{ height: '300px' }}
          sx={{ bgcolor: 'neutral.900' }}
          data-testid="prepaid-buy-button"
          className="card-a"
        >
          {Plan === 'Postpaid' && (
            <Chip
              size="sm"
              variant="outlined"
              sx={{
                position: 'absolute',
                right: 2,
                background:
                  'linear-gradient(to bottom right, #0080ff, #8000ff)',
                color: 'white',

                top: 2, // Adjust the top position if needed
                '&.chipstick': {
                  color: 'white !important' // Reset only the color property
                }
              }}
            >
              <span className="chipstick">MOST POPULAR</span>
            </Chip>
          )}
          <Typography className="PackageName" level="h4">
            {Plan} Trending Package
          </Typography>
          <p
            className="HeadingName"
            style={{ fontSize: '15px', marginTop: '1px' }}
          >
            Ideal for daily life in need of reliable and high-converting
            internet.
          </p>
          <Button
            endDecorator={<KeyboardArrowRight className="packbuybtn" />}
            style={{
              width: '100%',
              height: '50px',
              background: hovered
                ? 'linear-gradient(to bottom right, #0080ff, #8000ff)'
                : '',
              color: hovered ? '' : 'black'
            }}
            className="prepaid-button"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
          >
            <b className="packbuybtn" style={{ fontSize: '18px' }}>
              Buy now
            </b>
          </Button>

          <Divider className="packbuybtnrevert" inset="none" />
          <Typography level="caption">What you get:</Typography>
          <List
            size="sm"
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              mx: 'calc(-1 * var(--ListItem-paddingX))'
            }}
          >
            <ListItem>
              <ListItemDecorator>
                <Check />
              </ListItemDecorator>
              {trendingPlans[Plan]?.data[0]?.data + ' '}
              GB/day
              <br />
            </ListItem>
            {Plan != 'Broadband' ? (
              ''
            ) : (
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                {trendingPlans?.Broadband?.data[0]?.speed + ' '}
                MB / sec
                <br />
              </ListItem>
            )}
            <ListItem>
              <ListItemDecorator>
                <Check />
              </ListItemDecorator>
              Internet available broadwise
              <br />
            </ListItem>
            {Plan == 'Broadband' ? (
              ''
            ) : (
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Unlimited True 5G data
                <br />
              </ListItem>
            )}
            {Plan == 'Broadband' ? (
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                5 + subscriptions available <br />
              </ListItem>
            ) : (
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                {trendingPlans[Plan]?.data[0]?.sms}
                + SMS per day
                <br />
              </ListItem>
            )}

            <ListItem>
              <ListItemDecorator>
                <Check />
              </ListItemDecorator>
              {trendingPlans[Plan]?.data[0]?.validity + ' '}
              days validity
              <br />
            </ListItem>
          </List>
          <Divider className="packbuybtnrevert" inset="none" />
          {/* <CardMedia component="img" image={logo} sx={{ width: '25px', height: 'auto' }} />
          <p>Get Spotify premium for 30 days, Stream</p> */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CardMedia
              component="img"
              image={logo}
              alt="Logo Description"
              sx={{ width: '25px', height: 'auto' }}
            />

            {Plan != 'Broadband' ? (
              <p style={{ marginLeft: '10px' }}>
                {ott == undefined ? (
                  <>
                    {'Get ' +
                      'Spotify' +
                      ' premium for ' +
                      trendingPlans[Plan]?.data[0]?.validity +
                      ' days.' +
                      (noOtts > 1
                        ? ' Also with ' + (noOtts - 1) + ' more OTT benefits.'
                        : ' Also with other music benefits')}
                  </>
                ) : (
                  <>
                    {'Get ' +
                      ott[0] +
                      ' premium for ' +
                      trendingPlans[Plan]?.data[0]?.validity +
                      ' days' +
                      (noOtts > 1
                        ? ' Also with ' + (noOtts - 1) + ' more OTT benefits.'
                        : '.')}
                  </>
                )}
              </p>
            ) : (
              <p style={{ marginLeft: '10px' }}>
                Get free router installation and 6 months of warranty.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default function Plans() {
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  // const [hovered3, setHovered3] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [trendingPlans, setTrendingPlans] = useState({});
  const [prepaidOtt, setPrepaidOtt] = useState([]);
  const [postpaidOtt, setPostpaidOtt] = useState([]);
  const [broadbandOtt, setBroadbandOtt] = useState([]);
  const [selectedPlanType, setPlanType] = useState(null);
  const navigate = useNavigate();
  const getOTTImage = (ottName) => {
    const modifiedName =
      ottName === 'None'
        ? 'spotify'
        : ottName.replace(/\s+/g, '-').toLowerCase();
    let image;
    try {
      image = `https://excitel-bucket.s3.amazonaws.com/${modifiedName}.png`;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: error.message,
        timer: 1000
      });
    }
    return image;
  };

  const role = window.sessionStorage.getItem('ROLE');

  const handleClick = (planType) => {
    if (role == 'USER') {
      setPlanType(planType);
      setConfirmationModal(true);
    } else {
      window.scrollTo(0, 0);

      navigate('/login', {
        state: { from: '/', isModalOpen: true, data: trendingPlans[planType] }
      });
    }
  };

  async function fetchTrendingPlansJson() {
    try {
      const response = await fetch(trendingPlansUrl);

      const data = await response.json();
      setTrendingPlans(data);
      setPrepaidOtt(data?.Prepaid?.data[0]?.ott);
      setPostpaidOtt(data?.Postpaid?.data[0]?.ott);
      setBroadbandOtt(data?.Broadband?.data[0]?.ott);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was a problem with the fetch operation. Please try again later.'
      });
    }
  }

  useEffect(() => {
    fetchTrendingPlansJson();
  }, []);
  const numberOfPrepaidOtts = prepaidOtt?.length;
  const numberOfPostpaidOtts = postpaidOtt?.length;
  if (prepaidOtt && postpaidOtt && broadbandOtt) {
    for (let i = 0; i < prepaidOtt.length; i++) {
      prepaidOtt[i] =
        prepaidOtt[i].charAt(0).toUpperCase() + prepaidOtt[i].slice(1);
    }
    for (let i = 0; i < postpaidOtt.length; i++) {
      postpaidOtt[i] =
        postpaidOtt[i].charAt(0).toUpperCase() + postpaidOtt[i].slice(1);
    }
    for (let i = 0; i < broadbandOtt.length; i++) {
      broadbandOtt[i] =
        broadbandOtt[i].charAt(0).toUpperCase() + broadbandOtt[i].slice(1);
    }
  }
  const setIsModalOpen = () => {
    setConfirmationModal(false);
  };
  return (
    <div className="plans-container">
      <TrendingPackage
        hovered={hovered1}
        setHovered={setHovered1}
        handleClick={() => handleClick('Prepaid')}
        trendingPlans={trendingPlans}
        Plan="Prepaid"
        ott={prepaidOtt}
        noOtts={numberOfPrepaidOtts}
      />
      <TrendingPackage
        hovered={hovered2}
        setHovered={setHovered2}
        handleClick={() => handleClick('Postpaid')}
        trendingPlans={trendingPlans}
        Plan="Postpaid"
        ott={postpaidOtt}
        noOtts={numberOfPostpaidOtts}
      />
      <TrendingPackage
        hovered={hovered3}
        setHovered={setHovered3}
        handleClick={() => handleClick('Broadband')}
        trendingPlans={trendingPlans}
        Plan="Broadband"
        ott={postpaidOtt}
        noOtts={numberOfPostpaidOtts}
      />

      {confirmationModal && (
        <div className="plan-modal-container">
          {/* <div className="plan-modal"> */}

          {/* Modal content goes here */}

          <PrepaidDetailsModal
            type={selectedPlanType == 'Postpaid' ? 'PostpaidRecharge' : ''}
            setDetailsCardVisibility={setIsModalOpen}
            isOpen={confirmationModal}
            setIsModalOpen={setIsModalOpen}
            getOTTImage={getOTTImage}
            plan={trendingPlans[selectedPlanType]?.data[0]}
            //  isLogin={role!==''}
          />
          {/* </div> */}
          <div onClick={setIsModalOpen}></div>
        </div>
      )}
    </div>
  );
}
