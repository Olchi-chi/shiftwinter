import './CatalogCardCar.css';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

const API_BASE_URL = 'https://shift-intensive.ru/api/';

export default function CatalogCardCar({ car }) {
  const navigate = useNavigate();
  const coverImageUrl = car.media?.find(item => item.isCover)?.url || car.media?.[0]?.url || '';
  const coverImage = coverImageUrl ? `${API_BASE_URL}${coverImageUrl}` : '';

  const transmissionText = car.transmission === 'automatic' ? 'Автомат' : 'Механика';
   const handleSelect = () => {
    console.log('Кнопка нажата! ID:', car.id); // Отладка
    console.log('navigate:', navigate);
    navigate(`/car/${car.id}`);
  };

  return (
    <div className="catalog-card">
      <div className="catalog-card__image-wrapper">
        <img 
          src={coverImage} 
          alt={`${car.brand} ${car.name}`} 
          className="catalog-card__image"
        />
      </div>
      
      <div className="catalog-card__info">
          <h3>
            {car.name} 
          </h3>
          <span>{transmissionText}, 2.5л </span>
      </div>
      <div className="catalog-card__prices">
          <h3>
            {car.price.toLocaleString('ru-RU')} ₽
          </h3>
          <span className="catalog-card__fourteen">{(car.price*14).toLocaleString('ru-RU')} ₽ за 14 дней</span>
      </div>
      <Button variant="catalog" onClick={handleSelect}>
        Выбрать
      </Button>
    </div>
  );
}