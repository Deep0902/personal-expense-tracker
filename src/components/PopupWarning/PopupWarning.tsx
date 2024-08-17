import "./PopupWarning.css";
import alertImg from "/images/alert-warning.svg";
interface PopupWarningProps {
  message: string;
  onButtonClickded: () => void;
}
function PopupWarning({ message, onButtonClickded }: PopupWarningProps) {
  return (
    <>
      <div className="overlayBackgroundAlert">
        <div className="poppins-bold">
          <div className="overlayBoxAlert">
            <div className="alertTitle">
              <img src={alertImg} alt="" />
              <span className="poppins-bold">Alert!</span>
            </div>
            <span className="poppins-regular">{message}</span>
            <div className="AlertButtons">
              <button
                className="poppins-medium okayButton"
                onClick={onButtonClickded}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopupWarning;
