// @providesModule mockIcon
import mockComponent from "./mockComponent";

const mockIcon = ({ name }: { name: string }): React.FC => {
  return mockComponent(name || "Icon");
};

export default mockIcon;
