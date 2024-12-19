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
  const [token, setToken] = useState(null); // Store the token

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInEmail');
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  const fetchToken = async () => {
    try {
      const response = await axios.post('http://mysalon.local/wp-json/jwt-auth/v1/token', {
        username: 'admin',
        password: 'admin'
      });
      setToken(response.data.token);
    } catch (error) {
      console.error('Error fetching token:', error.message);
      setError('Failed to fetch token. Please check your credentials.');
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) return; // Wait until token is fetched

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
        console.error('Error fetching products:', error.message);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token, currentPage]); // Fetch products when token or current page changes

  useEffect(() => {
    fetchToken(); // Fetch token on component mount
  }, []);

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
    return <div>{error}</div>;
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
