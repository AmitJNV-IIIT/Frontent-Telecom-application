/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Suspense } from 'react';
import Filters from '../components/Prepaid/Filters';
import Spinner from '../components/Common/Spinner/Spinner';
import RechargeCard from '../components/Common/RechargeCard/RechargeCard';
import SubNavbar from '../components/Common/Navbar/SubNavbar';
import PrepaidDetailsModal from '../components/Prepaid/PrepaidDetailsModal';
import { request } from '../axios/AxiosHelper';
import { useLocation, useNavigate } from 'react-router-dom';

import { limit, BASE_URL } from '../constants/Constants';
import '../components/Common/Navbar/css/SubNavbar.css';
import '../components/Prepaid/css/Pagination.css';
import '../components/Prepaid/css/Prepaid.css';
import '../components/Prepaid/css/PrepaidRechargeModal.css';
import { colors } from '@mui/material';
//
const Prepaid = () => {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.state && location.state.data) {
      setIsRouteFromLoginDirectly(true);
    }
  }, [pathname]);
  const history = useNavigate();
  const [isRouteFromLoginDirectly, setIsRouteFromLoginDirectly] =
    useState(false);
  const location = useLocation();

  const setIsRouteFromLoginDirect = () => {
    setIsRouteFromLoginDirectly(false);
  };
  const currentPage = 'prepaid';
  const role = 'USER';
  const prepaidCategories = [
    'All',
    'Unlimited',
    'Topup',
    'Data',
    'Special',
    'Other'
  ];
  // const [prepaidPlans, setPrepaidPlans] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prepaidCategory, setPrepaidCategory] = useState(prepaidCategories[0]);
  const [pageNumber, setPageNumber] = useState(1);
  const [offset, setOffset] = useState(0);
  const planPerPage = 4;
  const itemsPerPage = 4;
  const [filters, setFilters] = useState({
    days: 0,
    data: 0,
    price: 0
  });

  const changePrepaidCategory = (category) => {
    setPrepaidCategory(category);
    setPageNumber(1);
    setOffset(0);
  };

  const updateFilter = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      days: 0,
      data: 0,
      price: 0,
      [filterName]: value
    }));
    setPageNumber(1);
    setItemOffset(0);
  };

  const fetchPrepaidPlans = (offset, filters = {}) => {
    setLoading(true);
    const prepaidUrl =
      filters.days === 0 && filters.data === 0 && filters.price === 0
        ? prepaidCategory == 'All'
          ? `${BASE_URL}/mobile?type=Prepaid&offset=${offset}&limit=${limit}&active=True`
          : `${BASE_URL}/mobile?type=Prepaid&category=${prepaidCategory}&offset=${offset}&limit=${limit}&active=True`
        : filters.days > 0 && filters.data === 0 && filters.price === 0
          ? prepaidCategory == 'All'
            ? `${BASE_URL}/mobile?type=Prepaid&offset=${offset}&limit=${limit}&days=${filters.days}&active=True`
            : `${BASE_URL}/mobile?type=Prepaid&category=${prepaidCategory}&offset=${offset}&limit=${limit}&days=${filters.days}&active=True`
          : filters.price > 0 && filters.data === 0 && filters.days === 0
            ? prepaidCategory == 'All'
              ? `${BASE_URL}/mobile?type=Prepaid&offset=${offset}&limit=${limit}&price=${filters.price}&active=True`
              : `${BASE_URL}/mobile?type=Prepaid&category=${prepaidCategory}&offset=${offset}&limit=${limit}&price=${filters.price}&active=True`
            : filters.data !== 0 && filters.days === 0 && filters.price === 0
              ? prepaidCategory == 'All'
                ? `${BASE_URL}/mobile?type=Prepaid&offset=${offset}&limit=${limit}&data=${filters.data}&active=True`
                : `${BASE_URL}/mobile?type=Prepaid&category=${prepaidCategory}&offset=${offset}&limit=${limit}&data=${filters.data}&active=True`
              : null;

    try {
      request('GET', prepaidUrl)
        .then((response) => {
          setAllData(response?.data || []);
          setLoading(false);
        })
        .then(() => {});
    } catch (error) {
      setLoading(false);
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
    setOffset(offset);
    fetchPrepaidPlans(offset, filters);
  }, [filters, offset, prepaidCategory]);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = allData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(allData.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allData.length;
    setPageNumber(event.selected);
    setItemOffset(newOffset);
  };

  return (
    <div className="prepaid-main" data-testid="prepaid-main">
      <div className="sub-navbar-wrapper">
        <div className="sub-navbar">
          <SubNavbar
            categories={prepaidCategories}
            prepaidCategory={prepaidCategory}
            setPrepaidCategory={setPrepaidCategory}
            currentPage={currentPage}
            changePrepaidCategory={changePrepaidCategory}
          />
        </div>
      </div>
      <div className="container-wrapper">
        <div className="container-prepaid">
          <div className="row" data-testid="filters">
            <Filters updateFilter={updateFilter} setFilters={setFilters} />

            <div className="recharge-cards col-8">
              {loading ? (
                <Spinner />
              ) : allData.length == 0 ? (
                <div className="prepaid-no-plans">No Plans Found</div>
              ) : (
                <RechargeCard
                  role={role}
                  dataArray={currentItems}
                  prepaidCategory={prepaidCategory}
                  data-testid="prepaid-recharge-card"
                  length={allData.length}
                  itemOffset={itemOffset}
                />
              )}
            </div>
          </div>
        </div>

        {isRouteFromLoginDirectly && (
          <Suspense fallback={<Spinner />}>
            <PrepaidDetailsModal
              setDetailsCardVisibility={setIsRouteFromLoginDirect}
              plan={location?.state?.data}
              getOTTImage={getOTTImage}
              // isLogin={PersonData != '' && PersonData != undefined}
            />
          </Suspense>
        )}
        <div className="pagination-prepaid-div">
          <ReactPaginate
            breakLabel="..."
            nextLabel={pageNumber === pageCount - 1 ? null : 'Next >'}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel={itemOffset > 1 ? '< Previous' : null}
            renderOnZeroPageCount={null}
            onClick={handlePageClick}
            className="pagination-component"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            marginPagesDisplayed={1}
            nextLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active-page"
          />
        </div>
      </div>
    </div>
  );
};

export default Prepaid;
