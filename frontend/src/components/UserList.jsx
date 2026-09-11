import { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    setUsers(await res.json());
  };

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE"
    });
    fetchUsers();
  };

  const updateUser = async () => {
  const res = await fetch(
    `http://localhost:5000/api/users/${selectedUser.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: selectedUser.name,
        email: selectedUser.email,
        age: selectedUser.age
      })
    }
  );

  const data = await res.json();
  alert(data.message);

  setSelectedUser(null);
  fetchUsers();
};

  return (
    <div>
      <br></br>
      <h2>Users</h2>

      {users.map((user) => (
        <div key={user.id}>
          {user.name} - {user.email} - {user.age}
          <input type="checkbox" onChange={() => setSelectedUser(users)} /><button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}


    {selectedUser && (
      <button onClick={updateUser}>Update</button>
    )}
    </div>
  );
}

export default UserList;