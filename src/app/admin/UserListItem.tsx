import { type UserRecord } from "../../lib/adminApi.ts";
import ListItemButton from "./ListItemButton";

interface UserListItemProps {
  user: UserRecord;
  active: boolean;
  onClick: (u: UserRecord) => void;
}

export default function UserListItem(
  { user, active, onClick }: UserListItemProps,
) {
  const displayName =
    [user.first_name, user.last_name].filter(Boolean).join(" ") ||
    user.username ||
    user.id;
  return (
    <ListItemButton
      eyebrow={user.email}
      name={displayName}
      active={active}
      onClick={() => onClick(user)}
    />
  );
}
