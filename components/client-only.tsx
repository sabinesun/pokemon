import { type ReactNode, useEffect, useState } from "react";

type ClientOnlyProps = {
  readonly children: ReactNode;
};

export const ClientOnly = ({ children, ...delegated }: ClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div {...delegated} className="w-full">
      {children}
    </div>
  );
};
