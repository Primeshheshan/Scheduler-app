import Button from '@/components/button';
import Card from '@/components/card';

const Login = () => {
  return (
    <>
      <div className='h-screen flex items-center justify-center'>
        <Card>
          <h2 className='mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign In To Your Account
          </h2>
          <div className='sm:mx-auto w-80'>
            <form>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900 mb-2'
                >
                  Email address
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
                />
              </div>
            </form>
          </div>
          <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form>
              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-gray-900 mb-2'
                  >
                    Password
                  </label>
                  <div className='text-sm'>
                    <a
                      href='#'
                      className='font-semibold text-indigo-600 hover:text-indigo-500'
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
                />
              </div>
            </form>
          </div>
          <Button className='mx-auto mt-5'> Sign in</Button>
        </Card>
      </div>
    </>
  );
};
export default Login;
