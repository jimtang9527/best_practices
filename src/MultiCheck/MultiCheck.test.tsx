import MultiCheck, { Option } from './MultiCheck';
import { expect } from 'chai';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
Enzyme.configure({ adapter: new Adapter() });
describe('MultiCheck', () => {
  describe('initialize', () => {
    const options: Option[] = [
      { label: 'aaa', value: '111', },
      { label: 'bbb', value: '222', },
      { label: 'ccc', value: '333', },
      { label: 'ddd', value: '444', },
      { label: 'eee', value: '555', },
      { label: 'fff', value: '666', },
      { label: 'ggg', value: '777', },
      { label: 'hhh', value: '888', },
      { label: 'iii', value: '999', },
    ];

    it('renders the label if label provided', () => {
      const columns = 2;
      const label = 'my-multi-check';
      let values: string[] = [
        '333',
        '555'
      ];
      function onSelectedOptionsChange(options: Option[]): void {
        values = options.map(option => option.value);
      }
      let wrapper = mount(<MultiCheck label={label} options={options} values={values} columns={columns} onChange={onSelectedOptionsChange} />);

      expect(wrapper.find('Label').text()).equal(label);
      wrapper = mount(<MultiCheck options={options} values={values} columns={columns} onChange={onSelectedOptionsChange} />);
      expect(wrapper.find('Label').exists()).equal(false);
      wrapper = mount(<MultiCheck options={options} />);
      expect(wrapper.find('List').find('[type="checkbox"][checked=false]').length).equal(options.length);
      wrapper = mount(<MultiCheck options={options} columns={10} />);
      expect(wrapper.find('List').find('[type="checkbox"][checked=false]').length).equal(options.length);
    });
    it('renders options if select all', () => {
      const columns = 2;
      let values: string[] = [
        '333',
        '555'
      ];
      function onSelectedOptionsChange(options: Option[]): void {
        values = options.map(option => option.value);
      }
      let wrapper = mount(<MultiCheck options={options} values={values} columns={columns} onChange={onSelectedOptionsChange} />);

      //Set the select all button to checked
      const node = wrapper.find('[id="selectAll"]');
      node.simulate('change', { target: { checked: true } });
      wrapper = mount(<MultiCheck options={options} values={values} columns={columns} onChange={onSelectedOptionsChange} />);
      const expectValues = options.map(option => option.value);
      expect(values.join(',')).equal(expectValues.join(','));
      expect(wrapper.find('List').find('[type="checkbox"][checked=true]').length).equal(options.length);
    });
    it('renders options if unselect all', () => {
      const columns = 2;
      let values: string[] = [
        '333',
        '555'
      ];
      function onSelectedOptionsChange(options: Option[]): void {
        values = options.map(option => option.value);
      }

      let wrapper = mount(<MultiCheck options={options} values={values} columns={columns} onChange={onSelectedOptionsChange} />);
      let node = wrapper.find('[id="selectAll"]');
      expect(node.prop('checked')).equal(false);
      //Set the select all button to unchecked,all options should be unchecked
      node = wrapper.find('[id="selectAll"]');
      node.simulate('change', { target: { checked: false } });
      wrapper = mount(<MultiCheck options={options} values={values} columns={columns} onChange={onSelectedOptionsChange} />);
      expect(values.length).equal(0);
      expect(wrapper.find('List').find('[type="checkbox"][checked=true]').length).equal(0);
    });
    it('renders option if one option checked', () => {
      const columns = 2;
      //initialize
      let values = [
        '333',
        '555'
      ];
      function onSelectedOptionsChange(options: Option[]): void {
        values = options.map(option => option.value);
      }
      let wrapper = mount(<MultiCheck options={options} values={values} columns={columns} onChange={onSelectedOptionsChange} />);
      const node = wrapper.find('[id="333"]');
      expect(node.prop('checked')).equal(true);
    });
    it('renders option if one option unchecked', () => {
      const columns = 2;
      //initialize
      let values = [
        '333',
        '555'
      ];
      function onSelectedOptionsChange(options: Option[]): void {
        values = options.map(option => option.value);
      }
      let wrapper = mount(<MultiCheck options={options} values={values} columns={columns} onChange={onSelectedOptionsChange} />);
      const node = wrapper.find('[id="333"]');
      node.simulate('change', { target: { checked: false } });
      wrapper = mount(<MultiCheck options={options} values={values} columns={columns} onChange={onSelectedOptionsChange} />);
      expect(wrapper.find('[id="333"]').prop('checked')).equal(false);
      expect(values.join(',')).equal('555');
    });
    it('renders options after all options checked', () => {
      const columns = 2;
      //initialize
      let values = [
        '333',
        '555'
      ];
      function onSelectedOptionsChange(options: Option[]): void {
        values = options.map(option => option.value);
      }
      let wrapper = mount(<MultiCheck options={options} values={values} columns={columns} onChange={onSelectedOptionsChange} />);
      wrapper.find('List').find('[type="checkbox"]').forEach((node) => {
        node.simulate('change', { target: { checked: true } });
      })
      wrapper = mount(<MultiCheck options={options} values={values} columns={columns} onChange={onSelectedOptionsChange} />);
      const expectValues = options.map(option => option.value);
      expect(values.join(',')).equal(expectValues.join(','));
      expect(wrapper.find('[id="selectAll"]').prop('checked')).equal(true);
    });
    it('renders n columns', () => {
      const columns = 2;
      //initialize
      let values = [
        '333',
        '555'
      ];
      /**
       * test arrangements
       * @param arrangements 
       */
      function testArrangements(arrangements: number[]) {
        const wrapper = mount(<MultiCheck options={options} values={values} columns={arrangements.length} />);
        expect(wrapper.find('List').length).equal(arrangements.length);
        for (let i = 0; i < arrangements.length; i++) {
          const list = wrapper.find('List').at(i).find('[type="checkbox"]');
          expect(list.length).equal(arrangements[i]);
        }
      }
      //1 columns
      testArrangements([9]);
      //2 columns
      testArrangements([4, 5]);
      //3 columns
      testArrangements([3, 4, 2]);
      //4 columns
      testArrangements([2, 3, 3, 1]);
      //5 columns
      testArrangements([1, 2, 2, 2, 2]);
      //6 columns
      testArrangements([1, 2, 2, 2, 1, 1]);
      //7 columns
      testArrangements([1, 2, 2, 1, 1, 1, 1]);
      //8 columns
      testArrangements([1, 2, 1, 1, 1, 1, 1, 1]);
      //9 columns
      testArrangements([1, 1, 1, 1, 1, 1, 1, 1, 1]);
      //10 columns
      testArrangements([0, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    });
  });
});
