import React, { useState, useEffect } from "react";
import axios from "axios";

const CardsBackgroundImages = () => {
  const [cardsBackground, setCardsBackground] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Fetch the current cards background document on mount
  useEffect(() => {
    fetchCardsBackground();
  }, []);

  const fetchCardsBackground = async () => {
    try {
      const response = await axios.get("https://admin.qrandcards.com/api/cardsBackground");
      setCardsBackground(response.data);
    } catch (error) {
      console.error("Error fetching cards background:", error);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  // Upload selected images
  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Please select at least one image to upload.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axios.post("https://admin.qrandcards.com/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchCardsBackground();
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  // Delete a single image from the cards background document
  const handleDeleteImage = async (imageUrl) => {
    if (!cardsBackground || !cardsBackground._id) return;
    try {
      // Note: When sending a DELETE request with a request body using axios,
      // you need to include the data in the config object.
      await axios.delete(`https://admin.qrandcards.com/api/deleteCardsBackgroundImage/${cardsBackground._id}`, {
        data: { imageUrl },
      });
      fetchCardsBackground();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // (Optional) Delete the entire cards background document
  const handleDeleteDocument = async () => {
    if (!cardsBackground || !cardsBackground._id) return;
    try {
      await axios.delete(`https://admin.qrandcards.com/api/deleteCardsBackground/${cardsBackground._id}`);
      setCardsBackground(null);
    } catch (error) {
      console.error("Error deleting cards background document:", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 pt-[60px] md:pt-8">Cards Background</h2>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="mb-5 space-y-3">
        <input
          type="file"
          name="images"
          multiple
          onChange={handleFileChange}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Upload Images
        </button>
      </form>

      {/* Display the uploaded images */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Uploaded Images</h3>
        {cardsBackground && cardsBackground.image && cardsBackground.image.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {cardsBackground.image.map((imgUrl, index) => (
              <div key={index} className="border p-2 relative">
                <img
                  src={`https://admin.qrandcards.com${imgUrl}`}
                  alt={`Background ${index}`}
                  className="w-full lg:w-[150px] h-auto"
                />
                <button
                  onClick={() => handleDeleteImage(imgUrl)}
                  className="bg-red-500 text-white px-2 py-1 absolute top-0 right-0"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>

      {/* (Optional) Button to delete the entire document */}
      {cardsBackground && cardsBackground._id && (
        <button
          onClick={handleDeleteDocument}
          className="bg-red-600 text-white px-4 py-2 mt-4"
        >
          Delete Entire Document
        </button>
      )}
    </div>
  );
};

export default CardsBackgroundImages;
