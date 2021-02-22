import './Label.css';

import React from 'react';
/** 
 * @param {string} label  - label
 */
type Props = {
    label: string
}
const Label: React.FunctionComponent<Props> = ({ label }): JSX.Element => {
    return (
        <div className='Label'>{label}</div>
    )
}
export default Label;