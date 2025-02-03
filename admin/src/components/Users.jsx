import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://admin.qrandcards.com/api/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="border">
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border">
              <td className="p-2 border">{user.userName}</td>
              <td className="p-2 border">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
