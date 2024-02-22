import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Header from "./Header";
import { FaClipboardList } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { addTodo, deleteToDo, saveToDo } from "../slices/userSlice";
import Loading from "./sloading/Loading";

function UserDashboard() {
  let { userObj, isSuccess, isLoading } = useSelector((state) => state.users);
  let tasklist = [];
  if (isSuccess === true) {
    tasklist = userObj.tasklist;
  }
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onFormSubmit = (task) => {
    let present = tasklist.includes(task.taskname);
    if (present === false) dispatch(addTodo(task.taskname));
  };
  const deleteitem = (task) => {
    tasklist = tasklist.filter((data) => data !== task);
    dispatch(deleteToDo(tasklist));
  };
  const saveList = () => {
    dispatch(saveToDo({ username: userObj.username, todolist: tasklist }));
  };
  return (
    <>
      {isLoading === true && <Loading />}
      {isSuccess === true && (
        <>
          <Header />
          <div className="todo-banner mb-2">
            <div>
              <h1>TODOLIST</h1>
              <h5>Create your list</h5>
            </div>
          </div>
          <div className="container outer-todo">
            <div className="inner-todo">
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="task-input">
                  <input
                    type="text"
                    name="taskname"
                    id="task"
                    placeholder="Enter your Task"
                    className="form-control w-100"
                    {...register("taskname", { required: true })}
                  />
                </div>
                {errors.taskname?.type === "required" && (
                  <p className="text-danger">Please Enter a task</p>
                )}
                <div className="task-btns">
                  <button type="submit" className="btn btn-success add-todo">
                    Create Task
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary save-todo"
                    onClick={saveList}
                  >
                    Save List
                  </button>
                </div>
              </form>
              {tasklist === null ? (
                <>No Tasks to display</>
              ) : (
                <div className="display-todo">
                  {tasklist.map((task, index) => (
                    <div className="todo">
                      <div className="inner-task">
                        <span className="todo-icon">
                          <FaClipboardList />
                        </span>
                        {task}
                      </div>
                      <div
                        className="todo-icon bin"
                        onClick={() => deleteitem(task)}
                      >
                        <ImBin />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserDashboard;
