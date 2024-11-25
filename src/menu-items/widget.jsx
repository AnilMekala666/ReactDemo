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
      id: 'Dashboard',
      title: <FormattedMessage id="Dashboard" />,
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DatabaseOutlined
    },
    {
      id: 'iCAN-RCM',
      title: <FormattedMessage id="iCAN-RCM" />,
      type: 'item',
      url: '/patient/payment',
      icon: icons.DatabaseOutlined
    },
    {
      id: 'iCAN-CDA',
      title: <FormattedMessage id="iCAN-CDA" />,
      type: 'item',
      url: '/correspndence/dashboard',
      icon: icons.Mail
    },
    {
      id: 'qa',
      title: <FormattedMessage id="QA" />,
      type: 'item',
      url: '/patient/mindpath',
      icon: icons.LineChartOutlined
    },
    {
      id: 'kpi',
      title: <FormattedMessage id="KPIs" />,
      type: 'item',
      url: '/kpi/dashboard',
      icon: icons.DatabaseOutlined
    }
  ]
};

export default widget;
