import './MultiCheck.css';

import React from 'react';
import Label from './Label';
import List from './List';
import CheckAll from './CheckAll';
export type Option = {
  label: string,
  value: string,
  checked?: boolean
}
/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */
type Props = {
  label?: string,
  options: Option[],
  columns?: number,
  values?: string[],
  onChange?: (options: Option[]) => void,
}

const MultiCheck: React.FunctionComponent<Props> = ({ options, columns, label, values, onChange }): JSX.Element => {
  //default columns
  const numColumns = columns || 1;
  /** 
   * checked/unchecked all
   * @param checked
   */
  function onCheckAllChange(checked: boolean): void {
    onChangeEvent(checked ? options : []);
  }
  /**
   * checked/unchecked item 
   * @param option 
   */
  function onItemChange(item: Option): void {
    const selectedItems = options.filter((option) => {
      if (option.value === item.value) {
        return item.checked;
      } else {
        return option.checked;
      }
    })
    onChangeEvent(selectedItems);
  }
  /**
   * handle event
   * @param options 
   */
  function onChangeEvent(options: Option[]) {
    let data: Option[] = [];
    options.map((option: Option) => { data.push({ label: option.label, value: option.value }); })
    onChange && onChange!(data);
  }
  /**
   * allocate seeds
   * @param columns
   * @param seeds 
   */
  function allocateSeeds(columns: number, seeds: number): number[] {
    let arrangements: number[] = [];
    //first round
    arrangements[0] = 0;
    for (let i = 1; i < columns; i++) {
      arrangements[i] = 1;
      seeds--;
      if (seeds === 0) return arrangements;
    }
    //second round
    const step = Math.ceil(seeds / columns);
    for (let i = 0; i < columns; i++) {
      arrangements[i] += step;
      seeds -= step;
      if (seeds <= 0) {
        break;
      }
    }
    return arrangements;
  }
  /**
   * group options
   */
  function chunk(): Option[][] {
    /**
     * set the checked value of option 
     * @param option 
     */
    function setChecked(option: Option) {
      const value = values?.find(value => value === option.value);
      option.checked = value ? true : false;
    }
    options.map(option => setChecked(option));
    //group options
    let data: Option[][] = [];
    const seeds: number[] = allocateSeeds(numColumns, options.length);
    let start = 0;
    for (let i = 0; i < seeds.length; i++) {
      const end = start + seeds[i];
      const subOptions = options.slice(start, end);
      data.push(subOptions);
      start = end;
    }
    return data;
  }
  const data = chunk();
  const checkAll = options.length === values?.length;
  return (
    <div className='MultiCheck'>
      {label !== undefined &&
        <div className='LabelBar'>
          <Label label={label} />
        </div>
      }
      <div className='Columns'>
        {data.map((subOptions, index) => {
          return (
            <div key={index} className='Column' >
              {index === 0 && <CheckAll checked={checkAll} onChange={onCheckAllChange} />}
              <List options={subOptions} onChange={onItemChange} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default MultiCheck;
