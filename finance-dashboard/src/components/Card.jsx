export function Card({ children, className = '' }) {
  return <section className={`glass-panel ${className}`}>{children}</section>;
}
