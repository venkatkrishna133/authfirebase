import { BellFilled, MailOutlined, LogoutOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../API/data";
import login from "../pages/Login";
import { useLocation } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  return (
    <div className="AppHeader">
      
      <h3 style={{justifyContent:'center',textAlign:'center',marginLeft:525}}>Loyalty Reward Application</h3>
      <div style={{display:'flex'}}>
        
      <h5 style={{marginRight:10}}>{email}</h5>
      <Space>
        <Badge>
          <LogoutOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              handleLogout(); // Invoke the handleLogout function
            }}
          />
        </Badge>
      </Space>
      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        ></List>
      </Drawer>
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text>{" "}
                has been ordered!
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
      </div>
    </div>
  );
}
export default AppHeader;
