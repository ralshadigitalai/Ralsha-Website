import { NextRequest } from 'next/server';
import { UserController } from '../../../src/controllers/user.controller';

const userController = new UserController();

export async function POST(req: NextRequest) {
  return userController.signup(req);
}
