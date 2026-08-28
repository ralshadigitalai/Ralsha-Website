import { UserRepository } from '../repositories/user.repository';
import { SignupPayload, UserDetailsQuery } from '../validators/user.validator';
import { logger } from '../utils/logger';
import { getBoundsForTimezone } from '../utils/timezone';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async handleSignup(payload: SignupPayload) {
    let { name, email, phone, countryCode, timezone, profession, route, monthlyAdSpend, productsSold, ...utmData } = payload;

    // Strip the country code from the phone number if it is prefixed
    if (countryCode && phone.startsWith(countryCode)) {
      phone = phone.substring(countryCode.length).trim();
    } else if (!countryCode && phone.startsWith('+91')) {
      countryCode = '+91';
      phone = phone.substring(3).trim();
    }

    try {
      let user = await this.userRepository.findUserByEmailOrPhone(email, phone);
      let isNewUser = false;

      if (!user) {
        try {
          user = await this.userRepository.createUser({
            name,
            email,
            phone,
            countryCode,
            timezone,
            profession,
          });
          isNewUser = true;
        } catch (error: any) {
          // TOCTOU Race Condition Safety Net
          if (error.code === 11000) {
            user = await this.userRepository.findUserByEmailOrPhone(email, phone);
            if (!user) throw error;
            isNewUser = false;
          } else {
            throw error;
          }
        }
      }

      // Record business info (upsert to handle re-submissions or updates)
      if (monthlyAdSpend && productsSold) {
        await this.userRepository.createBusinessInfo({
          userId: user._id as any,
          monthlyAdSpend,
          productsSold
        });
      }

      // Record UTM campaign associated with user
      await this.userRepository.createUtmCampaign({
        ...utmData,
        route,
        userId: user._id as any,
      });

      return { user, isNewUser };
    } catch (error) {
      logger.error(error, 'Error handling signup in UserService');
      throw error;
    }
  }

  async getUserDetails(query: UserDetailsQuery) {
    const { range, startDate, endDate, timezone = 'Asia/Kolkata', page = 1, limit = 300 } = query;
    
    const dbQuery: any = {};
    
    const { start, end } = getBoundsForTimezone(range, timezone, startDate, endDate);

    if (start || end) {
      dbQuery.createdAt = {};
      if (start) {
        dbQuery.createdAt.$gte = start;
      }
      if (end) {
        dbQuery.createdAt.$lte = end;
      }
    }

    try {
      const result = await this.userRepository.getUtmTouchpointsWithUsers(dbQuery, page, limit);
      
      return {
        data: result.data,
        pagination: {
          total: result.total,
          page,
          limit,
          totalPages: Math.ceil(result.total / limit)
        }
      };
    } catch (error) {
      logger.error(error, 'Error fetching user details in UserService');
      throw error;
    }
  }
}
