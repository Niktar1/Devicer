// src/components/Users.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:5000/users'); // NestJS API URL
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
