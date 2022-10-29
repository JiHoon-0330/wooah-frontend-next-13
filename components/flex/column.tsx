import { ComponentProps, FC } from "react";
import Flex from ".";

type Props = Omit<ComponentProps<typeof Flex>, "flexDirection">;

const FlexColumn: FC<Props> = (props) => {
  return <Flex {...props} flexDirection={"column"} />;
};

export default FlexColumn;
