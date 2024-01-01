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
    <nav className="fixed top-0 left-0 right-0 mx-auto flex justify-between items-center gap-16 text-white my-5 max-w-7xl w-full shadow-md rounded-md bg-slate-700 px-4 py-2">
      <div className="text-2xl font-medium">
        Travel <span className=" text-gray-300">App</span>
      </div>
      <div>
        <ul className="flex justify-between gap-6 font-medium text-base bg-white bg-opacity-20 rounded-lg py-2 px-6 dropdown-container">
          <li ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-[6px] cursor-pointer py-0.5 px-2 text-black border"
            >
              TRAVELLER TYPE{" "}
              <FiChevronDown
                className={` duration-300 transition-all text-xl mt-0.5 ${
                  isOpen ? "open  rotate-180 " : ""
                }`}
              />
            </button>
            <CSSTransition
              in={isOpen}
              timeout={300}
              classNames={{
                enter: "dropdown-enter",
                exit: "dropdown-exit",
              }}
              unmountOnExit
            >
              <div className="flex flex-col mt-2 gap-[6px] absolute border duration-300 transition-all rounded-xl overflow-hidden w-80 px-4 py-4 shadow-md bg-white">
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
        <p className="">My Acoount</p>
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
