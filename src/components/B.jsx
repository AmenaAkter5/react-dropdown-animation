import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { CSSTransition } from "react-transition-group";
import { useOutsideClick } from "../hooks/useOutsideClick";
import "./Dropdown.css";
import { travellerTypeOptions } from "./options";

const Dropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 mx-auto flex justify-between items-center gap-16 text-white my-5 max-w-7xl w-full bg-slate-700">
      <div className="text-2xl font-medium">
        Travel <span className=" text-gray-300">App</span>
      </div>
      <div>
        <ul className="flex justify-between gap-6 font-medium text-base bg-white bg-opacity-20 rounded-lg py-2 px-6 dropdown-container">
          <li ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-[6px] cursor-pointer py-1.5 px-2"
            >
              TRAVELLER TYPE{" "}
              <FiChevronDown
                className={` duration-300 transition-all text-xl mt-0.5 ${
                  isOpen ? "open rotate-180" : ""
                }`}
              />
            </button>
            <CSSTransition
              in={isOpen}
              timeout={300}
              classNames="dropdown"
              unmountOnExit
              appear
            >
              <div
                className={`dropdown-content absolute flex flex-col bg-white px-4 py-2 border rounded-xl mt-2`}
              >
                {travellerTypeOptions.map((option, index) => (
                  <span
                    className="px-4 text-black"
                    key={index}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </span>
                ))}
              </div>
            </CSSTransition>
          </li>
        </ul>
      </div>
      <div>
        <p className="">My Account</p>
      </div>
    </nav>
  );
};

Dropdown.propTypes = {
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

export default Dropdown;
