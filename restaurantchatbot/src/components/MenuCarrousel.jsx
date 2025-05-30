import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
export default function MenuCarrousel() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <Image
            src="restaurantchatbot/src/assets/jollofimgA.jpg"
            width={250}
            height={250}
            alt="Jollof Chicken"
            text="Jollof Chicken"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src="restaurantchatbot/src/assets/jollof1.webp"
            text="Jollof Chicken"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
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
        </Carousel.Item>
      </Carousel>
    </>
  );
}
