import { DragDropContext } from 'react-beautiful-dnd';



const Boards = () => {

  return (
    <DragDropContext >
      <div className="board">
       Drag something
      </div>
    </DragDropContext>
  );
};

export default Boards;
