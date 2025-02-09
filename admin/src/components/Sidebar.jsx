import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial state based on screen width
    setIsMobile(window.innerWidth < 768);

    // Update state on window resize
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to handle link clicks (closes sidebar on mobile)
  const handleLinkClick = () => {
    if (isMobile) setIsOpen(false);
  };

  return (
    <>
      {/* Toggle Button (Only for Mobile) */}
      {isMobile && (
        <button 
          className="p-3 fixed top-4 left-4 z-50 bg-gray-800 text-white rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <motion.div 
        // Only animate on mobile; on desktop, sidebar remains fixed
        animate={isMobile ? { x: isOpen ? 0 : "-100%" } : { x: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="fixed md:sticky top-0 left-0 h-screen w-60 bg-gray-800 text-white p-5 z-40 md:block overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li className="mb-4">
            <Link to="/" className="hover:text-gray-400" onClick={handleLinkClick}>
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/testimonials" className="hover:text-gray-400" onClick={handleLinkClick}>
              Our Partners
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/cards" className="hover:text-gray-400" onClick={handleLinkClick}>
              Cards
            </Link>
          </li>
          <li>
            <Link to="/users" className="hover:text-gray-400" onClick={handleLinkClick}>
              Users
            </Link>
          </li>
        </ul>
      </motion.div>
    </>
  );
};

export default Sidebar;
