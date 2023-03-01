import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import BasicInfoForm from './components/addproperty/basic/basicform';
import GeneralFormInfo from './components/addproperty/general/generalform';
import LocationFormInfo from './components/addproperty/location/location';
import PropertyFormInfo from './components/addproperty/property/propertyform';
//
import Sidebar from "./components/sidebar/sidebar";
import Header from "./components/header/header";
import PropertyList from "./components/property_listing/property_list"
import Protected from './components/protectedRoutes/protectedroutes';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
// import SignIn from './components/SignIn/SignIn';
// import SignUp from './components/SignUp/SignUp';
function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/propertylist' element={<PropertyList />} />
          <Route path='/basicinfo' element={<Protected><BasicInfoForm /></Protected>} />
          <Route path='/propertyinfo' element={<Protected><PropertyFormInfo /></Protected>} />
          <Route path='/generalinfo' element={<Protected><GeneralFormInfo /></Protected>} />
          <Route path='/locationinfo' element={<Protected> <LocationFormInfo /></Protected>} />
        </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
