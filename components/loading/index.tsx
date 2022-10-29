import Card from "components/card";
import { css } from "utils";

const Loading = () => {
  return (
    <Card backgroundColor={css("--card-bg-light")} padding={7}>
      <Card backgroundColor={css("--card-bg-default")} height={200}>
        <></>
      </Card>
    </Card>
  );
};

export default Loading;
