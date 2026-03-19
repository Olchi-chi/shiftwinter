// utils/userStorage.js
export const UserStorage = {
    /**
     * Сохранить данные пользователя в localStorage
     * @param {Object} data - объект с данными { phone: '...', email: '...' }
     */
    set: (data) => {
        Object.entries(data).forEach(([key, value]) => {
            localStorage.setItem(`user_${key}`, JSON.stringify(value));
        });
    },
    
    /**
     * Получить данные пользователя из localStorage
     * @param {string} key - ключ данных (phone, email, etc.)
     * @returns {*} - сохранённое значение или null
     */
    get: (key) => {
        const item = localStorage.getItem(`user_${key}`);
        return item ? JSON.parse(item) : null;
    },
    
    /**
     * Удалить все данные пользователя (при выходе)
     */
    clear: () => {
        Object.keys(localStorage)
            .filter(key => key.startsWith('user_'))
            .forEach(key => localStorage.removeItem(key));
    },
    
    /**
     * Проверить, авторизован ли пользователь
     * @returns {boolean}
     */
    isAuthenticated: () => {
        return localStorage.getItem('user_isAuthenticated') === 'true';
    }
};