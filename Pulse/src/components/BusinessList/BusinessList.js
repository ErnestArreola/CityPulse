import { Card, List, Avatar, Icon, Tag, Progress, Row } from 'antd';
import { Link } from "react-router-dom";
import logo from '../../assets/yelp.png'
import defaultImage from "../../assets/no_image.png"
import styles from "./BusinessList.less";
import React from "react";


const listData = [];

function me (score) {
  if (score == 0){
    return "#ef0a02"
  }
  else if(score == 1){
    return "#f7cc0c"
  }
  else if(score == 2) {
    return "#65e006"
  }
}

function formatScore(score){
  let format_score = ['UNSATISFACTORY', 'ACCEPTABLE', 'SATISFACTORY'];
  return format_score[score];
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
const BusinessList = (props)  => {

  console.log(props.data);
  return(
    <List
      rowKey = "id"
      itemLayout="vertical"
      size="small"
      // grid={{ gutter: 24, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}


    //  grid={{ gutter: 0, column: 1 }}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={props.data}
      renderItem={item => (
        <List.Item>

          <Card
            className={styles.card}
            hoverable
            cover={<img height="200" width="200" src={item.business.yelp == null? defaultImage : item.business.yelp.image_url} />}
            actions={[<Tag color={me(item.score)}> {formatScore(item.score)} </Tag>]}
          >
          <Card.Meta
            title={<Link to= {{
              pathname: '/dashboard/advancedprofile',
              state: {
                licenseNum: item.business.license_num
              }
            }}>
              {item.business.dba_name === ""? item.business.name : item.business.dba_name}
            </Link>
            }

            description={<b>Category: {item.business.business_type}</b>}
          />
          {/*{item.score}*/}
          {/*{item.status}*/}
          </Card>
        </List.Item>
      )}
    />
  );
};

export default BusinessList;