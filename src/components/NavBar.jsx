import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const AUTH_NAV_ITEMS = [
  { name: 'Buy', path: '/buy' },
  { name: 'Rent', path: '/rent' },
  { name: 'Dashboard', path: '/dashboard' },
];

const Navbar = () => {
  const { token } = useStateContext();

  // Conditional items based on token
  const itemsToRender = token ? AUTH_NAV_ITEMS : NAV_ITEMS;

  return (
    <nav className="hidden lg:flex items-center space-x-2 xl:space-x-6 text-xs xl:text-sm font-medium tracking-wide">
      {itemsToRender.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="pb-1 transition duration-200 text-gray-600 hover:text-gray-900 whitespace-nowrap"
        >
          {item.name}
        </Link>
      ))}

      <button
        onClick={() => console.log('Contact Us')}
        className={GOLD_BUTTON_CLASSES.replace('rounded-lg', 'rounded')}
      >
        Contact Us
      </button>
    </nav>
  );
};

export default Navbar;
