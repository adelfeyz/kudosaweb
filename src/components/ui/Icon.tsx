

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export function Icon({ name, className = '', size = 24 }: IconProps) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <img
        src={`/icons/${name}.svg`}
        alt={`${name} icon`}
        className="w-full h-full"
      />
    </div>
  );
}
