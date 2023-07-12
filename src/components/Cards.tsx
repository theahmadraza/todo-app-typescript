import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";

const { Meta } = Card;

interface CardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  deleteHandle: (id: string) => void;
}
const Cards: React.FC<CardProps> = ({
  id,
  name,
  description,
  image,
  deleteHandle,
}) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt="example" src={image} />}
      actions={[
        <EditOutlined key="edit" />,
        <DeleteOutlined key="delete" onClick={() => deleteHandle(id)} />,
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
        }
        title={name}
        description={description}
      />
    </Card>
  );
};

export default Cards;
