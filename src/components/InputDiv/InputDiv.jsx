import './InputDiv.css';

export default function InputDiv({ label, placeholder, svgIcon }) {
  return (
    <div className="input-div">
      <h4>{label}</h4>
        <div className="input-div__search">
            <input type="text" placeholder={placeholder} className="input-div__wrapper"/>
            <div className="input-div__icon">
                {svgIcon}
            </div>
        </div>
    </div>
  );
}