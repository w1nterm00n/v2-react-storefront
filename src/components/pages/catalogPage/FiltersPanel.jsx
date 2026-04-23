import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiSortAlt2 } from 'react-icons/bi';
import styles from './catalogPage.module.scss';

const FiltersPanel = ({ onSortMin, onSortMax, sortLabel }) => {
    return (
        <nav className={styles.filters_panel_wrapper}>

          <Dropdown className={styles.dropdown_container}>
            <Dropdown.Toggle variant="none" className="d-flex align-items-center gap-2 text-dark" style={{border: "none"}}>
            <BiSortAlt2 />
            {sortLabel}
            </Dropdown.Toggle >

            <Dropdown.Menu className="bg-white shadow border">
              <Dropdown.Item onClick={onSortMin}>Price: low to high</Dropdown.Item>
              <Dropdown.Item onClick={onSortMax}>Price: high to low</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </nav>
      );
};

export default FiltersPanel;
