import { NextRequest } from 'next/server';
import { UserService } from '../services/user.service';
import { SignupPayloadSchema, UserDetailsQuerySchema } from '../validators/user.validator';
import { createSuccessResponse, createErrorResponse } from '../utils/response';
import { ERROR_CODES, HTTP_STATUS } from '../config/constants';
import { logger } from '../utils/logger';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async signup(req: NextRequest) {
    try {
      const body = await req.json();
      
      const validationResult = SignupPayloadSchema.safeParse(body);
      
      if (!validationResult.success) {
        return createErrorResponse(
          ERROR_CODES.VALIDATION_ERROR,
          'Please check your submission and ensure all required fields are correctly filled out.',
          HTTP_STATUS.BAD_REQUEST,
          validationResult.error.format()
        );
      }

      const { user, isNewUser } = await this.userService.handleSignup(validationResult.data);

      return createSuccessResponse(
        { user, isNewUser },
        isNewUser ? 'Welcome! Your registration was completely successful.' : 'Welcome back! We have securely updated your details.',
        isNewUser ? HTTP_STATUS.CREATED : HTTP_STATUS.OK
      );
    } catch (error: any) {
      logger.error(error, 'Error in UserController.signup');
      
      if (error.code === 11000) { // MongoDB Duplicate Key
        return createErrorResponse(
          ERROR_CODES.USER_EXISTS,
          'An account with this email or phone number already exists. Please try using a different one.',
          HTTP_STATUS.BAD_REQUEST
        );
      }

      return createErrorResponse(
        ERROR_CODES.INTERNAL_ERROR,
        'Oops! Something went wrong on our end during registration. Please try again later.'
      );
    }
  }

  async getUserDetails(req: NextRequest) {
    try {
      const searchParams = req.nextUrl.searchParams;
      
      const query = {
        range: searchParams.get('range') || undefined,
        startDate: searchParams.get('startDate') || undefined,
        endDate: searchParams.get('endDate') || undefined,
        timezone: searchParams.get('timezone') || undefined,
        page: searchParams.get('page') || undefined,
        limit: searchParams.get('limit') || undefined,
      };

      const validationResult = UserDetailsQuerySchema.safeParse(query);

      if (!validationResult.success) {
        return createErrorResponse(
          ERROR_CODES.VALIDATION_ERROR,
          'The search parameters provided are invalid. Please verify your date range and limits.',
          HTTP_STATUS.BAD_REQUEST,
          validationResult.error.format()
        );
      }

      const data = await this.userService.getUserDetails(validationResult.data);

      return createSuccessResponse(data, 'Successfully retrieved user details and campaign data.');
    } catch (error) {
      logger.error(error, 'Error in UserController.getUserDetails');
      return createErrorResponse(
        ERROR_CODES.INTERNAL_ERROR,
        'Oops! We encountered an issue while retrieving the user details. Please try again.'
      );
    }
  }
}
