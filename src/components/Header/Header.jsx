import Logotip from '../Icons/Logotip' 
import HeaderButton from '../HeaderButton/HeaderButton'
import './Header.css'

export default function Header(){
    return(
        <header>
            <Logotip/>
            <nav className="main__action">
                <HeaderButton iconID="profile">Мой аккаунт</HeaderButton>
                <HeaderButton iconID="order">Заказы</HeaderButton>
            </nav>
            <nav className="main__action secondary">
                <HeaderButton iconID="account">Выйти</HeaderButton>
                <HeaderButton iconID="theme"></HeaderButton>
            </nav>
        </header>
    )
}