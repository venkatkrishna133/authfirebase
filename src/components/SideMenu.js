import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  BellFilled,
  SnippetsFilled,
  EditFilled,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");
  
  const email = new URLSearchParams(location.search).get("email");


  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical" style={{borderColor: '#A580FF'}}
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",
            icon: <AppstoreOutlined  style={{color: '#A580FF'}}    />,
            key: `/userDashboard?email=${email}`,
          },
          {
            label: "Bill Entry",
            key: `/bill?email=${email}`,
            icon: <ShopOutlined  style={{color: '#A580FF'}} />,
          },
          {
            label: "Transactions",
            key: `/transactions?email=${email}`,
            icon: <ShoppingCartOutlined  style={{color: '#A580FF'}} />,
          },
          {
            label: "Requests",
            key: `/requests?email=${email}`,
            icon: <BellFilled  style={{color: '#A580FF'}} />,
          },
          {
            label: "EditProfile",
            key: `/editProfile?email=${email}`,
            icon: <EditFilled  style={{color: '#A580FF'}} />,
          },
          
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;