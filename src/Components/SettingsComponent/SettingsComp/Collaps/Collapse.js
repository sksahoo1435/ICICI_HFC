import React, { useState } from 'react';
import { Collapse, Switch } from 'antd';
import './Collapse.css';

const CollapseComp = () => {
  const [activeKeys, setActiveKeys] = useState([]);

  const genExtra = (itemKey) => (
    <img
      alt=""
      onClick={() => {
        if (activeKeys.includes(itemKey)) {
          setActiveKeys(activeKeys.filter((key) => key !== itemKey));
        } else {
          setActiveKeys([...activeKeys, itemKey]);
        }
      }}
    />
  );

  const onChangeToggle = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const switchExtra = () => (
    <Switch onChange={onChangeToggle} />
  );

  const items = [
    {
      key: '1',
      label: <div className='labelHeading'>User Settings</div>,
      children: (
        <ul className="ulist">
          <li>
            <button>Add Users</button>
          </li>
          <li>
            <button>Create User</button>
          </li>
          <li>
            <button>Delete Users</button>
          </li>
          <li>
            <button>Modify Users</button>
          </li>
        </ul>
      ),
      extra: genExtra('1'),
      showArrow: true,
    },
    {
      key: '2',
      label: <div className='labelHeading'>Folder Settings </div>,
      children: (
        <ul className="ulist">
          <li>
            <button>Add Folders</button>
          </li>
          <li>
            <button>Create Folders</button>
          </li>
          <li>
            <button>Delete Folders</button>
          </li>
          <li>
            <button>Modify Folders</button>
          </li>
        </ul>
      ),
      extra: genExtra('2'),
      showArrow: true,
    },
    {
      key: '3',
      label: <div className='labelHeading'>Upload/Download</div>,
      extra: genExtra('3'),
      showArrow: true,
    },
    {
      key: '4',
      label: <div className='labelHeading'>Web Analytics</div>,
      extra: switchExtra(),
      showArrow: false,
    },
  ];

  const renderCollapseItems = () => {
    return items.map((item) => (
        <Collapse.Panel
          key={item.key}
          header={
            <div className="labelHeading">
              <div style={{ width: "95%", marginTop: "0.7vh" }}>{item.label}</div>
              <div style={{ backgroundColor: "gray", borderRadius: "2rem",marginBottom:"0.8vh" }}>{item.extra}</div>
            </div>
          }
        >
          {item.children}
        </Collapse.Panel>
    ));
  };

  return (
    <div className="collapseContent">
      <Collapse
        collapsible="icon"
        size="large"
        activeKey={activeKeys}
        onChange={(key) => setActiveKeys(key)}
      >
        {renderCollapseItems()}
      </Collapse>
    </div>
  );
};



export default CollapseComp;
