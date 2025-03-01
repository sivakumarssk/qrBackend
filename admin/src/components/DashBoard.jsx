import { useEffect, useState } from "react";

const Dashboard = () => {
  const [counts, setCounts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch("https://admin.qrandcards.com/api/getCounts");
        const data = await response.json();
        setCounts(data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-[100%] px-10 ">
      <h1 className="text-3xl font-bold mb-6 pt-[60px] md:pt-8">Admin Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Loading data...</p>
      ) : counts ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Users */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">Total Users</h2>
            <p className="text-2xl font-bold">{counts.users}</p>
          </div>

          {/* Total QR Downloads */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">Total QR Downloads</h2>
            <p className="text-2xl font-bold">{counts.totalQR}</p>
          </div>

          {/* Daily QR Downloads */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">Daily QR Downloads</h2>
            <p className="text-2xl font-bold">{counts.dailyQR}</p>
          </div>

                    {/* Total Personal Cards */}
                    <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">Total Personal Cards</h2>
            <p className="text-2xl font-bold">{counts.totalPersonal}</p>
          </div>

          {/* Daily Personal Cards */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">Daily Personal Cards</h2>
            <p className="text-2xl font-bold">{counts.dailyPersonal}</p>
          </div>

          {/* Total Business Cards */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">Total Business Cards</h2>
            <p className="text-2xl font-bold">{counts.totalBusiness}</p>
          </div>

          {/* Total Business Cards */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">Daily Business Cards</h2>
            <p className="text-2xl font-bold">{counts.dailyBusiness}</p>
          </div>

          {/* Total Resume */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">Total Resume</h2>
            <p className="text-2xl font-bold">{counts.totalResume}</p>
          </div>

          {/* Daily Resume Cards */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">Daily Resume</h2>
            <p className="text-2xl font-bold">{counts.dailyResume}</p>
          </div>

           {/* Total Bio Data */}
           <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">Total  Bio Data</h2>
            <p className="text-2xl font-bold">{counts.totalBio}</p>
          </div>

          {/* Daily Bio Data */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">Daily  Bio Data</h2>
            <p className="text-2xl font-bold">{counts.dailyBio}</p>
          </div>

           {/* Total Invitation */}
           <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">Total Invitation</h2>
            <p className="text-2xl font-bold">{counts.totalInvitation}</p>
          </div>

          {/* Daily Invitation */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">Daily Invitation</h2>
            <p className="text-2xl font-bold">{counts.dailyInvitation}</p>
          </div>

          {/* Total Property */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">Total Property</h2>
            <p className="text-2xl font-bold">{counts.totalProperty}</p>
          </div>

          {/* Daily Property */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">Daily Property</h2>
            <p className="text-2xl font-bold">{counts.dailyProperty}</p>
          </div>

        </div>
      ) : (
        <p className="text-red-500">Failed to load data</p>
      )}
    </div>
  );
};

export default Dashboard;
