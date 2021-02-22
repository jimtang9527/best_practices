import './List.css'
import React from 'react';
import Item from './Item';
import { Option } from './MultiCheck';

/** 
 * @param {Option[]} options -  options
 * @param {Function} onChange - when checked options are changed,
 *                              they should be passed to outside
 */
type Props = {
    options: Option[],
    onChange: (option: Option) => void
}

const List: React.FunctionComponent<Props> = ({ options, onChange }): JSX.Element => {
    return (
        <div className='List'>
            {options.map((option, index: number) => {
                return (
                    <Item key={index} option={option} onChange={onChange} />
                )
            })}
        </div>
    )
}

export default List;
