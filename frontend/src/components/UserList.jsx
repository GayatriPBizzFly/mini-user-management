import { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    //This sends a GET request to:
    const res = await fetch("http://localhost:5000/api/users");
    //converts the backend JSON response into a JavaScript object/array.
    setUsers(await res.json());
  };

  //This stores the user selected using the checkbox.
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
        //React needs a unique key when displaying a list.
        <div key={user.id}>
          {user.name} - {user.email} - {user.age}
          <input type="checkbox" onChange={() => setSelectedUser(users)} />
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}


    {selectedUser && (
      <button onClick={updateUser}>Put</button>
    )}
    </div>
  );
}

export default UserList;