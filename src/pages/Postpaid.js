// External libraries
import React, { useEffect, useState, Suspense } from 'react';
import PrepaidDetailsModal from '../components/Prepaid/PrepaidDetailsModal';
// Internal component imports
import PostpaidCardCarousel from '../components/Postpaid/PostpaidCardCarousel';
import Spinner from '../components/Common/Spinner/Spinner';
import SubNavbar from '../components/Common/Navbar/SubNavbar';
import { useLocation } from 'react-router-dom';
//
// Axios related imports
import { request } from '../axios/AxiosHelper';
import { BASE_URL, limit } from '../constants/Constants';
// CSS imports
import '../components/Common/Navbar/css/SubNavbar.css';
import '../components/Postpaid/css/Postpaid.css';
import { useAuth } from '../hooks/contextApi/AuthContext';

const Postpaid = () => {
  // const {isLogin} = useAuth();
  const { isLogin } = useAuth() || {};
  const currentPage = 'postpaid';
  const postpaidCategories = ['All', 'Quaterly', 'Semi-Annual', 'Annual'];
  const [postpaidCategory, setPostpaidCategory] = useState(
    postpaidCategories[0]
  );
  const [isRouteFromLoginDirectly, setIsRouteFromLoginDirectly] =
    useState(false);

  const location = useLocation();

  const setIsRouteFromLoginDirect = () => {
    setIsRouteFromLoginDirectly(false);
  };
  let offset = 0;
  const [loading, setLoading] = useState(true);
  const [postpaidPlans, setPostpaidPlans] = useState([]);

  function changePostpaidCategory(category) {
    setPostpaidCategory(category);
    offset = 0;
  }

  const fetchPostpaidPlans = () => {
    setLoading(true);

    if (offset >= limit) {
      offset = offset + limit;
    }

    const postpaidUrl =
      postpaidCategory === 'All'
        ? `${BASE_URL}/mobile?type=Postpaid&offset=${offset}&limit=${limit}&active=True`
        : postpaidCategory === 'Quaterly'
          ? `${BASE_URL}/mobile?type=Postpaid&offset=${offset}&limit=${limit}&days=84&active=True`
          : postpaidCategory === 'Semi-Annual'
            ? `${BASE_URL}/mobile?type=Postpaid&offset=${offset}&limit=${limit}&days=180&active=True`
            : postpaidCategory === 'Annual'
              ? `${BASE_URL}/mobile?type=Postpaid&offset=${offset}&limit=${limit}&days=365&active=True`
              : null;

    try {
      request('GET', postpaidUrl)
        .then((response) => {
          setPostpaidPlans(response?.data || []);
          setLoading(false);
        })
        .then(() => {});
    } catch (error) {
      setLoading(false);
      // throw error;
    }
  };
  const getOTTImage = (ottName) => {
    const modifiedName =
      ottName === 'None'
        ? 'spotify'
        : ottName.replace(/\s+/g, '-').toLowerCase();

    let image;
    try {
      image = `https://excitel-bucket.s3.amazonaws.com/${modifiedName}.png`;
    } catch (error) {
      // image = require(`../../assets/images/placeholder.png`).default;
    }
    return image;
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.state && location.state.data) {
      setIsRouteFromLoginDirectly(true);
    }
  }, []);
  useEffect(() => {
    fetchPostpaidPlans();
  }, [postpaidCategory]);

  return (
    <div className="postpaid-main-div">
      <div className="sub-navbar-wrapper">
        <div className="sub-navbar">
          {/* <SubNavbar
            categories={postpaidCategories}
            postpaidCategory={postpaidCategory}
            setPostpaidCategory={setPostpaidCategory}
            currentPage={currentPage}
            changePostpaidCategory={changePostpaidCategory}
          /> */}
          <SubNavbar
            categories={postpaidCategories}
            postpaidCategory={postpaidCategory}
            setPostpaidCategory={setPostpaidCategory}
            currentPage={currentPage}
            changePostpaidCategory={changePostpaidCategory}
          />
        </div>
      </div>

      <div className="postpaid-recharge-card">
        {loading ? (
          <Spinner />
        ) : (
          <PostpaidCardCarousel
            postpaidPlans={postpaidPlans}
            isLogin={isLogin}
          />
        )}
      </div>
      {isRouteFromLoginDirectly && (
        <Suspense fallback={<Spinner />}>
          <PrepaidDetailsModal
            setDetailsCardVisibility={setIsRouteFromLoginDirect}
            plan={location?.state?.data}
            type={'PostpaidRecharge'}
            getOTTImage={getOTTImage}
            // isLogin={PersonData != '' && PersonData != undefined}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Postpaid;
