import { Button, Card, IconButton, Typography } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
interface ITodoTist {
  title: string;
  description: string;
}
const TodoTist = ({ title, description }: ITodoTist) => {
  return (
    <>
      <div className='md:mx-auto max-w-screen-md mx-2'>
        <Card className='p-5 mb-5'>
          <div className='absolute right-4'>
            <IconButton variant='text' size='sm' color='red'>
              <XMarkIcon className='h-5 w-5 text-red-500' />
            </IconButton>
          </div>
          <div className='mt-4'>
            <Typography variant='h6' color='blue-gray'>
              {title}
            </Typography>
            <Typography className='mt-2'>{description}</Typography>
          </div>
          <div className='flex justify-end'>
            <Button variant='text' className='w-32'>
              Complete
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default TodoTist;
