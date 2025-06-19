import React from 'react';


interface FixedBottomComponentProps {
  children: React.ReactNode;
}

const FixedBottom: React.FC<FixedBottomComponentProps> = ({ children }) => {
  return (
    <div className="w-full sticky bottom-0 mt-auto">
          {children}
    </div>
  );
};

export default FixedBottom;