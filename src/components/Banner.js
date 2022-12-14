import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <section className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
        ariaLabel="Banner Carousel"
        dynamicHeight={false}
      >
        <div className="">
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/G/01/Associates/GA_Newsletter/49_AMZ_Associates_Audible_ArticleHero_2140x860.jpg"
            alt="Amazon Audible Banner"
            className="w-screen object-cover object-left sm:object-center h-80"
          />
        </div>
        <div className="">
          <img
            loading="lazy"
            src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/launch/gateway/TheUndergroundRailroad/UGRR_S1_GWBleedingHero_ENG_COVIDUPDATE_XSite_1500X600_PV_en-GB._CB669781769_.jpg"
            alt="Amazon Prime Video Banner"
            className="w-screen object-cover object-left sm:object-top h-80"
          />
        </div>
        <div className="">
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/G/01/digital/music/merch/India/2021/Weekly/03_ALC_Banner_1145x259_Opt_2.jpg"
            alt="Amazon Music Banner"
            className="w-screen object-cover object-center h-80"
          />
        </div>
      </Carousel>
    </section>
  );
};

export default Banner;
