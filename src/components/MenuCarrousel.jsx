import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import friedrice from "../assets/friedrice.webp";
import jollofchicken from "../assets/jollofchicken.jpg";
import jollofplantain from "../assets/jollofplantain.webp";

export default function MenuCarrousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <Image src={friedrice} width={"80%"} height={"100%"} alt="Fried rice" />
        <Carousel.Caption>
          <h3>Fried Rice</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          src={jollofchicken}
          width={"100%"}
          height={"100%"}
          alt="Jollof chicken"
        />
        <Carousel.Caption>
          <h3>Jollof Chicken</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          src={jollofplantain}
          width={"100%"}
          height={"100%"}
          alt="Jollof plantain"
        />
        <Carousel.Caption>
          <h3>Jollof Plantain</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
