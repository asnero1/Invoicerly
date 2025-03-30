'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const db_1 = __importDefault(require('../data/db')) // Adjust path if needed
const app = (0, express_1.default)()
// Connect to MongoDB
;(0, db_1.default)()
app.listen(3000, () => console.log('🚀 Server running on port 3000'))
