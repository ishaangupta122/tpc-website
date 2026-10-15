import {
  Home,
  Users,
  Calendar,
  Trophy,
  Rocket,
  Image,
  BarChart4,
  Bell,
  FileText,
} from "lucide-react";

// Sidebar entries, in display order.
export const NAV_ITEMS = [
  { name: "Dashboard", to: "/", icon: Home },
  { name: "Faculty List", to: "/faculty", icon: Users },
  { name: "Events", to: "/events", icon: Calendar },
  { name: "Achievements", to: "/achievements", icon: Trophy },
  { name: "Success Story", to: "/success-stories", icon: Rocket },
  { name: "Placements", to: "/placements", icon: BarChart4 },
  { name: "Managing Committee", to: "/managing-committee", icon: Users },
  { name: "Gallery", to: "/gallery", icon: Image },
  { name: "Notices", to: "/notices", icon: Bell },
  { name: "Documents", to: "/documents", icon: FileText },
];
