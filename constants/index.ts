import {
  FriendsIcon,
  MessageIcon,
  HomeIcon,
  NotificationIcon,
} from "@/assets/icons";

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
