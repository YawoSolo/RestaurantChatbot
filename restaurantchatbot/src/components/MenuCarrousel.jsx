import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import jollofImgA from "../assets/jollofimgA.jpg";
import Fufu from "../assets/Fufu.jpg";

export default function MenuCarrousel() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <Image
            src={jollofImgA}
            width={1000}
            height={1000}
            alt="Jollof Chicken"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src={Fufu}
            width={1000}
            height={1000}
            alt="Fufu and Egusi Soup"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* <Carousel.Item>
          <Image
            src="restaurantchatbot/src/assets/jollof1.webp"
            text="Jollof Chicken"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item> */}
      </Carousel>
    </>
  );
}
