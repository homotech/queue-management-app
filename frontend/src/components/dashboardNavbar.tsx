import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { faHamburger } from "@fortawesome/free-solid-svg-icons/faHamburger";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DashboardList from "./DashboardList";
import Button from "./Button";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";

const DashboardNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const navLinks = [
    { label: "Home", href: "/dashboard", icon: faHome },
    { label: "Services", href: "/dashboard/services", icon: faHamburger },
    { label: "Queue", href: "/dashboard/queue", icon: faPeopleGroup },
    { label: "Settings", href: "/dashboard/settings", icon: faGear },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("login");
  };
  const [menu, setMenu] = useState([{ icon: "faHome", menuTitle: "Home" }]);
  return (
    <div className="px-4 py-4 bg-gray-100 md:min-h-screen gap-16 flex flex-col justify-between w-48">
      <div className="flex flex-col gap-16">
        <div>
          <h1 className="text-xl font-bold">Queuemate</h1>
        </div>
        <div>
          {navLinks.map((link) => (
            <DashboardList
              key={link.href}
              href={link.href}
              title={link.label}
              menuIcon={link.icon}
              currentPath={pathname}
            />
          ))}
        </div>
      </div>
      <div>
        <Button type="button" onClick={handleLogout} full={true}>
          <FontAwesomeIcon icon={faRightFromBracket} /> Log out
        </Button>
      </div>
    </div>
  );
};
export default DashboardNavbar;
