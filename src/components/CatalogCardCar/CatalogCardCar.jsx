// import './CatalogCardCar.css';

const API_BASE_URL = 'https://shift-intensive.ru/api/';

export default function CatalogCardCar({ car }) {
  // Находим обложку из массива медиа и добавляем базовый URL
  const coverImageUrl = car.media?.find(item => item.isCover)?.url || car.media?.[0]?.url || '';
  const coverImage = coverImageUrl ? `${API_BASE_URL}${coverImageUrl}` : '';

  // Преобразуем тип трансмиссии для отображения
  const transmissionText = car.transmission === 'automatic' ? 'Автомат' : 'Механика';

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
        <h3 className="catalog-card__title">
          {car.brand} {car.name}
        </h3>
        
        <div className="catalog-card__details">
          <div className="catalog-card__detail">
            <span className="catalog-card__detail-value">{transmissionText}, 2.5л </span>
          </div>
          
          <div className="catalog-card__detail">
            <span className="catalog-card__detail-value catalog-card__price">
              {car.price.toLocaleString('ru-RU')} ₽
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}