import jwtDecode from "jwt-decode";
import Header from "./Header"
import TaskTable from "./TaskTable"
import { Payload } from "../types/payload";
import { GET_TASKS } from "../queries/taskQueries";
import { useQuery } from "@apollo/client";
import { Task } from "../types/task";
import { Loading } from "./Loading";
import { Stack, Typography } from "@mui/material";
import AddTask from "./AddTask";

const Main = () => {
  // mainに来てるならtokenはあるはず
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode<Payload>(token!);
  const userId = decodedToken.sub;
  console.log(token, decodedToken, userId)

  // useMutationは戻り値の関数を実行して初めてリクエスト送信され、useQueryではこの行が読み込まれた時点でリクエスト送信される
  const { loading, data, error } = useQuery<{ getTasks: Task[]}>(GET_TASKS, {
    variables: { userId }
  });

  return (
    <div>
      <Header />
      {/* Stackは、要素を中央寄せにしたいときに使用する */}
      <Stack spacing={4} direction='column' m={8} alignItems='center'>
         { loading && <Loading /> }
         { error && <Typography color='red'>エラーが発生しました</Typography> }
         { !loading && !error && (
          <>
            <AddTask userId={userId}/>
            <TaskTable tasks={data?.getTasks} userId={userId}/> {/* tasksにbackendからうけとったものを渡す */}
          </>
        )}
      </Stack>
    </div>
  )
}

export default Main