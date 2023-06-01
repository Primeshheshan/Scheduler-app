import { TodoStatus } from '@/enums/todo.enums';
import useFetchTodos from '@/hooks/fetch-todos.hook';
import { XMarkIcon } from '@heroicons/react/24/solid';
import {
  Button,
  Card,
  Chip,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import axios from 'axios';
interface ITodoTist {
  id: string;
  title: string;
  description: string;
  status: string;
  onDoneHandler: (id: string) => void;
  onDeleteHandler: (id: string) => void;
}

const TodoTist = ({
  id,
  title,
  description,
  status,
  onDeleteHandler,
  onDoneHandler,
}: ITodoTist) => {
  return (
    <>
      <div className='md:mx-auto max-w-screen-md mx-2'>
        <Card className='p-5 mb-5'>
          <div className='absolute right-4'>
            <IconButton
              variant='text'
              size='sm'
              color='red'
              onClick={() => onDeleteHandler(id)}
            >
              <XMarkIcon className='h-5 w-5 text-red-500' />
            </IconButton>
          </div>
          <div className='mt-4'>
            <Typography variant='h6' color='blue-gray'>
              {title}
            </Typography>
            <Typography className='mt-2'>{description}</Typography>
          </div>
          <div className='flex justify-between items-center mt-2'>
            <Chip
              value={status ?? ''}
              color={status === TodoStatus.IN_PROGRESS ? 'teal' : 'amber'}
              className='rounded-full py-1.5 h-7'
            />
            {status === TodoStatus.IN_PROGRESS && (
              <Button
                variant='text'
                className='w-32'
                onClick={() => onDoneHandler(id)}
              >
                Done
              </Button>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default TodoTist;
