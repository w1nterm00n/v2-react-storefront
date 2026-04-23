import React, { useState, useEffect } from 'react';
import Loading from '../fragments/Loading';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'bootstrap';
import { API_KEY, API_URL } from '../../constants';

const CreateUserForm = ({ token }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        navigate('/'); // Redirect to the home page.
      }, 3000); // 3 seconds.
      
      return () => clearTimeout(timer);
    }
  }, [loading, navigate]);
  
  const createUser = async (e, token) => {
  
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/store/customers`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-publishable-api-key": API_KEY
        },
        body: JSON.stringify({
          first_name: name,
          last_name: surname,
          email: email,
          phone: phone
        })
      });
  
      if (!response.ok) {
        throw new Error(`Request failed: ${response.statusText}`);
      }
  
      await response.json();
      setLoading(true);
      const toastEl = document.getElementById('successToast');
      const toast = new Toast(toastEl);
      toast.show();

    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };
  

  return (
    <div className="container py-5 flex-grow-1">
    {loading ? (
      <Loading />
    ) : (<form className='userForm' onSubmit={(e) => createUser(e, token)} style={{margin: "100px auto"}}>
          <div className="mb-3">
            <label htmlFor="exampleInputname" className="form-label">
              Enter your first name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputname"
              aria-describedby="nameHelp"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="exampleInputSurname" className="form-label">
              Enter your last name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputSurname"
              aria-describedby="surnameHelp"
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Enter your phone number
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputPhone"
              aria-describedby="phoneHelp"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Enter your email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div id="emailHelp" class="form-text">The email must match the one you entered earlier.</div>
          </div>

          <button type="submit" className="btn btn-primary">
            Continue
          </button>

      </form>
      )}

    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
      <div id="successToast" className="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">
            User registered successfully.
          </div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>

    </div>
  );
};

export default CreateUserForm;
