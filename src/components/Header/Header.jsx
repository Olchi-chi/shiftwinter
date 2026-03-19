import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logotip from '../Icons/Logotip' 
import HeaderButton from '../HeaderButton/HeaderButton'
import { UserStorage } from '../../utils/userStorage'; // ← Импорт утилиты
import './Header.css'

export default function Header(){
    const navigate = useNavigate();
    const location = useLocation();
    
    // ← Состояние авторизации
    const [isAuthenticated, setIsAuthenticated] = useState(
        UserStorage.isAuthenticated()
    );

    // ← Отслеживаем изменения авторизации (в т.ч. в других вкладках)
    useEffect(() => {
        // Проверка при монтировании и при смене пути
        setIsAuthenticated(UserStorage.isAuthenticated());
        
        // Слушаем изменения в localStorage (для синхронизации между вкладками)
        const handleStorageChange = (e) => {
            if (e.key === 'user_isAuthenticated' || e.key === null) {
                setIsAuthenticated(UserStorage.isAuthenticated());
            }
        };
        window.addEventListener('storage', handleStorageChange);
        
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [location]);

    // Навигация
    const handleSelectMain = () => {
        navigate(`/home`);
    }

    const handleSelectAuto = () => {
        navigate(`/auth`);
    };

    // ← Проверка авторизации перед переходом
    const requireAuth = (destination) => {
        if (isAuthenticated) {
            navigate(destination);
        } else {
            // Сохраняем куда пользователь хотел попасть, чтобы вернуть после входа
            navigate(`/auth?redirect=${encodeURIComponent(destination)}`);
        }
    };

    const handleSelectProfile = () => {
        requireAuth(`/profile`);
    };

    const handleSelectOrders = () => {
        requireAuth(`/orders`); // ← Замените на ваш маршрут заказов
    };

    // ← Выход из системы
    const handleLogout = () => {
        UserStorage.clear(); // Очищаем данные
        setIsAuthenticated(false); // Обновляем состояние
        navigate(`/home`); // Перенаправляем на главную
    };

    return(
        <header>
            <button 
                className="logo-btn" 
                onClick={handleSelectMain} 
                type="button"
                aria-label="Перейти на главную страницу"
            >
                <Logotip />
            </button>

            <nav className="main__action">
                <HeaderButton 
                    iconID="profile" 
                    onClick={handleSelectProfile}
                >
                    Мой аккаунт
                </HeaderButton>
                <HeaderButton 
                    iconID="order"
                    onClick={handleSelectOrders}
                >
                    Заказы
                </HeaderButton>
            </nav>
            
            <nav className="main__action secondary">
                {/* ← Условный рендеринг: Войти / Выйти */}
                {isAuthenticated ? (
                    <HeaderButton 
                        iconID="account" 
                        onClick={handleLogout}
                    >
                        Выйти
                    </HeaderButton>
                ) : (
                    <HeaderButton 
                        iconID="account" 
                        onClick={handleSelectAuto}>
                        Войти
                    </HeaderButton>
                )}
                
                <HeaderButton iconID="theme"></HeaderButton>
            </nav>
        </header>
    )
}