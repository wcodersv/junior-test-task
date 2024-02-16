import React from 'react';
import styles from './ModalFilters.module.scss';

const ModalFilters = ({
    handleOpenFilter,
    handleFilterSearch,
    filters,
    setFilters,

}) => {
    const handleChange = (e, field) => {
        setFilters({ ...filters, [field]: e.target.value });
    };


    const dataForm = [
        {
            title: 'Min price:',
            typeInput: 'number',
            id: 'minPrice',
        },
        {
            title: 'Max price:',
            typeInput: 'number',
            id: 'maxPrice',
        },
        {
            title: 'City:',
            typeInput: 'text',
            id: 'city',
        },
        {
            title: 'District:',
            typeInput: 'text',
            id: 'district',
        },
        {
            title: 'Search:',
            typeInput: 'text',
            id: 'search',
        },
    ]

    return (
        <div className={styles.overlay}>
            <form className={styles.container} onSubmit={handleFilterSearch}>
                <div className={styles.container_button}>
                    <button type="button" onClick={handleOpenFilter} className='button-custom'>×</button>
                </div>

                <div className={styles.container_filters}>
                    {dataForm.map(data => (
                        <label className='label-custom' htmlFor={data.id} key={`${data.title}-${data.id}`}>
                            {data.title}
                            <input
                                className='input-custom'
                                type={data.typeInput}
                                value={filters[data.id]}
                                id={data.id}
                                onChange={(e) => handleChange(e, `${data.id}`)}
                            />
                        </label>
                    ))}

                    <button className='button-custom' type="submit">Apply filters</button>
                </div>
            </form>
        </div>
    )
}

export default ModalFilters;