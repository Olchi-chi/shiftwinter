import AccountIcon from '../Icons/AccountIcon';
import OrderIcon from '../Icons/OrderIcon';
import ProfileIcon from '../Icons/ProfileIcon';
import ThemeIcon from '../Icons/ThemeIcon';
import './HeaderButton.css'

const iconMap = {
  'account': AccountIcon,
  'order': OrderIcon,
  'profile': ProfileIcon,
  'theme': ThemeIcon
};

export default function HeaderButton({children, iconID}){
const IconComponent = iconMap[iconID];
    return(
       <button className="header__button">
        {IconComponent && (
          <IconComponent />
      )}
        <span>{children}</span>
    </button>
    )
}