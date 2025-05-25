import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card.jsx";
import Footer from "../components/Footer";
import "./LandingPage.css";
import MangoFarm from "../assets/MangoFarm.jpg";

export default function LandingPage() {
  const [FoodCat, setFoodCat] = useState([]);
  const [FoodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loaditemData = async () => {
    setLoading(true);
    try {
      let response = await fetch(
        `https://rama-mangoes.onrender.com/admin/product/display`
      );
      response = await response.json();
      setFoodItem(response);
    } catch (error) {
      console.error("Error loading food items:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCatData = async () => {
    try {
      let response = await fetch(
        `https://rama-mangoes.onrender.com/api/food-category`
      );
      response = await response.json();
      setFoodCat(response);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  useEffect(() => {
    loaditemData();
    loadCatData();
  }, []);

  return (
    <div className="food-app">
      <Navbar />

      <div
        style={{
          position: "absolute",
          width: "100%",
          top: 0,
          zIndex: 10,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url(${MangoFarm})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              marginBottom: "16px",
            }}
          >
            Mangoes Made Magical
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              maxWidth: "700px",
              margin: "0 auto 32px auto",
              opacity: 0.9,
            }}
          >
            Indulge in the pure taste of orchard-fresh mangoes, carefully
            handpicked at peak ripeness and delivered with love straight to your
            doorstep.
          </p>

          <div style={{ marginBottom: "24px" }}>
            <input
              type="search"
              placeholder="Search Variates...."
              style={{
                padding: "12px 20px",
                borderRadius: "8px",
                border: "none",
                width: "100%",
                maxWidth: "400px",
                fontSize: "1rem",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container py-5" style={{marginTop: "70vh"}}>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : FoodCat.length > 0 ? (
          FoodCat.filter((category) =>
            FoodItem.some(
              (item) =>
                item.CategoryName === category.CategoryName &&
                item.name.toLowerCase().includes(search.toLowerCase())
            )
          ).map((category) => {
            const filteredItems = FoodItem.filter(
              (item) =>
                item.CategoryName === category.CategoryName &&
                item.name.toLowerCase().includes(search.toLowerCase())
            );

            return (
              <div
                key={category._id}
                id={category.CategoryName.toLowerCase().replace(
                  /[^a-z0-9]/gi,
                  ""
                )}
                className="mb-5"
              >
                <h1 className="section-heading">{category.CategoryName}</h1>

                <div className="row g-4">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <div key={item._id} className="col-md-6 col-lg-3">
                        <Card item={item} />
                      </div>
                    ))
                  ) : (
                    <div className="text-center w-100">No Such Data Found</div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center">No items to display</div>
        )}
      </div>

      <Footer />
    </div>
  );
}
