import HeaderButton from '../../components/HeaderButton/HeaderButton.jsx';
import MainImage from '../../assets/main.png';
import Image1 from '../../assets/Image-1.png';
import Image2 from '../../assets/Image-2.png';
import Image3 from '../../assets/Image-3.png';
import Button from '../../components/Button/Button.jsx';
import './CarDetail.css';
import { useNavigate } from 'react-router-dom';


export default function CarDetail() {
    const carImage = [
    { label: 'car1', img: Image1 },
    { label: 'car2', img: Image2 },
    { label: 'car3', img: Image3 }
  ];

    const carData = [
    { label: 'Коробка передач', value: 'Автоматическая' },
    { label: 'Руль', value: 'Левый' },
    { label: 'Тип кузова', value: 'Кроссовер' },
    { label: 'Цвет', value: 'Белый' }
  ];

  const navigate = useNavigate();
  const handleSelect = () => {
    navigate(`/home`);
  };

    return(
        <main>
            <HeaderButton iconID="back" style={{gap: '4px',color:'#97A1AF'}} onClick={handleSelect}>Назад</HeaderButton>
            <section className="information">
                <div className="information__pictures">
                    <img src={MainImage} alt="Car" className="information__main-image" />
                    <div className="information__image-row">
                        {carImage.map((item, index) => (
                                <img key={index} src={item.img} alt={item.label} className="information__image" />
                        ))}
                    </div>
                    
                </div>
                <div className="information__text">
                    <h1>Chery Arrizo 8</h1>
                    <div className="information__text-block">
                        <h2>Характеристики</h2>
                        <div className="information__car-list">
                            {carData.map((item, index) => (
                                <div key={index} className="information__data-row">
                                    <span>{item.label}</span>
                                    <span>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="information__text-block">
                        <h2>Стоимость</h2>
                        <div className="information__data-row">
                            <span>Аренда на 7 дней</span>
                            <span>1 апреля - 8 апреля</span>
                        </div>
                        <div className="information__data-row price">
                            <span>Итого</span>
                            <span>15 000 ₽</span>
                        </div>
                    </div>
                </div>

            </section>
            <section className="brone-buttons">
                <Button className='button_brone-back' onClick={handleSelect}>Назад</Button>
                <Button className='button_brone'>Забронировать</Button>
            </section>
       </main>
    )

}