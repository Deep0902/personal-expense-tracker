import "./PopupWarning.css";
interface PopupWarningProps {
  message: string;
  onButtonClickded: () => void;
}
function PopupWarning({
  message,
  onButtonClickded,
}: PopupWarningProps) {
  return (
    <>
      <div className="overlayBackgroundAlert">
        <div className="poppins-bold">
          <div className="overlayBoxAlert">
            <span>Alert</span>
            <span>{message}</span>
            <button onClick={onButtonClickded}>Okay</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopupWarning;
