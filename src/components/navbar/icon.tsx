import React, { Suspense } from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

// Define a type that ensures iconName is a valid key in LucideIcons
type IconProps = {
  iconName: string;
} & Omit<LucideProps, 'ref'>;

const DynamicIcon = ({ iconName, ...props }: IconProps) => {
  // Check if icon exists in Lucide icons
  const IconComponent = React.useMemo(() => {
    // Cast to any to avoid TypeScript errors with dynamic access
    const icons = LucideIcons as any;
    return iconName in icons ? icons[iconName] : LucideIcons.HelpCircle;
  }, [iconName]);

  // Return the component with props
  return <IconComponent {...props} />;
};

const IconFromDB = ({ iconName, ...props }: IconProps) => (
  <Suspense fallback={<LucideIcons.Loader className="animate-spin" {...props} />}>
    <DynamicIcon iconName={iconName} {...props} />
  </Suspense>
);

export default IconFromDB;