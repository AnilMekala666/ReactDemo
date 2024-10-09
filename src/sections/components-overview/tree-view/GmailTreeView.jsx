import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';

// project import
import MainCard from 'components/MainCard';

// assets
import MailFilled from '@ant-design/icons/MailFilled';
import DeleteFilled from '@ant-design/icons/DeleteFilled';
import TagFilled from '@ant-design/icons/TagFilled';
import ProfileFilled from '@ant-design/icons/ProfileFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import SnippetsFilled from '@ant-design/icons/SnippetsFilled';
import TagsFilled from '@ant-design/icons/TagsFilled';
import CaretDownFilled from '@ant-design/icons/CaretDownFilled';
import CaretRightFilled from '@ant-design/icons/CaretRightFilled';

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular
    },
    '&:hover': {
      background: theme.palette.action.hover
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      background: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)'
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit'
    }
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2)
    }
  }
}));

function StyledTreeItem({ bgColor, color, labelIcon, labelInfo, labelText, ...other }) {
  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box sx={{ mr: 1, fontSize: '1rem' }}>{labelIcon}</Box>
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{ '--tree-view-color': color, '--tree-view-bg-color': bgColor }}
      {...other}
    />
  );
}

// ==============================|| TREE VIEW - GMAIL ||============================== //

export default function GmailTreeView() {
  const EndIcon = () => {
    return <div style={{ width: 24 }} />;
  };

  const gmailTreeviewCodeString = `// GmailTreeView.tsx
<SimpleTreeView
  aria-label="gmail"
  defaultExpandedItems={['3']}
  slots={{ collapseIcon: CaretDownFilled, expandIcon: CaretRightFilled, endIcon: EndIcon }}
  sx={{ height: 400, flexGrow: 1, overflowY: 'auto' }}
>
  <StyledTreeItem itemId="1" labelText="All Mail" labelIcon={<MailFilled />} />
  <StyledTreeItem itemId="2" labelText="Trash" labelIcon={<DeleteFilled />} />
  <StyledTreeItem itemId="3" labelText="Categories" labelIcon={<TagFilled />}>
    <StyledTreeItem itemId="5" labelText="Social" labelIcon={<ProfileFilled />} labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
    <StyledTreeItem
      itemId="6"
      labelText="Updates"
      labelIcon={<InfoCircleFilled />}
      labelInfo="2,294"
      color="#e3742f"
      bgColor="#fcefe3"
    />
    <StyledTreeItem
      itemId="7"
      labelText="Forums"
      labelIcon={<SnippetsFilled />}
      labelInfo="3,566"
      color="#a250f5"
      bgColor="#f3e8fd"
    />
    <StyledTreeItem itemId="8" labelText="Promotions" labelIcon={<TagsFilled />} labelInfo="733" color="#3c8039" bgColor="#e6f4ea" />
  </StyledTreeItem>
  <StyledTreeItem itemId="4" labelText="History" labelIcon={<TagFilled />} />
</SimpleTreeView>`;

  return (
    <MainCard title="Gmail Clone" codeString={gmailTreeviewCodeString}>
      <SimpleTreeView
        aria-label="gmail"
        defaultExpandedItems={['3']}
        slots={{ collapseIcon: CaretDownFilled, expandIcon: CaretRightFilled, endIcon: EndIcon }}
        sx={{ height: 400, flexGrow: 1, overflowY: 'auto' }}
      >
        <StyledTreeItem itemId="1" labelText="All Mail" labelIcon={<MailFilled />} />
        <StyledTreeItem itemId="2" labelText="Trash" labelIcon={<DeleteFilled />} />
        <StyledTreeItem itemId="3" labelText="Categories" labelIcon={<TagFilled />}>
          <StyledTreeItem itemId="5" labelText="Social" labelIcon={<ProfileFilled />} labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
          <StyledTreeItem
            itemId="6"
            labelText="Updates"
            labelIcon={<InfoCircleFilled />}
            labelInfo="2,294"
            color="#e3742f"
            bgColor="#fcefe3"
          />
          <StyledTreeItem
            itemId="7"
            labelText="Forums"
            labelIcon={<SnippetsFilled />}
            labelInfo="3,566"
            color="#a250f5"
            bgColor="#f3e8fd"
          />
          <StyledTreeItem itemId="8" labelText="Promotions" labelIcon={<TagsFilled />} labelInfo="733" color="#3c8039" bgColor="#e6f4ea" />
        </StyledTreeItem>
        <StyledTreeItem itemId="4" labelText="History" labelIcon={<TagFilled />} />
      </SimpleTreeView>
    </MainCard>
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.node,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string,
  other: PropTypes.any
};
