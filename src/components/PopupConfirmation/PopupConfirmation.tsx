import "./PopupConfirmation.css";
import alertImgRed from "/images/alert-warning-red.svg";
interface PopupConfirmationProps {
  message: string;
  onButtonClicked: (confirmation: boolean) => void;
}
function PopupConfirmation({ message, onButtonClicked }: PopupConfirmationProps) {
  return (
    <>
      <div className="overlayBackgroundAlert">
        <div className="poppins-bold">
          <div className="overlayBoxAlert">
            <div className="alertTitle">
              <img src={alertImgRed} alt="" />
              <span className="poppins-bold">Alert!</span>
            </div>
            <span className="poppins-regular">{message}</span>
            <div className="AlertButtons">
              <button className="poppins-medium" onClick={() =>onButtonClicked(false)}>
                No
              </button>
              <button className="poppins-medium" onClick={ ()=> onButtonClicked(true)}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopupConfirmation;
