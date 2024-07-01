import React, {
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useState,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";
import AddressSearchModal from "components/AddressSearchModal";
import "./style.css";

interface Props {
  label: string;
  type: "text";

  address: string;
  setAddress: (address: string) => void;

  icon?: "eye-light-off-icon" | "eye-light-on-icon" | "expand-right-light-icon";
  onButtonClick?: () => void;

  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

//          component: Address Input Box          //
const AddressInputBox: ForwardRefRenderFunction<HTMLInputElement, Props> = (props: Props, ref) => {
  //          state: Modal of Address Search          //
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  //          state: Input Element Reference          //
  const inputRef = useRef<HTMLInputElement | null>(null);
  //          state: properties          //
  const { label, type, icon, address } = props;
  const { setAddress, onKeyDown, onChange, onButtonClick } = props;

  //          event handler: key event          //
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!onKeyDown) return;
    onKeyDown(event);
  };
  //          event handler: Address Search Button Click event          //
  const onButtonClickHandler = () => {
    setModalOpen(true);
  };

  //          effect: Modal popup window          //
  useEffect(() => {
    if (inputRef.current && isModalOpen) {
      const autoComplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"],
      });

      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        setAddress(place.formatted_address || "");
        setModalOpen(false);
      });
    }
  }, [isModalOpen, setAddress]);

  //          render: Address Input Box          //
  return (
    <div className="input-box">
      <div className="inputbox-label">{label}</div>
      <div className="inputbox-container">
        <input
          ref={ref}
          className="input"
          type={type}
          value={address}
          onClick={onButtonClickHandler}
          readOnly
          onKeyDown={onKeyDownHandler}
          placeholder="Enter your address"
          onChange={onChange}
        />
        {onButtonClick !== undefined && (
          <div className="icon-button" onClick={onButtonClickHandler}>
            {icon !== undefined && <div className={`icon ${icon}`}></div>}
          </div>
        )}
        {isModalOpen && (
          <AddressSearchModal onClose={() => setModalOpen(false)}>
            <input className="input" ref={inputRef} type="text" placeholder="Enter your address" />
          </AddressSearchModal>
        )}
      </div>
    </div>
  );
};

export default forwardRef(AddressInputBox);
