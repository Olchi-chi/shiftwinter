import './InputDiv.css';

export default function InputDiv({ label, placeholder, svgIcon, style, value, onChange, readOnly, disabled,error, ...props }) {
  return (
    <div className="input-div">
      <h4>{label}</h4>
        <div className="input-div__search">
            <input type="text" placeholder={placeholder} className={`input-div__wrapper ${error ? 'input-error' : ''}`} style={style} {...props}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                disabled={disabled}/>
            <div className="input-div__icon">
                {svgIcon}
            </div>
        </div>
    </div>
  );
}