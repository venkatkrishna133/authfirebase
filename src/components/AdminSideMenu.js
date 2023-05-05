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
  
  function AsideMenu() {
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
          className="SideMenuVertical" style={{fontSize:16,borderColor: 'red'}}
          mode="vertical"
          onClick={(item) => {
            //item.key
            navigate(item.key);
          }}
          selectedKeys={[selectedKeys]}
          items={[
            {
              label: "Dashbord",
              icon: <AppstoreOutlined />,
              key: `/adminDashboard?email=${email}`,
            },
            {
              label: "Bill Entry",
              key: `/adminBill?email=${email}`,
              icon: <ShopOutlined />,
            },
            {
              label: "Transactions",
              key: `/adminTransactions?email=${email}`,
              icon: <ShoppingCartOutlined />,
            },
            {
              label: "Requests",
              key: `/adminRequests?email=${email}`,
              icon: <BellFilled />,
            },
            {
              label: "EditProfile",
              key: `/adminEditProfile?email=${email}`,
              icon: <EditFilled />,
            },
            {
              label: "UserControl",
              key: `/adminUsersControl?email=${email}`,
              icon: <EditFilled />,
            },
            {
              label: "RewardConfig",
              key: `/adminRewardConfig?email=${email}`,
              icon: <EditFilled />,
            },
            
          ]}
        ></Menu>
      </div>
    );
  }
  export default AsideMenu;
  