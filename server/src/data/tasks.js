'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.saveTasks = exports.getTasks = void 0
const fs_1 = require('fs')
const path_1 = require('path')
const tasksFilePath = path_1.default.join(process.cwd(), 'data', 'tasks.json')
// Function to read tasks from the file
const getTasks = () => {
  try {
    if (fs_1.default.existsSync(tasksFilePath)) {
      const data = fs_1.default.readFileSync(tasksFilePath, 'utf8')
      return JSON.parse(data)
    } else {
      return []
    }
  } catch (error) {
    console.error('Error reading tasks file:', error)
    return []
  }
}
exports.getTasks = getTasks
// Function to save tasks to the file
const saveTasks = (tasks) => {
  try {
    fs_1.default.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8')
  } catch (error) {
    console.error('Error writing to tasks file:', error)
  }
}
exports.saveTasks = saveTasks
