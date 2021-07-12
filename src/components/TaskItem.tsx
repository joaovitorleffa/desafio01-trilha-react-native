import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { Task, TasksListProps } from "./TasksList";
import trashIcon from "../assets/icons/trash/trash.png";

type TaskItemProps = Omit<TasksListProps, "tasks"> & {
  index: number;
  task: Task;
};

export function TaskItem({
  toggleTaskDone,
  removeTask,
  editTask,
  index,
  task,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setNewTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: newTitle });
    setIsEditing(false);
  }

  useEffect(() => {
    if (isEditing) {
      return textInputRef.current?.focus();
    }
    textInputRef.current?.blur();
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={newTitle}
            onChangeText={setNewTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            returnKeyType="done"
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.controllers}>
        {isEditing ? (
          <TouchableOpacity style={styles.button} onPress={handleCancelEditing}>
            <Icon name="x" size={20} color="#B2B2B2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleStartEditing}>
            <Icon name="edit-2" size={18} color="#B2B2B2" />
          </TouchableOpacity>
        )}
        <View style={styles.divider} />
        <TouchableOpacity
          disabled={isEditing}
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24, opacity: isEditing ? 0.2 : 1 }}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  controllers: {
    flexDirection: "row",
  },
  button: {
    marginRight: 24,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
});
