import { Box } from "ink";

function Divider() {
  return (
    <Box
      borderLeft={false}
      borderRight={false}
      borderTop={false}
      borderBottom={true}
      borderBottomColor="gray"
      borderStyle="single"
      margin={0}
      padding={0}
    />
  );
}

export default Divider;
