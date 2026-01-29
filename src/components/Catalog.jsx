import { useState, useEffect } from 'react';
import CatalogCardCar from './CatalogCardCar/CatalogCardCar';
// import './Catalog.css';

export default function Catalog() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://shift-intensive.ru/api/cars/info') // замените на ваш реальный URL
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка сети');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          setCars(data.data);
        } else {
          throw new Error(data.reason || 'Неизвестная ошибка');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="catalog-loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="catalog-error">Ошибка: {error}</div>;
  }

  return (
    <div className="catalog">
      <h1 className="catalog-title">Каталог автомобилей</h1>
      
      <div className="catalog-grid">
        {cars.map(car => (
          <CatalogCardCar key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}