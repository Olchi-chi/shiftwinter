import './Button.css'

export default function Button({ children, className = '', variant = 'default', ...props }) {
  const buttonClass = `button button_${variant} ${className}`;
  
  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}