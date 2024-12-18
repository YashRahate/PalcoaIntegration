// Store.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from "axios";
import './Onlinestore.css'; // Import your CSS file for styling

const Onlinestore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [productsPerPage] = useState(10); // Number of products per page
  const [totalProducts, setTotalProducts] = useState(0); // Total products

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInEmail');
    // Add a success message or state here if needed
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbXlzYWxvbi5sb2NhbCIsImlhdCI6MTczMzIxMjUyMSwibmJmIjoxNzMzMjEyNTIxLCJleHAiOjE3MzM4MTczMjEsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.M2T9ehOvzDOLwPKlgDk4JM21ghA2IAhow2jU3_DXdts"; // Replace with the actual token received

      try {
        const response = await axios.get('http://mysalon.local/wp-json/wc/v3/products', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            page: currentPage,
            per_page: productsPerPage,
          }
        });

        setProducts(response.data);
        setTotalProducts(parseInt(response.headers['x-wp-total'])); // Set total products from response headers
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]); // Fetch products when the current page changes

  const totalPages = Math.ceil(totalProducts / productsPerPage); // Calculate total pages

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error fetching products: {error}</div>;
  }

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <div className="store-container">
        <h1>Store</h1>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product">
              <h2>{product.name}</h2>
              <img src={product.images[0].src} alt={product.name} />
              <p>Price: {product.price}</p>
              <a href={product.permalink} target="_blank" rel="noopener noreferrer">
                View Product
              </a>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Onlinestore;
