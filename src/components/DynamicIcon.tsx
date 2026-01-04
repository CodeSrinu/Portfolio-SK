import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
    name: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
    // Access the icon component dynamically
    const IconComponent = (LucideIcons as any)[name];

    if (!IconComponent) {
        // Fallback icon if name is invalid or not found
        // Handle different Lucide versions (HelpCircle rename to CircleHelp)
        const FallbackIcon = (LucideIcons as any).CircleHelp || (LucideIcons as any).HelpCircle || (LucideIcons as any).AlertCircle;
        return <FallbackIcon {...props} />;
    }

    return <IconComponent {...props} />;
};

export default DynamicIcon;
