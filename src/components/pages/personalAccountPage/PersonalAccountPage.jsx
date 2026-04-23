import React, { useState, useEffect } from 'react';
import Footer from '../../fragments/Footer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../fragments/Navbar';
import VisualHeader from '../../fragments/VisualHeader';
import { API_KEY, API_URL } from '../../../constants';
import styles from './personalAccount.module.scss';

const PersonalAccountPage = () => {
  const token = localStorage.getItem('token') || null;
  const [personalInfo, setPersonalInfo] = useState({});
  const navigate = useNavigate();

  const logOut = function () {
    console.log("log out");
    const token = localStorage.getItem("token");
    console.log(token);
    localStorage.removeItem("token");
    navigate('/');
  }

  useEffect(() => {
    fetch(`${API_URL}/store/customers/me`, {
      headers:{ 
      "x-publishable-api-key": API_KEY,
      "Authorization": "Bearer " + token 
    },
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.customer);
      setPersonalInfo(data.customer);
    });
  }, []);

  return (
    <div className='content-wrapper d-flex flex-column min-vh-100'>

    <Navbar></Navbar>

    <VisualHeader text={"Account"}></VisualHeader>
    <div className={`container py-5 ${styles.container}`} style={{margin: "100px auto"}}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg rounded-4">
            <div className={`card-body ${styles.form_wrapper}`}>
              <h3 className="card-title mb-4 text-center">Customer Details</h3>
              <ul className="list-group list-group-flush">
              {personalInfo && personalInfo.first_name ? (
                <>
                <li className="list-group-item">
                  <strong>Email: </strong> {personalInfo.email}
                </li>
                <li className="list-group-item">
                  <strong>First name: </strong> {personalInfo.first_name}
                </li>
                <li className="list-group-item">
                  <strong>Last name: </strong> {personalInfo.last_name}
                </li>
                <li className="list-group-item">
                  <strong>Registration date: </strong> 
                  {personalInfo.created_at ? personalInfo.created_at.split("T")[0] : '–'}
                </li>
                <li className="list-group-item">
                  <strong>Phone: </strong> {personalInfo.phone}
                </li>
                </>
              ) : (
                <p style={{textAlign: "center"}}>Your session has expired. Please sign in again.</p>
              )}
              </ul>
              <button className={`btn btn-primary ${styles.quit_btn}`} style={{width: '50%', margin: '0 auto'}} onClick={logOut}>Sign out</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    
      <Footer></Footer>
    </div>
  );
};

export default PersonalAccountPage;
