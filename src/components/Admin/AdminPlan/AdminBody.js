/* eslint-disable */
import React, { useEffect, useState } from 'react';
// import "../../Common/Navbar/css/SubNavbar.css";
import AdminAddEditPlan from './AdminAddEditPlan';
import RechargeCard from '../../Common/RechargeCard/RechargeCard';
import PlanRating from './PlanRating';
import './css/AdminBody.css';
import Spinner from '../../Common/Spinner/Spinner';
import ReactPaginate from 'react-paginate';
import { request } from '../../../axios/AxiosHelper';
import './css/AdminBody.css';
//
const AdminBody = ({
  dataArray,
  handleAddPlan,
  handleDeletePlanImmediately,
  handleEditPlan,
  adminPlanType,
  role,
  loading,
  pageCount,
  handlePageClick,
  itemOffset,
  pageNumber
}) => {
  const [planDetails, setPlanDetails] = useState({});
  const [addEditFlag, setAddEditFlag] = useState(false);

  const [planFeedbacks, setPlanFeedbacks] = useState([]);
  const [planFeedbackId, setPlanFeedbackId] = useState();
  const [currPlanRating, setCurrPlanRating] = useState(5);
  const [avgRating, setAvgRating] = useState(-1);
  const [planCoupon, setPlanCoupon] = useState(null);

  const setFeedbackIdforFeedbacks = (id) => {
    setPlanFeedbackId(id);
  };

  const setCurrentPlanRating = (rating) => {
    setCurrPlanRating(rating);
  };

  useEffect(() => {
    if (planFeedbackId != null) {
      request(
        'GET',
        `subscriptions/planfeedback?planId=${planFeedbackId}&starRating=${currPlanRating}`
      ).then((response) => {
        setPlanFeedbacks(response?.planReview || []);
      });

      request('GET', `subscriptions/planfeedback/${planFeedbackId}`).then(
        (response) => {
          setAvgRating(parseFloat(response.averagePlanReview).toFixed(2) || 4);
        }
      );
    }
  }, [planFeedbackId, currPlanRating]);

  function setPlanDetailsFromRechargeCard(data, coupon) {
    if (data) {
      setPlanDetails(data);
      setAddEditFlag(true);
      setPlanCoupon(coupon);
    }
  }
  return (
    // <div style={{ overflowX: "hidden" }} className="prepaid-main">
    //   <div className="container-wrapper-admin">
    //     <div className="container">
    //       <div
    //         style={{ marginTop: '14rem', justifyContent: 'center' }}
    //         className="row"
    //       >
    //         <div
    //           className="filters-admin col-3"
    //           style={{ position: 'relative' }}
    //         >
    //           <div data-testid="admin-add-edit-plan-test">
    //             <AdminAddEditPlan
    //               planDetails={planDetails}
    //               handleAddPlan={handleAddPlan}
    //               handleEditPlan={handleEditPlan}
    //               addEditFlag={addEditFlag}
    //               setAddEditFlag={setAddEditFlag}
    //               adminPlanType={adminPlanType}
    //               planCoupon={planCoupon}
    //             />
    //             <div>
    //               <PlanRating planFeedbacks={planFeedbacks} setCurrentPlanRating={setCurrentPlanRating} avgRating={avgRating} currPlanRating={currPlanRating}/>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="recharge-cards col-8" c>
    //           {loading ? (
    //             <Spinner />
    //           ) : (
    //             <RechargeCard
    //               dataArray={dataArray}
    //               setPlanDetailsFromRechargeCard={setPlanDetailsFromRechargeCard}
    //               setFeedbackIdforFeedbacks={setFeedbackIdforFeedbacks}
    //               role={role}
    //               adminPlanType={adminPlanType}
    //               handleDeletePlanImmediately={handleDeletePlanImmediately}
    //             />
    //           )}
    //         </div>
    //         <div
    //           className="pagination-prepaid-div"
    //           style={{ display: 'flex', color: 'white' }}
    //         >
    //           <ReactPaginate
    //             breakLabel="..."
    //             nextLabel="Next >"
    //             onPageChange={handlePageClick}
    //             pageRangeDisplayed={3}
    //             pageCount={pageCount}
    //             previousLabel="< Previous"
    //             renderOnZeroPageCount={null}
    //             onClick={handlePageClick}
    //             className="pagination-component"
    //             activeClassName="active-link"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="admin-body-main-container">
      <div className="admin-body-left-container">
        <div
          className="admin-body-left-container-top"
          data-testid="admin-add-edit-plan-test"
        >
          <AdminAddEditPlan
            planDetails={planDetails}
            handleAddPlan={handleAddPlan}
            handleEditPlan={handleEditPlan}
            addEditFlag={addEditFlag}
            setAddEditFlag={setAddEditFlag}
            adminPlanType={adminPlanType}
            planCoupon={planCoupon}
          />
        </div>

        <div className="admin-body-left-container-bottom">
          <PlanRating
            planFeedbacks={planFeedbacks}
            setCurrentPlanRating={setCurrentPlanRating}
            avgRating={avgRating}
            currPlanRating={currPlanRating}
          />
        </div>
      </div>

      <div className="admin-body-right-container">
        <div
          className="admin-body-right-container-top"
          data-testid="recharge-card"
        >
          {loading ? (
            <Spinner />
          ) : (
            <RechargeCard
              dataArray={dataArray}
              setPlanDetailsFromRechargeCard={setPlanDetailsFromRechargeCard}
              setFeedbackIdforFeedbacks={setFeedbackIdforFeedbacks}
              role={role}
              adminPlanType={adminPlanType}
              handleDeletePlanImmediately={handleDeletePlanImmediately}
            />
          )}
          <div className="admin-body-right-container-bottom">
            <ReactPaginate
              breakLabel="..."
              nextLabel={pageNumber === pageCount - 1 ? null : 'Next >'}
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel={itemOffset > 1 ? '< Previous' : null}
              renderOnZeroPageCount={null}
              onClick={handlePageClick}
              className="pagination-component-admin"
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
    </div>
  );
};

export default AdminBody;
