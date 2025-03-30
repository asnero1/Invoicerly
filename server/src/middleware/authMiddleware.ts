import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
  user?: { id: string } // Ensure TypeScript recognizes the user object
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }
    req.user = decoded // Attach the decoded user to the request object
    next()
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token.' })
  }
}
