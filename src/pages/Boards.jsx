import { DragDropContext } from 'react-beautiful-dnd';
import TaskManage from '../assets/Task/TaskManage';



const Boards = () => {

  return (
    <DragDropContext >
      <div className="board">
       <TaskManage />
      </div>
    </DragDropContext>
  );
};

export default Boards;
