import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import styles from "./Client.module.css";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import Rating from "@mui/material/Rating";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { Card } from "@mui/material";
interface SampleNextArrowProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onClick?: () => void;
}

interface ClientSayProps {
  htag: string;
}

function SampleNextArrow({ className, style, onClick }: SampleNextArrowProps) {
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <ChevronRightIcon sx={{ color: "#672C70", fontSize: "44px" }} />
    </div>
  );
}

function SamplePrevArrow({ className, style, onClick }: SampleNextArrowProps) {
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <ChevronLeft
        sx={{ color: "#672C70", fontSize: "44px", marginLeft: "-20px" }}
      />
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

const ClientSay = ({ htag }: ClientSayProps) => {
  const [value, setValue] = React.useState<number | null>(5);

  const arr = [
    {
      location: "Karachi, Pakistan",
      img: "/images/Ellipse.png",
      name: "Bisham Khan",
      reviews:
        "Thank you for the outstanding work of the Conferences & Events group. We had a wonderful time and could not imagine pulling off our meeting without the guidance of your staff. Simply put, they exceeded all our expectations and could not have been more patient or harder working on the (many) requests we made of them over the past few months. They are an amazing team!",
    },
    {
      location: "Karachi, Pakistan",
      img: "/images/Ellipse.png",
      name: "Zaid Amin",
      reviews:
        "Thank you for the outstanding work of the Conferences & Events group. We had a wonderful time and could not imagine pulling off our meeting without the guidance of your staff. Simply put, they exceeded all our expectations and could not have been more patient or harder working on the (many) requests we made of them over the past few months. They are an amazing team!",
    },
    {
      location: "Karachi, Pakistan",
      img: "/images/Ellipse.png",
      name: "Raheel Jamshaid",
      reviews:
        "Thank you for the outstanding work of the Conferences & Events group. We had a wonderful time and could not imagine pulling off our meeting without the guidance of your staff. Simply put, they exceeded all our expectations and could not have been more patient or harder working on the (many) requests we made of them over the past few months. They are an amazing team!",
    },
  ];
  return (
    <div
      className="client__cta"
      style={{
        backgroundColor: "#672C70",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className={styles.main__container}>
        <div className={styles.client__cta_content}>
          <h3>{htag}</h3>
        </div>
        <div className={styles.client__cta_content}>
          <h4>
            Our Clients send us bunch of smilies with our services and we love
            them
          </h4>
        </div>

        <Slider {...settings}>
          {arr.map((item, index) => (
            <div key={index}>
              <div className={styles.client_container_a}>
                <div className={styles.client_img_cont}>
                  <Image src={item.img} alt="prof" width={70} height={70} />
                </div>
                <h1>{item.name}</h1>
                <h1 style={{ fontSize: "18px" }}>{item.location}</h1>
                <div className={styles.rating_cont}>
                  <Rating
                    name="read-only"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    readOnly
                  />
                </div>
                <p>{item.reviews}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ClientSay;
