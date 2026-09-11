import { useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import UserList from "./components/UserList";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>Mini User Management</h1>

      <RegistrationForm
        onUserRegistered={() => setRefresh(!refresh)}
      />

      <UserList key={refresh} />
    </div>
  );
}

export default App;