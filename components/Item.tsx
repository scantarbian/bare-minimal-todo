type Props = {
  className?: string;
};

const Item = ({ className }: Props) => {
  return <div className={` ${className}`}></div>;
};

export default Item;
