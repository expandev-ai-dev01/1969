/**
 * @summary
 * Authentication middleware.
 * Validates the presence of user identification in headers.
 * Note: In a production environment, this would validate a JWT token.
 * For this prototype, it expects an 'x-user-id' header.
 *
 * @module middleware/auth/authMiddleware
 */

import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '@/utils';

/**
 * @summary
 * Middleware to check for authentication
 *
 * @function authMiddleware
 * @module middleware/auth
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @returns {void}
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const userId = req.headers['x-user-id'];

  if (!userId || typeof userId !== 'string') {
    res
      .status(401)
      .json(
        errorResponse('Authentication required. Please provide x-user-id header.', 'UNAUTHORIZED')
      );
    return;
  }

  // Attach user to request object (simulating decoded token)
  (req as any).user = {
    id: userId,
  };

  next();
}
