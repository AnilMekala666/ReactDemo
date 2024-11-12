// third-party
import { FormattedMessage } from 'react-intl';

// assets
import LineChartOutlined from '@ant-design/icons/LineChartOutlined';
import IdcardOutlined from '@ant-design/icons/IdcardOutlined';
import DatabaseOutlined from '@ant-design/icons/DatabaseOutlined';
import { Mail } from '@mui/icons-material';

// type

// icons
const icons = { LineChartOutlined, IdcardOutlined, DatabaseOutlined, Mail };

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const widget = {
  id: 'group-widget',
  title: <FormattedMessage id="Widgets" />,
  icon: icons.IdcardOutlined,
  type: 'group',
  children: [
    // {
    //   id: 'statistics',
    //   title: <FormattedMessage id="statistics" />,
    //   type: 'item',
    //   url: '/widget/statistics',
    //   icon: icons.IdcardOutlined
    // },
    {
      id: 'data',
      // title: <FormattedMessage id="data" />,
      type: 'item',
      url: '/cognito/mindpath',
      icon: icons.DatabaseOutlined
    },
    {
      id: 'Correspondance',
      title: <FormattedMessage id="Correspondance" />,
      type: 'item',
      url: '/correspndence/dashboard',
      icon: icons.Mail
    }
    // {
    //   id: 'chart',
    //   title: <FormattedMessage id="chart" />,
    //   type: 'item',
    //   url: '/widget/chart',
    //   icon: icons.LineChartOutlined
    // }
  ]
};

export default widget;
