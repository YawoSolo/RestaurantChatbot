import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import friedrice from "../assets/friedrice.webp";
import jollofchicken from "../assets/jollofchicken.jpg";
import jollofplantain from "../assets/jollofplantain.webp";
const imageStyle = { height: "300px", width: "100%", objectFit: "cover" };
export default function MenuCarrousel() {
  return (
    <Carousel className="mb-3">
      <Carousel.Item>
        <Image src={friedrice} style={imageStyle} alt="Fried rice" />
        <Carousel.Caption>
          <h3>Fried Rice</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={jollofchicken} style={imageStyle} alt="Jollof chicken" />
        <Carousel.Caption>
          <h3>Jollof Chicken</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={jollofplantain} style={imageStyle} alt="Jollof plantain" />
        <Carousel.Caption>
          <h3>Jollof Plantain</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
