import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footerimg">
      <img src="/images/cup.png" alt="Cup" />
      <footer>
        <div className="social">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/facebook.svg" alt="Facebook" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/insta.svg" alt="Instagram" />
          </a>
          <a
            href="https://x.com/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/twitter.svg" alt="Twitter" />
          </a>
          <a
            href="https://in.pinterest.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/pinterest.svg" alt="Pinterest" />
          </a>
        </div>

        <div className="contact">CONTACT US</div>
        <br />

        <div className="coninfo">
          <div className="phone">
            <div>Phone Number</div>
            <div>9988776655</div>
          </div>
          <div className="email">
            <div>Email</div>
            <div>X-Salon@gmail.com</div>
          </div>
        </div>

        <div className="info">
          At X-Salon, we provide top-notch beauty and haircare services tailored
          to your needs. Our team of skilled professionals is dedicated to
          ensuring you receive a personalized experience, enhancing your style,
          confidence, and overall well-being.
          <br />
          
          <br />
          In addition to our salon services, we offer an extensive range of
          premium beauty and haircare products in our online store.
        </div>

        <div className="copyright">
          <p>
            &copy; <span id="current-year">{new Date().getFullYear()}</span>{" "}
            X-Salon. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
