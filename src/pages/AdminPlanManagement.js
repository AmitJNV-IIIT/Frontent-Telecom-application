/*eslint-disable */

import React, { useEffect, useState } from 'react';
import AdminHeader from '../components/Admin/AdminPlan/AdminHeader';
import AdminBody from '../components/Admin/AdminPlan/AdminBody';
import ReactPaginate from 'react-paginate';
// import axios from "axios";
// import { useAuth } from "../hooks/contextApi/AuthContext";
import { BASE_URL, limit } from '../constants/Constants';
import { request } from '../axios/AxiosHelper';
import './css/AdminPlanManagement.css';
import Swal from 'sweetalert2';
import { orange } from '@mui/material/colors';
//
function AdminPlanManagement() {
  // const {isLogin,role} =useAuth();
  const role = 'ADMIN';
  const [itemOffset, setItemOffset] = useState(0);

  const [adminPlanType, setAdminPlanType] = useState('Prepaid');
  const [isHeaderChanged, setIsHeaderChanged] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [dataArray, setDataArray] = useState([]);
  const itemsPerPage = 6;
  const planPerPage = 4;
  const [loading, setLoading] = useState(true);

  const [offset, setOffset] = useState(0);

  const settingPlanType = (type) => {
    setAdminPlanType(type);
    setIsHeaderChanged(true);
  };

  function fetchPlanData() {
    if (adminPlanType === 'Broadband') {
      fetchBroadbandData();
    } else {
      fetchMobileData();
    }
  }

  useEffect(() => {
    fetchPlanData();
  }, [adminPlanType]);

  function fetchMobileData() {
    setLoading(true);
    try {
      setLoading(true);
      request(
        'GET',
        `${BASE_URL}/mobile?type=${adminPlanType}&offset=${offset}&limit=${limit}&active=True`
      ).then((response) => {
        const resData = response;
        if (resData?.data?.length > 0) {
          if (adminPlanType === 'Prepaid') {
            setDataArray(resData.data);
          } else if (adminPlanType === 'Postpaid') {
            setDataArray(resData.data);
          }
        }
      });

      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: error.message,
        timer: 1000
      });
    }
  }

  const fetchBroadbandData = () => {
    setLoading(true);
    try {
      request('GET', `/broadband?active=True`).then((response) => {
        const resData = response.data;
        if (resData.length > 0) {
          setDataArray(resData);
        }
        setLoading(false);
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: error.message,
        timer: 1000
      });
    }
  };

  const handleAddPlan = (newPlan) => {
    setDataArray([...dataArray, newPlan]); // Add new plan to the list
  };

  const handleEditPlan = (editedPlan) => {
    // Find the plan to update in the list
    const planIndex = dataArray.findIndex(
      (dataArray) => dataArray.planId === editedPlan.planId
    );
    if (planIndex !== -1) {
      const updatedPlans = [...dataArray];
      updatedPlans[planIndex] = editedPlan;
      setDataArray(updatedPlans); // Update the plan in the list
    }
  };

  const handleDeletePlanImmediately = (planId) => {
    const updatedArr = dataArray.filter((plan) => plan.planId !== planId);
    setDataArray(updatedArr);
  };

  useEffect(() => {}, [handleDeletePlanImmediately]);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = dataArray.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(dataArray.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataArray.length;

    setItemOffset(newOffset);
  };
  return (
    <div
      className="admin-plan-mgmt-main-div"
      data-testid="admin-plan-mgmt-main-div"
    >
      <AdminHeader settingPlanType={settingPlanType} />
      <AdminBody
        dataArray={currentItems}
        handleAddPlan={handleAddPlan}
        handleEditPlan={handleEditPlan}
        adminPlanType={adminPlanType}
        role={role}
        loading={loading}
        handleDeletePlanImmediately={handleDeletePlanImmediately}
        handlePageClick={handlePageClick}
        pageCount={pageCount}
        itemOffset={itemOffset}
        pageNumber={pageNumber}
      />
    </div>
  );
}

export default AdminPlanManagement;
