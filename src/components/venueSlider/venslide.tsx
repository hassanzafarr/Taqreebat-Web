import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import styles from "./Ven.module.css";
import Rating from "@mui/material/Rating";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { Card } from "@mui/material";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", zIndex: 1, right: "10px" }}
      onClick={onClick}
    >
      {/* <ChevronRightIcon sx={{ color: "#672C70", fontSize: "34px" }} /> */}
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", zIndex: 1, left: "10px" }}
      onClick={onClick}
    >
      {/* <ChevronLeft
        sx={{ color: "#672C70", fontSize: "34px", marginLeft: "-10px" }}
      /> */}
    </div>
  );
}

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const VenSlide = ({ images }) => {

  return (
    <div
      className="ven__cta"
      style={{
        backgroundColor: "white",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className={styles.main__container}>
        {/* <div className={styles.ven__cta_content}>
          <h3>{htag}</h3>
        </div>
        <div className={styles.ven__cta_content}>
          <h4>
            Our vens send us bunch of smilies with our services and we love
            them
          </h4>
        </div> */}

        <Slider {...settings}>
          {images?.map((item:any, index:any) => (
            <div key={index} >
              <div className={styles.ven_img_cont} >
                <img
                  src={item}
                  alt="prof"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "400px",borderRadius:'8px'}}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default VenSlide;
