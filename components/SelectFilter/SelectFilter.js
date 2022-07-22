import React, { useState, useEffect, useRef } from 'react';
import styles from './selectfilter.module.scss';

const SelectFilter = ({ brands, filterState, setFilterState }) => {
  const [isActive, setIsActive] = useState(false);
  const isListActiveClass = isActive ? '' : styles.disabled;
  const isCheckMarkActiveClass = isActive ? '' : styles.arrowDown;

  const filterRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => filterRef.current.contains(e.target) || setIsActive(false);
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const selectedFilters = filterState;

  const onCheckboxChange = (checked, brand) => {
    if (checked) {
      if (!selectedFilters.includes(brand)) {
        selectedFilters = [...selectedFilters, brand];
        setFilterState(() => selectedFilters);
      }
    } else {
      if (selectedFilters.includes(brand)) {
        selectedFilters = selectedFilters.filter((item) => item !== brand);
        setFilterState(selectedFilters);
      }
    }
  };

  return (
    <section ref={filterRef} className={styles.container}>
      <div onClick={() => setIsActive((prev) => !prev)} className={styles.filterTitleRow}>
        <h3 className={styles.title}>Марка</h3>
        <span className={`${styles.checkMark} ${isCheckMarkActiveClass}`}>‹</span>
      </div>
      <ul className={`${styles.filterList} ${isListActiveClass}`}>
        {brands.map((brand) => (
          <li key={brand} className={styles.filterItem}>
            <input
              type="checkbox"
              id={brand}
              name={brand}
              onChange={(e) => onCheckboxChange(e.target.checked, brand)}
            />
            <label className={styles.filterItemTitle} htmlFor={brand}>
              {brand}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SelectFilter;
