/*eslint-disable*/
import React, { useState } from 'react';
import { SvgIcon } from '@mui/material';
import Divider from '@mui/joy/Divider';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import excitelLogo from '../../../assets/images/logo.png';
import tick from '../../../assets/images/couponlogo.png';
import appleLogo from '../../../assets/images/apple-logo.png';
import playStoreLogo from '../../../assets/images/play-store-logo.png';
import './css/Footer.css';
import { Link, useNavigate } from 'react-router-dom';
import { Padding } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useAuth } from '../../../hooks/contextApi/AuthContext';

function Footer() {
  const [activeLink, setActiveLink] = useState('');
  const navigate = useNavigate();
  const role = window.sessionStorage.getItem('ROLE');
  const isLogin = role == 'USER' ? true : false;
  const handleIconClick = (icon) => {
    let url;

    // Add more cases as needed for different icons
    switch (icon) {
      case 'instagram':
        url = 'https://www.instagram.com';
        break;
      case 'facebook':
        url = 'https://www.facebook.com';
        break;
      case 'youtube':
        url = 'https://www.youtube.com';
        break;
      case 'linkedIn':
        url = 'https://www.linkedin.com';
        break;
      case 'twitter':
        url = 'https://www.twitter.com';
        break;
      case 'playStore':
        // url = "https://play.google.com";
        Swal.fire({
          title: 'Coming Soon...',
          text: "Exitel's Mobile App for Android is on its way!.",
          icon: 'info',
          iconHtml: `<img src=${playStoreLogo} style="width: 17vw; height: auto;">`,
          confirmButtonText: 'Okay',
          customClass: {
            icon: 'swal2-info' // Apply the custom CSS class to the info icon
          }
        });
        return;
      case 'appStore':
        Swal.fire({
          title: 'Coming Soon...',
          text: 'Exitel Mobile App for your Apple Device is coming soon.',
          icon: 'info',
          iconHtml: `<img src = ${appleLogo} style="width: 15vw; height: auto;">`,
          confirmButtonText: 'Okay',
          customClass: {
            icon: 'swal2-info' // Apply the custom CSS class to the info icon
          }
        });
        return;
    }

    window.open(url);
  };
  const handleLinkClick = (path) => {
    window.scrollTo(0, 0);
    if (!isLogin && path == '/feedback') {
      navigate('/login');
    } else {
      setActiveLink(path);
      navigate(path);
    }
  };
  const instagramGradient =
    'linear-gradient(to right, #405DE6, #833AB4, #FD1D1D, #F56040, #FFDC80)';
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col-a">
          <img
            to="/"
            onClick={() => handleLinkClick('/')}
            src={excitelLogo}
            alt="logo"
            style={{ height: '50px', width: '140px', marginTop: '4.5%' }}
            loading="lazy"
            className="exitel-logo"
          />
          <p className="footer-about-wrapper">
            Accessible in every nook and corner of India
          </p>

          <br />

          <div className="footer-customer-support">
            <img
              src={tick}
              alt="tick"
              style={{ height: '20px', width: '20px' }}
              loading="lazy"
            />
            <Link
              to="/support"
              onClick={() => handleLinkClick('/support')}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <div className="footer-link-hover">
                Executive customer support
              </div>
            </Link>
          </div>

          <br />
          <br />
          <Divider className="line-section" inset="context" />
          <br />
          <div className="footer-copyright">
            <p>@2024 Excitel All rights reserved.</p>
          </div>
        </div>

        <div className="footer-col-b">
          <p>Our Offerings</p>
          <div className="footer-col-b-items">
            <Link
              to="/prepaid"
              onClick={() => handleLinkClick('/prepaid')}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <div className="footer-link-hover">Prepaid</div>
            </Link>

            <Link
              to="/postpaid"
              onClick={() => handleLinkClick('/postpaid')}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <div className="footer-link-hover">Postpaid</div>
            </Link>

            <Link
              to="/broadband"
              onClick={() => handleLinkClick('/broadband')}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <div className="footer-link-hover">Broadband</div>
            </Link>
          </div>
        </div>

        <div className="footer-col-c">
          <p>Support</p>
          <div className="footer-col-b-items">
            <Link
              to="/"
              onClick={() => handleLinkClick('/')}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <div className="footer-link-hover">Home</div>
            </Link>

            <Link
              to="/"
              onClick={() => handleLinkClick('/')}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <div className="footer-link-hover">Trending Plans</div>
            </Link>

            <Link
              to={!isLogin ? '/login' : '/feedback'}
              onClick={() => handleLinkClick('/feedback')}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <div className="footer-link-hover">Feedback</div>
            </Link>
            <Link
              to="/support"
              onClick={() => handleLinkClick('/support')}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <div className="footer-link-hover">FAQ</div>
            </Link>

            <Link
              to="/locate"
              onClick={() => handleLinkClick('/locate')}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <div className="footer-link-hover">Locate Us</div>
            </Link>

            <Link
              to="/support"
              onClick={() => handleLinkClick('/support')}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <div className="footer-link-hover">Contact Us</div>
            </Link>
          </div>
        </div>

        <div className="footer-col-d">
          <p style={{ paddingLeft: '10px' }}>Connect with us</p>
          <div className="social-media-icons" style={{ paddingLeft: '10px' }}>
            <SvgIcon
              data-testid="twitter-icon"
              component={XIcon}
              style={{ fontSize: 40, background: '#0b010d 50%' }}
              onClick={() => handleIconClick('twitter')}
              className="footer-col-d-icon"
            />
            <SvgIcon
              data-testid="linkedin-icon"
              component={LinkedInIcon}
              style={{ fontSize: 40, background: '#0e76a8' }}
              onClick={() => handleIconClick('linkedIn')}
              className="footer-col-d-icon"
            />
            <SvgIcon
              data-testid="instagram-icon"
              component={InstagramIcon}
              style={{ fontSize: 40, background: instagramGradient }}
              onClick={() => handleIconClick('instagram')}
              className="footer-col-d-icon"
            />
            <SvgIcon
              data-testid="facebook-icon"
              component={FacebookIcon}
              style={{ fontSize: 40, background: '#3b5998' }}
              onClick={() => handleIconClick('facebook')}
              className="footer-col-d-icon"
            />
            <SvgIcon
              data-testid="youtube-icon"
              component={YouTubeIcon}
              style={{ fontSize: 40, background: '#FF0000' }}
              onClick={() => handleIconClick('youtube')}
              className="footer-col-d-icon"
            />
          </div>

          <p style={{ paddingLeft: '10px', marginBottom: '3px' }}>
            Download Excitel Now
          </p>
          <div className="download-app">
            <img
              alt="Get it on Google Play"
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              style={{ height: '65px', width: '150px' }}
              onClick={() => handleIconClick('playStore')}
              // loading="lazy"
              className="footer-col-d-icon"
            />
            <img
              alt="Download on the App Store"
              src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
              style={{ height: '44px', width: '140px' }}
              onClick={() => handleIconClick('appStore')}
              loading="lazy"
              className="footer-col-d-icon"
            />
          </div>

          <div className="terms-conditions">
            <div>Privacy Policy</div>
            <div>Terms & Conditions</div>
          </div>

          <div className="footer-copyright-col-d">
            <p>@2024 Excitel All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
