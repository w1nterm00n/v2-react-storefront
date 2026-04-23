import React, { useState, useEffect } from 'react';
import Footer from '../../fragments/Footer';
import CreateUserTokenForm from '../../forms/CreateUserTokenForm';
import CreateUserForm from '../../forms/CreateUserForm';
import Navbar from '../../fragments/Navbar';
import VisualHeader from '../../fragments/VisualHeader';


const CreateUserPage = () => {
  const [token, setToken] = useState(null);

  return (
    <div className='content-wrapper d-flex flex-column min-vh-100'>
      <Navbar></Navbar>
      <VisualHeader text={"Добро пожаловать!"}></VisualHeader>

      {!token ? (
        <CreateUserTokenForm onTokenCreated={setToken} />
      ) : (
        <CreateUserForm token={token} />
      )}
      
      <Footer></Footer>
    </div>
  );
};

export default CreateUserPage;