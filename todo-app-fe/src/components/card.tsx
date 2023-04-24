const Card = (props: any) => {
  return (
    <div
      className={`m-3 max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ${props.className}`}
    >
      {props.children}
    </div>
  );
};
export default Card;
