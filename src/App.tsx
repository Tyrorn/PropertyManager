import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import type { User } from "./Types/User";
import { loginUser } from "./services/login";
import Footer from "./Components/Footer";
import PropertyManagerDashboard from "./Components/PropertyManagerDashboard";
import TenantDashboard from "./Components/TenantDashboard";

function App() {
  const [user, setUser] = useState<User | null>(null);

  async function handleUserSelect(activeUser: User) {
    const response = await loginUser(activeUser.username, activeUser.password);

    setUser(response.user);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex-shrink-0 h-[10vh]">
        <Header activeUser={user} onUserSelect={handleUserSelect} />
      </header>

      <main className="flex-grow flex overflow-hidden">
        {user ? (
          user.role === "Tenant" ? (
            <TenantDashboard user={user} />
          ) : (
            <PropertyManagerDashboard user={user} />
          )
        ) : null}
      </main>

      <footer className="flex-shrink-0 h-[10vh]">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
