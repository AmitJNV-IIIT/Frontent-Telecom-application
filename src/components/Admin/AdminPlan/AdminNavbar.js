import React, { useState, lazy, Suspense } from 'react';
import './css/AdminNavbar.css';
import { Link } from 'react-router-dom';

import Spinner from '../../Common/Spinner/Spinner';

const CreateCoupon = lazy(() => import('./CreateCoupon'));

function AdminNavbar({ settingPlanType }) {
  const [activeLink, setActiveLink] = useState('Prepaid'); // State to track active link
  const [open, setOpen] = useState(false);

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const handleClick = (e, linkName) => {
    settingPlanType(e.target.name);
    setActiveLink(linkName); // Set active link
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="desktop-admin">
        <nav
          style={{
            marginTop: '6rem',
            borderRadius: '20px',
            padding: '0px'
          }}
          className="navbar-admin"
        >
          <div className="pages">
            <div className="left-navbar">
              <Link
                // to="/admin/prepaid"
                name="Prepaid"
                onClick={(e) => handleClick(e, 'Prepaid')}
                className={activeLink === 'Prepaid' ? 'active' : 'inactive'}
              >
                Prepaid
              </Link>
              <Link
                // to="/admin/postpaid"
                name="Postpaid"
                onClick={(e) => handleClick(e, 'Postpaid')}
                className={activeLink === 'Postpaid' ? 'active' : 'inactive'}
              >
                Postpaid
              </Link>
              <Link
                // to="/admin/broadband/typebroadband"
                name="Broadband"
                onClick={(e) => handleClick(e, 'Broadband')}
                className={activeLink === 'Broadband' ? 'active' : 'inactive'}
              >
                Broadband
              </Link>
              {/* <div className="right-navbar"> */}
              <Link
                // to="/create-coupon"
                name="createcoupon"
                onClick={handleOpen}
                className="create-coupon"
              >
                Create Coupon
              </Link>
              {open && (
                <Suspense fallback={<Spinner />}>
                  <CreateCoupon open={open} handleClose={handleClose} />
                </Suspense>
              )}
              {/* </div> */}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default AdminNavbar;
