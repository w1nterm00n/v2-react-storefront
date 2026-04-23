import React, { useState, useEffect } from 'react';
import Loading from '../fragments/Loading';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'bootstrap';
import { API_URL } from '../../constants';

const AuthUserForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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

  const authUser = async (e) => {
    e.preventDefault();

    fetch(`${API_URL}/auth/customer/emailpass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    .then(async response => {
      const data = await response.json();
      if (!response.ok) {
        if (data.message && data.message.includes("Invalid email or password")) {
          setErrorMessage("Incorrect email or password.");
        } else {
          setErrorMessage(data.message || "Registration failed.");
        }
        return;
      }
      localStorage.setItem('token', data.token); // Save token.
      setLoading(true);
      const toastEl = document.getElementById('successToast');
      const toast = new Toast(toastEl);
      toast.show();
    })
      .catch(error => {
        console.error('Failed to get token:', error);
      });
  }


  return (
    <div className="container py-5 flex-grow-1">
    {loading ? (
      <Loading />
    ) : (<form className='userForm' onSubmit={(e) => authUser(e)} style={{margin: "100px auto"}}>
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
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Enter your password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Sign in
        </button>

      </form>
      )}
      <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
      <div id="successToast" className="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">
            User signed in successfully.
          </div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AuthUserForm;
