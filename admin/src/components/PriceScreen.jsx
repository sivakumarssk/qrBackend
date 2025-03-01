import React, { useState, useEffect } from "react";
import axios from "axios";

const PriceScreen = () => {
  // Initial form state matching the Price schema
  const [formData, setFormData] = useState({
    totalpriceQR: 0,
    dicountpriceQR: 0,
    totalpricePersonal: 0,
    dicountpricePersonal: 0,
    totalpriceBusiness: 0,
    dicountpriceBusiness: 0,
    totalpriceResume: 0,
    dicountpriceResume: 0,
    totalpriceBio: 0,
    dicountpriceBio: 0,
    totalpriceInvitation: 0,
    dicountpriceInvitation: 0,
    totalpriceProperty: 0,
    dicountpriceProperty: 0,
  });
  const [loading, setLoading] = useState(false);

  // Fetch current Price data on component mount
  useEffect(() => {
    fetchPrice();
  }, []);

  const fetchPrice = async () => {
    try {
      const response = await axios.get("https://admin.qrandcards.com/api/getPrice");
      if (response.data) {
        // Destructure only the Price fields from the response data
        const {
          totalpriceQR,
          dicountpriceQR,
          totalpricePersonal,
          dicountpricePersonal,
          totalpriceBusiness,
          dicountpriceBusiness,
          totalpriceResume,
          dicountpriceResume,
          totalpriceBio,
          dicountpriceBio,
          totalpriceInvitation,
          dicountpriceInvitation,
          totalpriceProperty,
          dicountpriceProperty,
        } = response.data;
        setFormData({
          totalpriceQR,
          dicountpriceQR,
          totalpricePersonal,
          dicountpricePersonal,
          totalpriceBusiness,
          dicountpriceBusiness,
          totalpriceResume,
          dicountpriceResume,
          totalpriceBio,
          dicountpriceBio,
          totalpriceInvitation,
          dicountpriceInvitation,
          totalpriceProperty,
          dicountpriceProperty,
        });
      }
    } catch (error) {
      console.error("Error fetching price data:", error);
    }
  };

  // Updated handleChange to allow clearing input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      // If the input is cleared, store an empty string. Otherwise, convert to Number.
      [name]: value === "" ? "" : Number(value),
    }));
  };

  // Handle form submission to update the price
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare data for submission:
    // Convert empty string values to 0 before sending to the backend.
    const dataToSubmit = Object.keys(formData).reduce((acc, key) => {
      acc[key] = formData[key] === "" ? 0 : formData[key];
      return acc;
    }, {});

    try {
      await axios.post("https://admin.qrandcards.com/api/addPrice", dataToSubmit, {
        headers: { "Content-Type": "application/json" },
      });
      // Optionally, re-fetch the Price data after update
      fetchPrice();
      alert("Price updated successfully!");
    } catch (error) {
      console.error("Error updating price:", error);
      alert("Failed to update price.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 w-[100%]">
      <h2 className="text-2xl font-bold mb-4 pt-[60px] md:pt-8">
        Price Admin Panel
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Total Price QR */}
        <div>
          <label className="block mb-1">Total Price QR:</label>
          <input
            type="number"
            name="totalpriceQR"
            value={formData.totalpriceQR}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        {/* Discount Price QR */}
        <div>
          <label className="block mb-1">Discount Price QR:</label>
          <input
            type="number"
            name="dicountpriceQR"
            value={formData.dicountpriceQR}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        {/* Total Price Personal */}
        <div>
          <label className="block mb-1">Total Price Personal:</label>
          <input
            type="number"
            name="totalpricePersonal"
            value={formData.totalpricePersonal}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        {/* Discount Price Personal */}
        <div>
          <label className="block mb-1">Discount Price Personal:</label>
          <input
            type="number"
            name="dicountpricePersonal"
            value={formData.dicountpricePersonal}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        {/* Total Price Business */}
        <div>
          <label className="block mb-1">Total Price Business:</label>
          <input
            type="number"
            name="totalpriceBusiness"
            value={formData.totalpriceBusiness}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        {/* Discount Price Business */}
        <div>
          <label className="block mb-1">Discount Price Business:</label>
          <input
            type="number"
            name="dicountpriceBusiness"
            value={formData.dicountpriceBusiness}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        {/* Total Price Resume */}
        <div>
          <label className="block mb-1">Total Price Resume:</label>
          <input
            type="number"
            name="totalpriceResume"
            value={formData.totalpriceResume}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        {/* Discount Price Resume */}
        <div>
          <label className="block mb-1">Discount Price Resume:</label>
          <input
            type="number"
            name="dicountpriceResume"
            value={formData.dicountpriceResume}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        {/* Total Price Bio */}
        <div>
          <label className="block mb-1">Total Price Bio:</label>
          <input
            type="number"
            name="totalpriceBio"
            value={formData.totalpriceBio}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        {/* Discount Price Bio */}
        <div>
          <label className="block mb-1">Discount Price Bio:</label>
          <input
            type="number"
            name="dicountpriceBio"
            value={formData.dicountpriceBio}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        {/* Total Price Invitation */}
        <div>
          <label className="block mb-1">Total Price Invitation:</label>
          <input
            type="number"
            name="totalpriceInvitation"
            value={formData.totalpriceInvitation}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        {/* Discount Price Invitation */}
        <div>
          <label className="block mb-1">Discount Price Invitation:</label>
          <input
            type="number"
            name="dicountpriceInvitation"
            value={formData.dicountpriceInvitation}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Total Price Property */}
        <div>
          <label className="block mb-1">Total Price Property:</label>
          <input
            type="number"
            name="totalpriceProperty"
            value={formData.totalpriceProperty}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        {/* Discount Price Property */}
        <div>
          <label className="block mb-1">Discount Price Property:</label>
          <input
            type="number"
            name="dicountpriceProperty"
            value={formData.dicountpriceProperty}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2"
        >
          {loading ? "Updating..." : "Update Price"}
        </button>
      </form>
    </div>
  );
};

export default PriceScreen;
