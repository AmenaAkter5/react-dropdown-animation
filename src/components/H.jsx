import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import "./Dropdown.css";

const Navbar = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <nav className=" bg-white fixed top-4 w-full mx-36 py-3">
      <div className="dropdown w-52 relative" ref={dropdownRef}>
        <button
          className={`flex items-center py-2 px-2 gap-1 rounded bg-slate-700 text-white ${
            isOpen ? "open" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          TRAVELLER TYPE
          <FiChevronDown
            className={`duration-300 transition-all ${
              isOpen ? "open rotate-180" : ""
            }`}
          />
        </button>

        <ul
          className={`bg-white rounded-md shadow-md mt-2 border duration-300 absolute w-52 ${
            isOpen ? "scale-in opacity-100" : "scale-out opacity-0"
          }`}
        >
          {options.map((option, index) => (
            <li
              className=" my-2 px-4"
              key={index}
              onClick={() => handleOptionClick(option)}
            >
              {typeof option === "string" ? (
                <span>{option}</span>
              ) : (
                <button
                  to={option.to}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        to: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Navbar;
