interface IBadge {
  count: number;
}

const Badge = ({ count }: IBadge) => {
  return (
    <>
      <span className='inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full'>
        {count}
      </span>
    </>
  );
};

export default Badge;
