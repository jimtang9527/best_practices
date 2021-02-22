import './Item.css';
import { Option } from './MultiCheck';
import React from 'react';

/** 
 * @param {Option} option - option
 * @param {Function} onChange - when checked options are changed,
 *                              they should be passed to outside
 */
type Props = {
    option: Option,
    onChange: (option: Option) => void,
}
const Item: React.FunctionComponent<Props> = ({ option, onChange }): JSX.Element => {
    function onRowChange(e: React.ChangeEvent<HTMLInputElement>) {
        option.checked = e.target.checked;
        onChange(option);
    }
    return (
        <div className='Row'>
            <input id={option.value} type='checkbox' checked={option.checked} onChange={onRowChange} />
            <label htmlFor={option.value}>{option.label}</label>
        </div>
    )
}

export default Item;
