interface IErrorMessage {
  message: string | undefined;
}

const ErrorMessage = ({ message }: IErrorMessage) => {
  return (
    <>
      {message ? (
        <div className='text-xs text-red-500 mt-1 font-normal'>{message}</div>
      ) : null}
    </>
  );
};
export default ErrorMessage;
