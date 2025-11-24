import {
  FriendsIcon,
  MessageIcon,
  HomeIcon,
  NotificationIcon,
  SettingIcon,
  HelpIcon,
  LogoutIcon,
} from "@/assets/icons";
import { logout } from "@/features/auth/actions";

export const DESKTOP_NAV_MENU = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Friends",
    href: "#friends",
    icon: FriendsIcon,
  },
  {
    label: "Notification",
    href: "#notification",
    icon: NotificationIcon,
    count: 6,
  },
  {
    label: "Message",
    href: "#message",
    icon: MessageIcon,
    count: 2,
  },
];

export const USER_NAV_MENU = [
  {
    label: "Settings",
    href: "/settings",
    icon: SettingIcon,
  },
  {
    label: "Help & Support",
    href: "/help-support",
    icon: HelpIcon,
  },
];
