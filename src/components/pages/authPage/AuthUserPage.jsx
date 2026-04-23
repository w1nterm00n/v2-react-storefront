import Footer from '../../fragments/Footer';
import AuthUserForm from '../../forms/AuthUserForm';
import Navbar from '../../fragments/Navbar';
import VisualHeader from '../../fragments/VisualHeader';


const AuthUserPage = () => {

  return (
    <div className='content-wrapper d-flex flex-column min-vh-100'>
      <Navbar></Navbar>
      <VisualHeader text={"Welcome Back!"}></VisualHeader>
      <AuthUserForm></AuthUserForm>

      <Footer></Footer>
    </div>
  );
};

export default AuthUserPage;
