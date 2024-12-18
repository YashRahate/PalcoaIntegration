import React, { useState } from 'react';
import "./Services.css"
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Services = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const carouselItems = [
        {
            src: '/images/profile3.avif',
            name: 'Sharvari More',
            feedback: 'I had an amazing experience at X-Salon! The staff was incredibly friendly, and my haircut turned out even better than I expected. I’ll definitely be returning for my next appointment!'
        },
        {
            src: '/images/profile1.png',
            name: 'Ajinkya Patil',
            feedback: 'X-Salon is my go-to place for all things beauty! The facials are so relaxing, and the products they use are top-notch. I have noticed a significant improvement in my skin since I started coming here!'
        },
        {
            src: '/images/profile3.avif',
            name: 'Arya Madhavi',
            feedback: `I booked a special occasion makeover for my sister’s wedding, and I couldn't be happier with the results! The team at X-Salon made us all look stunning. Highly recommend their services!`
        },
        {
            src: '/images/profile4.png',
            name: 'Yash Rahate',
            feedback: `I love the online store! It’s so convenient to order my favorite haircare products directly from X-Salon. The delivery was prompt, and the products were well-packaged. Great service!`
        }
    ];

    const showItem = (index) => {
        const carouselSlide = document.querySelector('.carousel-slide');
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        carouselSlide.style.transform = `translateX(${-index * 100}%)`;
    };

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        let newIndex = currentIndex + 1;
        if (newIndex >= carouselItems.length) {
            showItem(newIndex);
            setTimeout(() => {
                const carouselSlide = document.querySelector('.carousel-slide');
                carouselSlide.style.transition = 'none';
                setCurrentIndex(0);
                carouselSlide.style.transform = `translateX(0)`;
                setIsTransitioning(false);
            }, 500);
        } else {
            setCurrentIndex(newIndex);
            showItem(newIndex);
            setTimeout(() => setIsTransitioning(false), 500);
        }
    };

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            const carouselSlide = document.querySelector('.carousel-slide');
            carouselSlide.style.transition = 'none';
            setCurrentIndex(carouselItems.length - 1);
            carouselSlide.style.transform = `translateX(${-carouselItems.length * 100}%)`;
            setTimeout(() => {
                carouselSlide.style.transition = 'transform 0.5s ease-in-out';
                showItem(carouselItems.length - 1);
                setIsTransitioning(false);
            }, 0);
        } else {
            setCurrentIndex(newIndex);
            showItem(newIndex);
            setTimeout(() => setIsTransitioning(false), 500);
        }
    };
    const navigate = useNavigate();

    const handleLogout = (e) => {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('loggedInEmail');
      handleSuccess('User Logged out');
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    }
    return (<>
          <Navbar handleLogout={handleLogout} />
        <div>

            

            <div className="svgimg">
                <img src="/images/rangoli.svg" alt="Rangoli" />
                <NavLink to="/appointment" activeclassname="active"><button >BOOK</button></NavLink>
            </div>

            <div className="ourservices">
                <div className="border"></div>
                OUR SERVICES
                <div className="border"></div>
            </div>

            <div className="box">
                <div className="imgbor"></div>
                <img className="img1" src="/images/bridal.png" alt="" />
                <img className="img2" src="/images/mhendi.png" width="400px" alt="" />
                <img className="img3" src="/images/haircolor.png" width="400px" alt="" />
                <img className="img4" src="/images/haircut.png" width="400px" alt="" />
                <img className="img5" src="/images/manicure.png" width="400px" alt="" />
                <div className="t t1">
                <div><b>Bridal Makeup</b></div>
             
                </div>
                <div className="t t2">
                <div><b>Bridal Mehndi</b></div>
             
                </div>
                <div className="t t3">
                <div><b>Hair Color</b></div>
             
                </div>
                <div className="t t4">
                <div><b>Hair Cut</b></div>
             
                </div>
                <div className="t t5">
                <div><b>Manicure</b></div>
             
                </div>
            </div>

            <div className="feedbacks">
                <div className="border"></div>
                FEEDBACKS
                <div className="border"></div>
            </div>

            <div className="carousel">
                <div className="carousel-slide">
                    {carouselItems.map((item, index) => (
                        <div className="carousel-item" key={index}>
                            <img src={item.src} alt={`Image ${index + 1}`} />
                            <div className="carousel-text">
                                <h2>{item.name}</h2>
                                <p>{item.feedback}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="prev" onClick={handlePrev}>❮</button>
                <button className="next" onClick={handleNext}>❯</button>
            </div>

            <Footer></Footer>
        </div>
    </>
    );
};

export default Services;
