import { Inbox } from "lucide-react";
import StatePanel, { IconBadge } from "./StatePanel";

// Empty state: the request worked but there is nothing to show yet.
const NoDataFound = ({ title = "Data" }) => (
  <StatePanel
    icon={
      <IconBadge>
        <Inbox className="h-6 w-6" />
      </IconBadge>
    }
    title={`No ${title.toLowerCase()} found`}
    message="There is nothing to show here yet. Please check back later."
  />
);

export default NoDataFound;
