
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMobile();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Function to check if a link is active
  const isActive = (path: string) => location.pathname === path;

  // Function to close menu when clicked outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && isMobile) {
        const target = event.target as HTMLElement;
        if (!target.closest("nav")) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isMobile]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">Inveron</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary hover:text-secondary-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                to="/plans"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/plans")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary hover:text-secondary-foreground"
                }`}
              >
                Plans
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/about")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary hover:text-secondary-foreground"
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/contact")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary hover:text-secondary-foreground"
                }`}
              >
                Contact
              </Link>
              <ThemeToggle />
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-secondary"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary hover:text-secondary-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/plans"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/plans")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary hover:text-secondary-foreground"
              }`}
            >
              Plans
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/about")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary hover:text-secondary-foreground"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/contact")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary hover:text-secondary-foreground"
              }`}
            >
              Contact
            </Link>
            <div className="flex space-x-2 pt-2">
              <Link to="/login" className="w-1/2">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/register" className="w-1/2">
                <Button className="w-full">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
