import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card

function Cards() {
  return (
    <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <EditOutlined key="edit" />,
      <DeleteOutlined key="delete" />
    ]}
  >
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title="Card title"
      description="This is the description"
    />
  </Card>
  )
}

export default Cards