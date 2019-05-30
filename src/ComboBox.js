import React from 'react';
import Autocomplete from 'react-autocomplete';

const menuStyle = {
  borderRadius: '3px',
  border: '1px solid #aaa',
  boxShadow: '1px 3px 3px #999',
  background: '#ddd',
  zIndex: 5,
  padding: '2px 0',
  fontSize: '90%',
  position: 'fixed',
  overflow: 'auto',
  maxHeight: '50%'
};

const ComboBox = ({ data, id, value, setValue }) => (
  <Autocomplete
    value={value}
    inputProps={{
      id,
      type: 'text',
      className: 'u-full-width'
    }}
    getItemValue={item => item}
    items={data}
    menuStyle={menuStyle}
    renderItem={(item, isHighlighted) => (
      <div key={item} style={{ background: isHighlighted ? '#aaa' : '#fff' }}>
        {item}
      </div>
    )}
    onChange={e => setValue(e.target.value)}
    onSelect={value => setValue(value)}
    shouldItemRender={(item, value) =>
      item.toLowerCase().indexOf(value.toLowerCase()) > -1
    }
  />
);

export default ComboBox;
