import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBSwitch
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams ,useNavigate} from "react-router-dom";
import moment from "moment";
import { getRelatedTours, getTour } from "../redux/features/tourSlice";

import RelatedTours from "../components/Relatedtours";
import DisqusThread from "../components/DisqusThread";



const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour, relatedTours } = useSelector((state) => ({ ...state.tour }));
  const { id } = useParams();
  const navigate = useNavigate();
  const tags = tour?.tags;

  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    tags && dispatch(getRelatedTours(tags));
  }, [tags]);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
  }, [id]);
  return (
    <>
      <MDBContainer>
       
        <MDBCard className="mb-3 mt-2" >
          <br/>
          <br/>
          <br/>
          <MDBCardImage
            margin-top = "100px"
            // position="top"
            style={{ width: "100%", maxHeight: "600px" }}
            src={tour.imageFile}
            alt={tour.title}
            
          />
          <MDBCardBody className={darkMode ? "dark-mode" : "light-mode"}>
            <MDBBtn tag ="a" color="green" style={{float: "left" , color: "#000" }} onClick={() => navigate("/")}>
              <MDBIcon
              fas
              
              size="2x"
             
              icon = "arrow-left"
              style={{float:"left", color:"green"}}
             
              />
            
            </MDBBtn>
         
            <MDBSwitch checked={darkMode}  onChange ={handleToggle}  style={{ float: 'right' }}/>
            

            
            
            <h3>{tour.title}</h3>
            <br/>
            <span>
              <p className="text-start tourName">Created By: {tour.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(tour.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {tour.description}
            </MDBCardText>
          </MDBCardBody>
          <RelatedTours relatedTours={relatedTours} tourId={id} />
          
           {/* <RelatedTours /> */}
        </MDBCard>
        <DisqusThread id={id} title={tour.title} path={`/tour/${id}`}/>
      </MDBContainer>
    </>
  );
}



export default SingleTour;
