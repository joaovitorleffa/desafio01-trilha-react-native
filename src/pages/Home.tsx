import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { TodoInput } from "../components/TodoInput";
import { Task, TasksList } from "../components/TasksList";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
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
