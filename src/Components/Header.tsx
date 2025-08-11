import type { User } from "../Types/User";

type HeaderProps = {
  activeUser: User | null;
  onUserSelect: (user: User) => void;
};

function Header({ activeUser, onUserSelect }: HeaderProps) {
  const availableUsers: Array<User> = [
    {
      id: 1,
      username: "PM - Dennis",
      password: "DENNIS",
    },
    {
      id: 2,
      username: "PM - Mac",
      password: "karate",
    },
    {
      id: 3,
      username: "Tenant - Charlie",
      password: "milkSteak",
    },
    {
      id: 4,
      username: "Tenant - Frank",
      password: "password1",
    },
  ];
  return (
    <header className="h-full flex items-center justify-between p-4 bg-gray-100 border-b shadow-sm">
      <h1 className="text-xl font-semibold">Keyhook Booking POC</h1>
      <div className="space-x-2">
        {availableUsers.map((user) => (
          <button
            key={user.id}
            onClick={() => onUserSelect(user)}
            className={`px-3 py-1 rounded ${
              activeUser && activeUser.id === user.id
                ? "bg-blue-600 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            {user.username}
          </button>
        ))}
      </div>
    </header>
  );
}

export default Header;
