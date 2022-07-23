import React, { useEffect, useState } from "react";

// API Part
function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await fetch("/some-api");
      const data = await response.json();
      setUsers(data);
    };

    loadUsers();
  }, []);

  return { users };
}

// 2nd Component
function UserItem({ user }) {
  return (
    <li>
      <img src={user.avatarUrl} />
      <p>{user.fullName}</p>
      <small>{user.role}</small>
    </li>
  );
}

// Access data with some condition
const getOnlyActive = () => {
  const { users } = useUsers();

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return users.filter(
    (user) => !user.isBanned && user.lastActivityAt >= weekAgo
  );
};

// Memorizing the user data
const useActiveUsers = () => {
  const { users } = useUsers();
  const activeUsers = useMemo(() => getOnlyActive(users), [users]);
  return { activeUsers };
};

// 1st  Component
function ActiveUserList() {
  const { activeUsers } = useActiveUsers();

  return (
    <>
      <ul>
        {activeUsers.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
    </>
  );
}

export default ActiveUserList;
