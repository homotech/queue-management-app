"use client";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { faHamburger } from "@fortawesome/free-solid-svg-icons/faHamburger"; // This is the icon for your menu button
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DashboardList from "./DashboardList";
import Button from "./Button";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"; // Import faBars (hamburger) and faXmark (close) icons

const DashboardNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  // State to control the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Initial state: menu is closed

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

  return (
    <div className="">
      {/* Mobile Menu Button (Hamburger/Close Icon) */}
      <div className="md:hidden p-4 flex justify-between items-center bg-gray-100 w-full">
        <h1 className="text-xl font-bold">Queuemate</h1>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu state
          className="text-2xl"
        >
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />{" "}
          {/* Change icon based on menu state */}
        </button>
      </div>

      {/* Main Navbar Content */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-gray-100 z-50
          transform transition-transform ease-in-out duration-300
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:min-h-screen md:w-48
          px-4 py-4 flex flex-col justify-between
        `}
      >
        <div className="flex flex-col gap-16">
          {/* Queuemate title - visible on mobile menu and desktop */}
          <div className="md:block hidden">
            {" "}
            {/* Hide on mobile when menu is open (already in mobile button) */}
            <h1 className="text-xl font-bold">Queuemate</h1>{" "}
          </div>
          <div>
            {navLinks.map((link) => (
              <DashboardList
                key={link.href}
                href={link.href}
                title={link.label}
                menuIcon={link.icon}
                currentPath={pathname}
                onClick={() => setIsMenuOpen(false)} // Close menu on link click
              />
            ))}
          </div>
        </div>
        <div>
          <Button type="button" onClick={handleLogout} fullWidth={true}>
            {/* Changed 'full' to 'fullWidth' */}
            <FontAwesomeIcon icon={faRightFromBracket} /> Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
