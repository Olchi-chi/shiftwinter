import './Auth.css'
import { useState, useEffect } from 'react'
import Button from '../../components/Button/Button';
import InputDiv from '../../components/InputDiv/InputDiv'
import { useNavigate } from 'react-router-dom';
import { UserStorage } from '../../utils/userStorage'; // ← Импорт утилиты

// ─────────────────────────────────────────────────────────────
// STEP 1: Ввод телефона
// ─────────────────────────────────────────────────────────────
const Step1 = ({ onNext, onPhoneSubmit }) => {
    const [phone, setPhone] = useState('');
    
    // Валидация: минимум 10 цифр (убираем все не-цифры для проверки)
    const isPhoneValid = phone.replace(/\D/g, '').length >= 10;

    const handleSubmit = () => {
        if (isPhoneValid) {
            onPhoneSubmit(phone); // Передаём номер в родитель
            onNext(); // Переход к шагу 2
        }
    };

    return (
        <div className="step-content">
            <p>Введите номер телефона для входа в личный кабинет</p>
            <InputDiv 
                placeholder="Телефон" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ 
                    maxWidth: '305px', 
                    marginTop: '-10px',
                }}
            />
            <Button 
                onClick={handleSubmit} 
                className={`step-content__button ${!isPhoneValid ? 'disabled' : ''}`}
                disabled={!isPhoneValid}
            >
                Продолжить
            </Button>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────
// STEP 2: Ввод проверочного кода
// ─────────────────────────────────────────────────────────────
const Step2 = ({ onNext, phone }) => {
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    
    // Валидация кода: 4–6 цифр
    const isCodeValid = /^\d{4,6}$/.test(code.replace(/\s/g, ''));
    
    // Таймер для кнопки повторной отправки
    const INITIAL_TIME = 60;
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            setIsActive(true);
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const secs = seconds % 60;
        return `${secs} секунд`;
    };

    const handleResendCode = () => {
        if (isActive) {
            console.log("Код запрошен повторно!");
            // Сброс таймера
            setIsActive(false);
            setTimeLeft(INITIAL_TIME);
            // Здесь можно добавить логику повторной отправки SMS
        }
    };

    const handleLogin = () => {
        if (isCodeValid) {
            // ← КЛЮЧЕВОЙ МОМЕНТ: сохраняем телефон в localStorage
            UserStorage.set({ 
                phone: phone,
                isAuthenticated: true 
            });
            
            // Переход на главную страницу
            navigate(`/home`);
        }
    };

    return (
        <div className="step-content">
            <p>Введите проверочный код для входа в личный кабинет</p>
            
            {/* Поле телефона: предзаполнено и заблокировано */}
            <InputDiv 
                placeholder="Телефон" 
                value={phone}
                readOnly={true}
                disabled={true}
                style={{ 
                    maxWidth: '305px', 
                    marginTop: '-10px',
                    opacity: 0.7,
                    cursor: 'not-allowed'
                }}
            />
            
            {/* Поле проверочного кода */}
            <InputDiv 
                placeholder="Проверочный код" 
                value={code}
                onChange={(e) => {
                    // Разрешаем только цифры и пробелы
                    const raw = e.target.value.replace(/[^\d\s]/g, '');
                    setCode(raw);
                }}
                maxLength={6}
                style={{ 
                    maxWidth: '305px', 
                    marginTop: '-10px',
                }}
            />
            
            <Button 
                onClick={handleLogin} 
                className={`step-content__button ${!isCodeValid ? 'disabled' : ''}`}
                disabled={!isCodeValid}
            >
                Войти
            </Button>
            
            {/* Кнопка повторной отправки кода */}
            <button
                className={`step-contetn__code ${isActive ? 'active' : 'inactive'}`}
                disabled={!isActive}
                onClick={handleResendCode}
            >
                {isActive
                    ? "Запросить код ещё раз"
                    : `Запросить код повторно можно через ${formatTime(timeLeft)}`}
            </button>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT: Authorization
// ─────────────────────────────────────────────────────────────
export default function Authorization() {
    const [currentStep, setCurrentStep] = useState(1);
    const [userPhone, setUserPhone] = useState('');

    const handleNext = () => {
        if (currentStep < 2) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePhoneSubmit = (phone) => {
        setUserPhone(phone); // Сохраняем в состоянии для передачи в Step2
    };

    return(
        <main>
            <h3>Авторизация</h3>

            <div className="step-container">
                {currentStep === 1 && (
                    <Step1 
                        onNext={handleNext} 
                        onPhoneSubmit={handlePhoneSubmit} 
                    />
                )}
                {currentStep === 2 && (
                    <Step2 
                        onNext={handleNext} 
                        phone={userPhone}
                    />
                )}
            </div>
        </main>
    )
}