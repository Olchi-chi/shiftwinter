import './Profile.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import InputDiv from '../../components/InputDiv/InputDiv'
import { UserStorage } from '../../utils/userStorage';

export default function Profile() {
    const navigate = useNavigate();
    
    // ← Список обязательных полей (включая phone)
    const requiredFields = ['surname', 'name', 'patronymic', 'phone'];
    
    const [formData, setFormData] = useState({
        surname: '',
        name: '',
        patronymic: '',
        phone: '',
        email: '',
        city: 'г. Томск'
    });

    // ← Состояние для ошибок валидации
    const [errors, setErrors] = useState({});

    // Данные для отображения полей
    const infoData = [
        { label: 'Фамилия*', placeholder: 'Фамилия', field: 'surname' },
        { label: 'Имя*', placeholder: 'Имя', field: 'name' },
        { label: 'Отчество*', placeholder: 'Отчество', field: 'patronymic' },
        // ← Телефон теперь редактируемый (убрали readOnly: true)
        { label: 'Телефон*', placeholder: '+7 (___) ___-__-__', field: 'phone' },
        { label: 'Email', placeholder: 'Email', field: 'email' },
        { label: 'Город', placeholder: 'г. Томск', field: 'city' },
    ];

    // Загружаем данные при монтировании
    useEffect(() => {
        const savedData = {
            surname: UserStorage.get('surname'),
            name: UserStorage.get('name'),
            patronymic: UserStorage.get('patronymic'),
            phone: UserStorage.get('phone'),
            email: UserStorage.get('email'),
            city: UserStorage.get('city')
        };
        
        setFormData(prev => ({
            ...prev,
            ...Object.fromEntries(
                Object.entries(savedData).filter(([_, value]) => value !== null)
            )
        }));
    }, []);

    const handleChange = (field) => (e) => {
        let value = e.target.value;
        
        // ← Опционально: разрешаем только цифры, пробелы, +, -, (, ) для телефона
        if (field === 'phone') {
            value = value.replace(/[^\d\s\+\-\(\)]/g, '');
        }
        
        // Обновляем значение поля
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        // ← Если поле было с ошибкой и теперь заполнено — убираем ошибку
        if (errors[field] && value.trim()) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    // ← Функция валидации формы
    const validateForm = () => {
        const newErrors = {};
        
        // Проверка обязательных полей
        requiredFields.forEach(field => {
            const value = formData[field];
            if (!value || !value.trim()) {
                const fieldLabel = infoData.find(item => item.field === field)?.label.replace('*', '') || field;
                newErrors[field] = `Поле "${fieldLabel}" обязательно для заполнения`;
            }
        });
        
        // ← Валидация телефона: минимум 10 цифр
        if (formData.phone) {
            const digitsOnly = formData.phone.replace(/\D/g, '');
            if (digitsOnly.length < 10) {
                newErrors.phone = 'Введите корректный номер телефона (минимум 10 цифр)';
            }
        }
        
        // ← Валидация email, если поле заполнено
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Введите корректный Email';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ← Сохранение данных с валидацией
    const handleSave = () => {
        if (!validateForm()) {
            return;
        }
        
        // Сохраняем только заполненные поля
        const dataToSave = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value?.trim() !== '')
        );
        
        UserStorage.set(dataToSave);
        console.log('Данные сохранены:', dataToSave);
        alert('✅ Данные успешно обновлены!');
    };

    // ← Выход из аккаунта
    const handleLogout = () => {
        UserStorage.clear();
        navigate('/auth');
    };

    return(
        <main>
            <h3>Профиль</h3>

            <ul className="profile__data">
                {infoData.map((item) => (
                    <li key={item.field} className="profile__input">
                        <InputDiv 
                            label={item.label}
                            placeholder={item.placeholder}
                            value={formData[item.field]}
                            onChange={handleChange(item.field)}
                            // ← Убрали readOnly для телефона
                            readOnly={item.field === 'city'}
                            // ← Передаём ошибку для визуальной подсветки
                            error={errors[item.field]}
                            style={{ width: '348px' }}
                        />
                        {/* ← Отображение текста ошибки под полем */}
                        {errors[item.field] && (
                            <span className="input-error-text">{errors[item.field]}</span>
                        )}
                    </li>
                ))}
            </ul>
            
            <div className="profile__buttons">
                <Button 
                    onClick={handleLogout} 
                    className='button_brone-back' 
                    style={{ paddingLeft: '43px', paddingRight: '43px' }}
                >
                    Выйти
                </Button>
                
                <Button 
                    onClick={handleSave} 
                    className="secondary" 
                    style={{ paddingLeft: '32px', paddingRight: '32px' }}
                >
                    Обновить данные
                </Button>
            </div>
       </main>
    )
}