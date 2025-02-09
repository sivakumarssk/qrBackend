import React, { useState, useEffect } from "react";
import axios from "axios";

const Referrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch referrals when the component mounts
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await axios.get("https://admin.qrandcards.com/api/referals");
        console.log(response.data,'response.data?.referals');
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

  if (loading) return <p className="p-6">Loading referrals...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Referrals Admin Page</h1>
      {referrals?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">User</th>
                <th className="border border-gray-300 px-4 py-2">Referral</th>
                <th className="border border-gray-300 px-4 py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {referrals?.map((referral) => (
                <tr key={referral._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{referral.user}</td>
                  <td className="border border-gray-300 px-4 py-2">{referral.referal}</td>
                  <td className="border border-gray-300 px-4 py-2">{referral.type}</td>
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
