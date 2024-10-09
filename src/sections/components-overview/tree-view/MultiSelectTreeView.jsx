// material-ui
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';

// project import
import MainCard from 'components/MainCard';

// assets
import DownOutlined from '@ant-design/icons/DownOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';

// ==============================|| TREE VIEW - MULTI-SELECT ||============================== //

export default function MultiSelectTreeView() {
  const multiTreeviewCodeString = `<SimpleTreeView
  aria-label="multi-select"
  slots={{ collapseIcon: DownOutlined, expandIcon: RightOutlined }}
  multiSelect
  defaultExpandedItems={['1']}
  sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
>
  <TreeItem itemId="1" label="Applications">
    <TreeItem itemId="2" label="Calendar" />
    <TreeItem itemId="3" label="Chrome" />
    <TreeItem itemId="4" label="Webstorm" />
  </TreeItem>
  <TreeItem itemId="5" label="Documents">
    <TreeItem itemId="6" label="MUI">
      <TreeItem itemId="7" label="src">
        <TreeItem itemId="8" label="index.js" />
        <TreeItem itemId="9" label="tree-view.js" />
      </TreeItem>
    </TreeItem>
  </TreeItem>
</SimpleTreeView>`;

  return (
    <MainCard title="Multi-Select" codeString={multiTreeviewCodeString}>
      <SimpleTreeView
        aria-label="multi-select"
        slots={{ collapseIcon: DownOutlined, expandIcon: RightOutlined }}
        multiSelect
        defaultExpandedItems={['1']}
        sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        <TreeItem itemId="1" label="Applications">
          <TreeItem itemId="2" label="Calendar" />
          <TreeItem itemId="3" label="Chrome" />
          <TreeItem itemId="4" label="Webstorm" />
        </TreeItem>
        <TreeItem itemId="5" label="Documents">
          <TreeItem itemId="6" label="MUI">
            <TreeItem itemId="7" label="src">
              <TreeItem itemId="8" label="index.js" />
              <TreeItem itemId="9" label="tree-view.js" />
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </SimpleTreeView>
    </MainCard>
  );
}
