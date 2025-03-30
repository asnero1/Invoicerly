import fs from 'fs'
import path from 'path'

const tasksFilePath = path.join(process.cwd(), 'data', 'tasks.json')

// Function to read tasks from the file
export const getTasks = (): any[] => {
  try {
    if (fs.existsSync(tasksFilePath)) {
      const data = fs.readFileSync(tasksFilePath, 'utf8')
      return JSON.parse(data)
    } else {
      return []
    }
  } catch (error) {
    console.error('Error reading tasks file:', error)
    return []
  }
}

// Function to save tasks to the file
export const saveTasks = (tasks: any[]) => {
  try {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8')
  } catch (error) {
    console.error('Error writing to tasks file:', error)
  }
}
