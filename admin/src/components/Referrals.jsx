import React, { useState, useEffect } from "react";
import axios from "axios";

const Referrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for filtering
  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // Fetch referrals when the component mounts
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await axios.get("https://admin.qrandcards.com/api/referals");
        console.log(response.data, 'response.data?.referals');
        setReferrals(response.data || []);
      } catch (err) {
        console.error("Error fetching referrals:", err);
        setError("Failed to load referrals.");
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  // Filter referrals based on searchText and searchDate
  const filteredReferrals = referrals.filter((referral) => {
    // Filter by referral text
    const matchText = referral.referal.toLowerCase().includes(searchText.toLowerCase());
    // Filter by date if provided; assume referral.createdAt exists
    let matchDate = true;
    if (searchDate && referral.createdAt) {
      const createdAtDate = new Date(referral.createdAt).toISOString().split("T")[0];
      matchDate = createdAtDate === searchDate;
    }
    return matchText && matchDate;
  });

  if (loading) return <p className="p-6">Loading referrals...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Referrals Admin Page</h1>
      
      {/* Search and Date Filter */}
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div>
          <label className="block text-gray-600 mb-1">Search Referral:</label>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Enter referral text..."
            className="border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Filter by Date:</label>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Display count of search results */}
      <div className="mb-4">
        <p className="text-gray-700">
          Total Results: <span className="font-bold">{filteredReferrals.length}</span>
        </p>
      </div>

      {/* Referrals Table */}
      {filteredReferrals.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">User</th>
                <th className="border border-gray-300 px-4 py-2">Referral</th>
                <th className="border border-gray-300 px-4 py-2">Type</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredReferrals.map((referral) => (
                <tr key={referral._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{referral.user}</td>
                  <td className="border border-gray-300 px-4 py-2">{referral.referal}</td>
                  <td className="border border-gray-300 px-4 py-2">{referral.type}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {referral.createdAt ? new Date(referral.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No referrals found.</p>
      )}
    </div>
  );
};

export default Referrals;
