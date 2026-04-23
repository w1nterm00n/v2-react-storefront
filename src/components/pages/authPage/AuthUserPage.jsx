import React, { useState, useEffect } from 'react';
import Footer from '../../fragments/Footer';
import AuthUserForm from '../../forms/AuthUserForm';
import Navbar from '../../fragments/Navbar';
import VisualHeader from '../../fragments/VisualHeader';


const AuthUserPage = () => {

  return (
    <div className='content-wrapper d-flex flex-column min-vh-100'>
      <Navbar></Navbar>
      <VisualHeader text={"Рады видеть вас снова!"}></VisualHeader>
      <AuthUserForm></AuthUserForm>

      <Footer></Footer>
    </div>
  );
};

export default AuthUserPage;