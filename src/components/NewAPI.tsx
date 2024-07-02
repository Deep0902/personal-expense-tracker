import { useEffect, useState } from "react";
import axios from "axios";
interface Admin {
  _id: string;
  admin_id: string;
  admin_pass: string;
}

function NewAPI() {
  const [admins, setAdmins] = useState<Admin[]>([]);


  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('/api/admins');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <>
      <h2>API Display</h2>
      <br />

      <div>
        <h2>Admins</h2>
        <ul>
          {admins.map((admin) => (
            <li key={admin._id}>
              {admin.admin_id} - {admin.admin_pass}
            </li>
          ))}
        </ul>

        
      </div>
    </>
  );
}

export default NewAPI;
