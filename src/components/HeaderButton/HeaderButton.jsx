import AccountIcon from '../Icons/AccountIcon';
import OrderIcon from '../Icons/OrderIcon';
import ProfileIcon from '../Icons/ProfileIcon';
import ThemeIcon from '../Icons/ThemeIcon';
import BackIcon from '../Icons/BackIcon';
import './HeaderButton.css'

const iconMap = {
  'account': AccountIcon,
  'order': OrderIcon,
  'profile': ProfileIcon,
  'theme': ThemeIcon,
  'back': BackIcon
};

export default function HeaderButton({children, iconID, style, ...props}){
const IconComponent = iconMap[iconID];
    return(
       <button className="header__button" style={style} {...props}>
        {IconComponent && (
          <IconComponent />
      )}
        <span>{children}</span>
    </button>
    )
}