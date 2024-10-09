import { useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';

// project import
import MainCard from 'components/MainCard';

// assets
import DownOutlined from '@ant-design/icons/DownOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';

// ==============================|| TREE VIEW - CONTROLLED ||============================== //

export default function ControlledTreeView() {
  const [expanded, setExpanded] = useState(['1']);
  const [selected, setSelected] = useState([]);

  const handleToggle = (event, itemIds) => {
    setExpanded(itemIds);
  };

  const handleSelect = (event, itemIds) => {
    setSelected(itemIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? ['1', '5', '6', '7'] : []));
  };

  const handleSelectClick = () => {
    setSelected((oldSelected) => (oldSelected.length === 0 ? ['1', '2', '3', '4', '5', '6', '7', '8', '9'] : []));
  };

  const controlledTreeviewCodeString = `<Box sx={{ height: 270, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
  <Box sx={{ mb: 1 }}>
    <Button onClick={handleExpandClick}>{expanded.length === 0 ? 'Expand all' : 'Collapse all'}</Button>
    <Button onClick={handleSelectClick}>{selected.length === 0 ? 'Select all' : 'Unselect all'}</Button>
  </Box>
  <SimpleTreeView
    aria-label="controlled"
    slots={{ collapseIcon: DownOutlined, expandIcon: RightOutlined }}
    expandedItems={expanded}
    selectedItems={selected}
    onExpandedItemsChange={handleToggle}
    onSelectedItemsChange={handleSelect}
    multiSelect
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
</Box>`;

  return (
    <MainCard title="Controlled" codeString={controlledTreeviewCodeString}>
      <Box sx={{ height: 270, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
        <Box sx={{ mb: 1 }}>
          <Button onClick={handleExpandClick}>{expanded.length === 0 ? 'Expand all' : 'Collapse all'}</Button>
          <Button onClick={handleSelectClick}>{selected.length === 0 ? 'Select all' : 'Unselect all'}</Button>
        </Box>
        <SimpleTreeView
          aria-label="controlled"
          slots={{ collapseIcon: DownOutlined, expandIcon: RightOutlined }}
          expandedItems={expanded}
          selectedItems={selected}
          onExpandedItemsChange={handleToggle}
          onSelectedItemsChange={handleSelect}
          multiSelect
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
      </Box>
    </MainCard>
  );
}
