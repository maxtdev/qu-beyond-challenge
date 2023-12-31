import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { getSanitizedData, getSanitizedHeader } from "./utils";
import AnimateWrapper from "./animate";
import { IPlanet } from "../utils/types";

interface IModalProps {
  className?: string;
  setOpenModal: (openModal: boolean) => void;
  setSelectedItem: Dispatch<SetStateAction<IPlanet | Object>>;
  selectedItem: IPlanet;
  open: boolean;
  keys: string[];
};

const Modal: React.FC<IModalProps> = ({ setOpenModal, setSelectedItem, selectedItem, open, keys }) => {
  const modalOverlayClasses = 'absolute h-full w-full z-10 top-0 bg-slate-100 opacity-80';
  const modalLayerClasses = 'bg-slate-200 overflow-hidden absolute w-full h-full flex content-center justify-center z-20 rounded-xl transition-opacity ease-in-out delay-100';
  const closeButtonRef = useRef(null);
  const contentRef = useRef(null);

  const handleCloseIconClick = () => {
    setOpenModal(false);
    setSelectedItem({});
  };
  const handleModalClick = (event) => {
    event.stopPropagation();
  };
  const handleOverlayClick = () => {
    setOpenModal(false);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      const tabIndex = event.target.tabIndex;

      if (tabIndex === -1 || tabIndex > 13) {
        closeButtonRef.current.focus();
        event.preventDefault();
      }
    }
  };

  useEffect(() => {
    if (open) {
      closeButtonRef.current.focus();
    };
  }, [open]);

  return (
    <AnimateWrapper onKeyDown={handleKeyDown} delay={500}>
      <div onKeyDown={handleKeyDown}>
        <div className={modalOverlayClasses} onClick={handleOverlayClick} />
        <div className={modalLayerClasses} 
          onClick={handleModalClick} 
          style={{ 
            top: "calc(50% - 200px)", 
            left: "calc(50% - 200px)", 
            height: "400px" , 
            width: "400px", 
          }} 
          role="dialog" 
          aria-modal={open}
          ref={contentRef}
        >
          <div className="items-center flex p-4 overflow-hidden">
            <button 
              className="absolute top-4 right-4 bg-slate-300 p-2 font-bold focus:border-slate-400"
              style={{ borderRadius: "50%", fontSize: '10px'}}
              onClick={handleCloseIconClick}
              ref={closeButtonRef}
              tabIndex={1}
            >
              X
            </button>
            <ul>
              {keys.map((key, index) => 
                <li className="capitalize pb-1" tabIndex={index + 2}>
                  <span className="text-neutral-900">{`${getSanitizedHeader(key)}: `}</span>
                  <span className="text-neutral-500 pl-2">{`${getSanitizedData(selectedItem[key])}`}</span>
                </li>
              )}
            </ul>
          </div>
        </div> 
      </div>
    </AnimateWrapper>
  );
}

export default Modal;
