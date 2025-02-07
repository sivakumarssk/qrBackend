import { useEffect, useState } from "react";
import axios from "axios";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    review: "",
    link: "",
    image: null,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("https://admin.qrandcards.com/api/testimonials");
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://admin.qrandcards.com/api/testimonial/${id}`);
      setTestimonials(testimonials.filter((testimonial) => testimonial._id !== id));
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("role", formData.role);
    data.append("review", formData.review);
    data.append("link", formData.link);
    if (formData.image) data.append("image", formData.image);

    try {
      await axios.post("https://admin.qrandcards.com/api/upload-testimonial", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchTestimonials();
      setFormData({ name: "", role: "", review: "", link: "", image: null });
    } catch (error) {
      console.error("Error uploading testimonial:", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 pt-[60px] md:pt-8">Admin Testimonials</h2>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="mb-5 space-y-3  w-[100%]">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="border p-2 w-full" />
        <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Title" className="border p-2 w-full" />
        <textarea name="review" value={formData.review} onChange={handleChange} placeholder="Description" required className="border p-2 w-full"></textarea>
        <input type="text" name="link" value={formData.link} onChange={handleChange} placeholder="Link " className="border p-2 w-full" />
        <input type="file" name="image" onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Upload</button>
      </form>

      {/* Display Testimonials */}
      <h3 className="text-xl font-semibold">Testimonials List</h3>
      {testimonials.map((testimonial) => (
        <div key={testimonial._id} className="border p-4 mb-2">
          <p><strong>{testimonial.name}</strong> ({testimonial.role}): {testimonial.review}</p>
          {testimonial.image && <img src={`https://admin.qrandcards.com${testimonial.image}`} alt="Testimonial" className="w-24 h-24 mt-2" />}
          <button onClick={() => handleDelete(testimonial._id)} className="bg-red-500 text-white px-3 py-1 mt-2">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
