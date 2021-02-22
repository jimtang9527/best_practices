import './CheckAll.css';

import React from 'react';
/** 
 * @param {boolean} checked  - checked
 * @param {Function} onChange - when checked options are changed,
 *                              they should be passed to outside
 */
type Props = {
    checked: boolean;
    onChange: (checked: boolean) => void,
}
const CheckAll: React.FunctionComponent<Props> = ({ checked, onChange }): JSX.Element => {
    function onSelectAllChange(e: React.ChangeEvent<HTMLInputElement>): void {
        onChange(e.target.checked);
    }
    return (
        <div className='CheckAll'>
            <input id='selectAll' type='checkbox' checked={checked} onChange={onSelectAllChange} />
            <label htmlFor='selectAll'>Select All</label>
        </div>
    )
}

export default CheckAll;