import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

interface DashboardListProps {
  title: string;
  menuIcon: IconProp;
  currentPath: string;
  href: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const DashboardList = ({
  title,
  menuIcon,
  href,
  currentPath,
  onClick,
}: //   active = false,
DashboardListProps) => {
  const isActive = href === currentPath;
  return (
    <Link
      href={href}
      className={`flex flex-row gap-2 items-center  cursor-pointer px-4 py-2 rounded mb-1 ${
        isActive ? "bg-black text-white hover:bg-gray-800" : "hover:bg-gray-300"
      }`}
    >
      <FontAwesomeIcon icon={menuIcon} />
      <p>{title}</p>
    </Link>
  );
};
export default DashboardList;
