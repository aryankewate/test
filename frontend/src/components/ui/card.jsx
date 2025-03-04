export function Card({ children }) {
    return <div className="p-4 bg-gray-800 rounded-lg shadow">{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div className="mt-2">{children}</div>;
  }