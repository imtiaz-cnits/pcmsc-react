import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import "./todo.css"; // Importing the CSS

// API for adding a todo
const addTodoAPI = async (variables) => {
  const response = await axios.post("http://localhost:9000/todos", {
    text: variables.text,
  });
  return response.data;
};

// API to fetch todos
const fetchTodos = async () => {
  const response = await axios.get("http://localhost:9000/todos");
  return response.data;
};

const TodoComponent = () => {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  // Use the mutation hook for adding todos
  const { mutate } = useMutation({
    mutationFn: addTodoAPI,
    onMutate: async (variables) => {
      // Cancel ongoing queries
      await queryClient.cancelQueries(["todos"]);

      // Get the previous todos in cache
      const previousTodos = queryClient.getQueryData(["todos"]);
      console.log("🔍 Before Update (Cache Data):", previousTodos);

      // Optimistically update the todos (without backend data)
      const afterOptimistic = queryClient.setQueryData(
        ["todos"],
        (oldData = []) => {
          return [...oldData, { ...variables, id: Date.now(), opacity: 0.5 }];
        },
      );

      console.log("✅ After Optimistic Update (Cache Data):", afterOptimistic);

      return { previousTodos }; // Returning previous data for rollback
    },
    onError: (error, variables, context) => {
      console.log("Error adding todo:", error);
      // Rollback to previous todos if mutation fails
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
      alert("An error occurred while saving the todo. Please try again.");
    },
    onSuccess: async (data) => {
      console.log("Todo added successfully:", data);
      // Invalidate queries to prefetch the todos from the backend
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log(
        "✅ After Backend Response (Cache Data): ",
        queryClient.getQueryData(["todos"]),
      );
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddTodo = () => {
    if (text.trim()) {
      // Trigger the mutation to add the todo
      mutate({ text });
      setText("");
    }
  };

  // Fetch todos using the query hook
  const { data, error, isPending } = useQuery({
    queryKey: ["todos"], // Using the object-based syntax
    queryFn: fetchTodos,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading todos</div>;

  return (
    <div className="todo-container">
      <div className="left">
        <h2>Add Todo</h2>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div className="right">
        <h2>Todos</h2>
        <ul>
          {data.map((todo) => (
            <li key={todo.id} style={{ opacity: todo.opacity || 1 }}>
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoComponent;
