export const Card = ({ children, className }) => (
  <div className={`rounded-xl shadow ${className}`}>{children}</div>
);
export const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);
