import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import {useNavigate} from "react-router-dom";
import {searchTours} from "../redux/features/tourSlice";
// import decode from "jwt-decode";

const Header = () => {
  const [show, setShow] = useState(false);
  const [search ,setSearch ] = useState(""); 
 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const token = user?.token;
  // if(token )
  // {
  //   const  decodedtoken = decode(token);
  //   if(decodedtoken.exp*1000 < new Date().getTime()){
  //     dispatch(setLogout());
  //   }
  // }


  const handleSubmit = (e) => {
    e.preventDefault();

    if(search)
    {
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`);
    }
    else
    {
      navigate("/");
    }
  }

  const handleLogout = () => {
    dispatch(setLogout());
  };
  const { user } = useSelector((state) => ({ ...state.auth }));
  return (
    <MDBNavbar fixed="top"  expand="lg" style={{ backgroundColor: "#d6459c" }}>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{ color: "#edf0ee", fontWeight: "600", fontSize: "22px" }}
        >
          KhojYatri
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#edf0ee" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.result?._id && (
              <h5 style={{ marginRight: "30px", marginTop: "27px" }}>
                Logged in as: {user?.result?.name}
              </h5>
            )}
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user?.result?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/addTour">
                    <p className="header-text">Add Tour</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user?.result?._id ? (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text" onClick={() => handleLogout()}>
                    Logout
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
           <input type = "text" className = "form-control" marginright="10px" placeholder = "Search Tour" value = {search} onChange={(e) => setSearch(e.target.value)} />
           <div style = {{marginTop : "5px", marginLeft:"10px"}}> 
            <MDBIcon fas icon = "search" />
           </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
