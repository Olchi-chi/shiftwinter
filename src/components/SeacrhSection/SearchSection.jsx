import CalendarIcon from '../Icons/CalendarIcon.jsx'
import InputDiv from '../InputDiv/InputDiv'
import Button from '../Button/Button'
import FilterIcon from '../Icons/FilterIcon.jsx'
import './SearchSection.css';
export default function SearchSection(){
    return(
        <section className="search-section">
            <InputDiv 
            label="Поиск"
            placeholder ="Поиск"/>
            <InputDiv 
            label="Даты аренды"
            placeholder ="10 - 24 апреля 2025 (14 дней)"
            svgIcon={<CalendarIcon/>}/>
            <Button variant="filter">
               < FilterIcon/>
               <span>Фильтры</span>
            </Button>
        </section>
    )
}