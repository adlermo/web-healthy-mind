// import mealsImage from '../../assets/meals.jpeg'
import classes from './Header.module.css'

const Header = () => {
  return <>
    <header className={classes.header}>
      <h1>Ikigai Sushi</h1>
    </header>
    <div className={classes['main-image']}>
      {/* <img src={mealsImage} alt={'A table with food.'}/> */}
    </div>
  </>
};

export default Header;