import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { TodoInput } from "../components/TodoInput";
import { Task, TasksList } from "../components/TasksList";

export type EditTaskProps = {
  taskId: number;
  taskNewTitle: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task = tasks.find((task) => task.title === newTaskTitle);

    if (task) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }

    const data: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks((prev) => [...prev, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = [...tasks];

    const taskToUpdate = updatedTasks.find((task) => task.id === id);

    if (taskToUpdate) {
      taskToUpdate.done = !taskToUpdate.done;
      setTasks(updatedTasks);
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks((prev) => prev.filter((task) => task.id !== id));
          },
        },
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskProps) {
    const updatedTasks = [...tasks];

    const taskToUpdate = updatedTasks.find((task) => task.id === taskId);

    if (taskToUpdate) {
      taskToUpdate.title = taskNewTitle;
      setTasks(updatedTasks);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        editTask={handleEditTask}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
