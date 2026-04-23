import React, { useState, useEffect } from 'react';
import Loading from '../fragments/Loading';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'bootstrap';

const AuthUserForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

    useEffect(() => {
      if (loading) {
        const timer = setTimeout(() => {
          navigate('/'); // редирект на главную
        }, 3000); //3 секунды
        
        return () => clearTimeout(timer);
      }
    }, [loading, navigate]);

  const authUser = async (e) => {
    e.preventDefault();

    fetch('http://localhost:9000/auth/customer/emailpass', {
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
          setErrorMessage("Введен неправильный пароль или email.");
        } else {
          setErrorMessage(data.message || "Ошибка при регистрации.");
        }
        return;
      }
      localStorage.setItem('token', data.token); // сохраняем токен
      setLoading(true);
      const toastEl = document.getElementById('successToast');
      const toast = new Toast(toastEl);
      toast.show();
    })
      .catch(error => {
        console.error('Ошибка получения токена:', error);
      });
  }


  return (
    <div className="container py-5 flex-grow-1">
    {loading ? (
      <Loading />
    ) : (<form className='userForm' onSubmit={(e) => authUser(e)} style={{margin: "100px auto"}}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Введите электронную почту
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
              Введите пароль
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
          Войти
        </button>

      </form>
      )}
      <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
      <div id="successToast" className="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">
            Пользователь успешно авторизован!
          </div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Закрыть"></button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AuthUserForm;