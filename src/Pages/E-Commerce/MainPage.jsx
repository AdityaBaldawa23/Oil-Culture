import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import "./MainPage.css";
import HomeImg from '../../assets/oilculture.png';
import Navbar from "../../components/E-Commerce/Navbar";
import oil from '../../assets/oil.jpg';
import check from '../../assets/coldpresspurity.png'
import natural from '../../assets/natural.png'
import lab from '../../assets/lab.png'
import local from '../../assets/local.jpg'
// import groundnutImg from '../assets/Images/groundnut.png';
import bannerImg from '../../assets/Banner1.jpg';
import bannerImg2 from '../../assets/Banner2.jpg';
import Footer from "../../components/E-Commerce/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const MainPage = () => {
    const [openFAQ, setOpenFAQ] = useState(null);
    const [topProduct, settopProduct] = useState([])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const faqData = [
        {
            question: "What is cold-pressed oil?",
            answer:
                "Cold-pressed oil is extracted from seeds using a natural process without heat or chemicals, preserving nutrients and flavor.",
        },
        {
            question: "Are your oils really chemical-free?",
            answer:
                "Yes, our oils are 100% chemical-free and are lab-tested to ensure they meet the highest purity standards.",
        },
        {
            question: "Where do you source your seeds from?",
            answer:
                "We work directly with trusted local farmers across India to ensure ethical sourcing and freshness.",
        },
        {
            question: "How should I store the oil?",
            answer:
                "Store the oil in a cool, dark place away from direct sunlight to maintain freshness and extend shelf life.",
        },
        {
            question: "What is the shelf life of your oils?",
            answer:
                "Our cold-pressed oils generally have a shelf life of 6 to 12 months when stored properly in a cool, dark place.",
        },
        {
            question: "Can I use these oils for cooking at high temperatures?",
            answer:
                "Cold-pressed oils are best used for low to medium heat cooking or as finishing oils to retain their nutritional benefits.",
        },
        {
            question: "Do your oils retain their natural aroma and flavor?",
            answer: "Absolutely! Since our oils are extracted without heat or chemicals, they retain their original aroma, color, and nutritional richness, offering an authentic and flavorful experience."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };


    useEffect(() => {
        axios.get('http://localhost:5000/admin/product/display')
            .then(response => settopProduct(response.data))
            .catch(error => console.log(`Error fetching products`, error))
    }, []);
    console.log(topProduct.productImages);

    const IMAGE_BASE_URL = "http://localhost:5000/uploads/";

    return (
        <>
            <Navbar />
            <div className="landing">
                <section
                    className="hero"
                    style={{ backgroundImage: `url(${HomeImg})` }}
                >
                    <div className="hero-text">
                        <h1 className="hero-heading">
                            Nourish Your Body with <span className="highlight">Pure, Cold-Pressed Oils</span>
                        </h1>
                        <p className="hero-subtext">
                            Handcrafted from nature's finest seeds and nuts, our oils are unrefined, chemical-free, and packed with wholesome goodness. From trusted local farms straight to your kitchen — embrace purity, tradition, and wellness in every drop.
                        </p>
                        <Link to='/shop'>
                            <button className="explore-btn">🌿 Explore Our Products</button>
                        </Link>
                    </div>

                </section>

                <section className="about-us">
                    <h2>ABOUT US</h2>
                    <div className="about-content">
                        <p>
                            Welcome to <strong>Oil Culture</strong> — where tradition meets wellness. We’re more than just an oil brand; we’re a movement toward mindful consumption and sustainable living. Born out of a deep respect for nature and age-old Indian wisdom, Oil Culture is committed to reviving the lost art of cold-pressing to bring you oils that are rich in flavor, nutrients, and authenticity.
                            <br /><br />
                            Our journey begins with the careful selection of high-quality, non-GMO seeds grown by dedicated farmers across India. We partner directly with local communities to ensure fair trade and traceability. These seeds are then cold-pressed using wooden churners (known as *Ghani* in traditional methods) to extract oil without generating heat or using chemicals, thus preserving their natural goodness.
                            <br /><br />
                            Every batch of oil we produce undergoes rigorous lab testing to ensure it is 100% pure, chemical-free, and safe for everyday use. From the heartiness of groundnut oil to the gentle essence of coconut, sesame, mustard, and sunflower oils, our products are crafted to enhance not just your food, but your lifestyle.
                            <br /><br />
                            At Oil Culture, our mission is clear — to offer you oils that support your health, respect the environment, and empower local farmers. By choosing us, you are choosing transparency, sustainability, and wellness in every drop.
                        </p>
                    </div>
                </section>

                <section className="our-process">
                    <Link to="/shop">
                        <img src={bannerImg} alt="Our process banner" className="process-img" />
                    </Link>
                </section>

                <section className="why-choose-us">
                    <h2>WHY CHOOSE US</h2>
                    <div className="features">
                        <div className="feature-card">
                            <img src={check} alt="Check icon" />
                            <p><strong>Cold-Pressed</strong><br />Purity</p>
                        </div>
                        <div className="feature-card">
                            <img src={natural} alt="Natural ingredients icon" />
                            <p><strong>100% Natural</strong><br />Ingredients</p>
                        </div>
                        <div className="feature-card">
                            <img src={lab} alt="Lab test icon" />
                            <p><strong>Lab Tested</strong><br />Quality</p>
                        </div>
                        <div className="feature-card">
                            <img src={local} alt="India flag icon" />
                            <p><strong>Locally Sourced</strong><br />in India</p>
                        </div>
                    </div>
                </section>

                <section className="top-products">
                    <h2 className="top-products-title">TOP PRODUCTS</h2>
                    <div className="product-list-scroll">
                        {topProduct.map((product) => {
                            const imageUrl = product.productImages && product.productImages.length > 0
                                ? `http://localhost:5000/uploads/${product.productImages[0]}`
                                : "fallback.jpg";

                            return (
                                <div className="product-card" key={product._id}>
                                    <img src={imageUrl} alt={product.productName} className="product-img" />
                                    <div className="product-details">
                                        <h3>{product.productName}</h3>
                                        <p>{product.productSize} L</p>
                                        <Link to="/shop">
                                            <button className="buy-btn">Buy Now</button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>


                <section className="our-process">
                    <Link to='/shop'>
                        <img src={bannerImg2} alt="Our process banner" className="process-img2" />
                    </Link>
                </section>

                <section className="gallery-map-section">
                    <div className="gallery-half">
                        <h2>Our Gallery</h2>
                        <Slider {...settings}>
                            <div>
                                <img src={oil} alt="Gallery 1" />
                            </div>
                            <div>
                                <img src={bannerImg} alt="Gallery 2" />
                            </div>
                            <div>
                                <img src={bannerImg2} alt="Gallery 3" />
                            </div>
                            <div>
                                <img src={HomeImg} alt="Gallery 4" />
                            </div>
                        </Slider>
                    </div>

                    <div className="map-half">
                        <h2>Find Us Here</h2>
                        <iframe
                            title="Oil Culture Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.317595193514!2d73.86251437535485!3d18.469267882614332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eba54fb7af6f%3A0xa7cef8293f16f15a!2sOIL%20CULTURE!5e0!3m2!1sen!2sin!4v1748612303862!5m2!1sen!2sin"
                            width="100%"
                            height="350"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </section>

                <section className="faq-contact-wrapper">
                    <div className="faq-section">
                        <h2 className="faq-title" style={{ color: 'red' }}>FREQUENTLY ASKED QUESTIONS</h2>
                        <div className="faq-list">
                            {faqData.map((faq, index) => (
                                <div
                                    className={`faq-item ${openFAQ === index ? "open" : ""}`}
                                    key={index}
                                >
                                    <div className="faq-question" onClick={() => toggleFAQ(index)}>
                                        <h4>{faq.question}</h4>
                                        <span>{openFAQ === index ? "−" : "+"}</span>
                                    </div>
                                    {openFAQ === index && (
                                        <p className="faq-answer">{faq.answer}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="contact-section">
                        <center><h2 className="contact-title" style={{ color: 'red' }}>Contact Us</h2></center>
                        <h2 className="contact-title">We'd Love to See You in Person!</h2>
                        <p className="contact-subtitle">
                            At Oil Culture, we value real connections. Visit us during regular business hours to explore our range and meet our team in person.
                        </p>

                        <div className="contact-buttons">
                            <a
                                href="https://api.whatsapp.com/send/?phone=9096811177&text&type=phone_number&app_absent=0"
                                className="btn whatsapp-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Contact us on WhatsApp
                            </a>

                            <a
                                href="https://www.instagram.com/oilculture.in/"
                                className="btn instagram-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Follow Us on Instagram
                            </a>

                            <a
                                href="https://www.google.com/search?q=OIL+CULTURE+Reviews"
                                className="btn review-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Drop a Review for Us
                            </a>
                        </div>

                        <div className="contact-info">
                            <h3>Oil Culture, Pune</h3>
                            <p>Near SHIVAM DAIRY, Mahesh Society, Bibwewadi, Pune, Maharashtra 411037</p>
                            <p className="phone-number">📞 +91 90986 11177</p>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
};

export default MainPage;