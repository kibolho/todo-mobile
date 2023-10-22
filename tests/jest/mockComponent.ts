import React, { DOMElement } from "react";

const mockComponent = (name: string): React.FC => {
  const component = (props: Record<string, unknown>): DOMElement<any, any> => {
    //@ts-ignore
    return React.createElement(name, props, props.children);
  };
  return component;
};

export default mockComponent;
