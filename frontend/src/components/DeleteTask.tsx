import { Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../mutations/taskMutations";
import { GET_TASKS } from "../queries/taskQueries";
import { useNavigate } from "react-router-dom";


export const DeleteTask = ({ id, userId } : {id: number, userId: number}) => {
  const [deleteTask] = useMutation<{deleteTask: number}>(DELETE_TASK);
  const navigate = useNavigate();
  const handleDeleteTask = async () => {
    try {
      await deleteTask({
        variables: { id },
        refetchQueries: [{query: GET_TASKS, variables: { userId }}]
      })
      alert('タスクを削除しました。')
    } catch (err: any) {
      if (err.message === 'Unauthorized') {
      localStorage.removeItem('token');
      alert('トークンの有効期限が切れました。サインイン画面へ遷移します');
      navigate('/signin');
      return;
      }
      alert('タスクの削除に失敗しました。');
    }
  }
  return (
    <div>
      <Tooltip title="削除">
        <IconButton onClick={handleDeleteTask}>
          <DeleteIcon color="action"/>
        </IconButton>
      </Tooltip>
    </div>
  )
}
