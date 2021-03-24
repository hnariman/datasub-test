import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';

import { CreatePayment } from './components/CreatePayment';
import { PaymentsList } from './components/PaymentsList'



const { Header, Content, Sider } = Layout;
function App() {

  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <h1 style={{ color: "white" }}>
          Test Project : hnariman@gmail.com
        </h1>
      </Header>

      <Layout>
        <Sider  >
          <Menu mode="inline" theme="dark">
            <Menu.Item>
              <Link to="/payments">All Payments</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/payment">New Payment</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Content style={{ padding: "2rem" }}>
          <Switch>
            <Route exact path="/payments" component={PaymentsList} />
            <Route exact path="/payment" component={CreatePayment} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
export default App;
