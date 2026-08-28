import { User, IUser } from '../models/User';
import { UtmCampaign, IUtmCampaign } from '../models/UtmCampaign';
import { BusinessInfo, IBusinessInfo } from '../models/BusinessInfo';
import connectDB from '../config/db';

export class UserRepository {
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    await connectDB();
    const user = new User(userData);
    await user.save();
    return user;
  }

  async findUserByEmailOrPhone(email: string, phone: string): Promise<IUser | null> {
    await connectDB();
    return User.findOne({ $or: [{ email }, { phone }] });
  }

  async upsertUser(email: string, userData: Partial<IUser>): Promise<{ user: IUser; isNew: boolean }> {
    await connectDB();
    const result = await User.findOneAndUpdate(
      { email },
      { $setOnInsert: userData },
      { returnDocument: 'after', upsert: true, includeResultMetadata: true }
    ) as any;
    
    return {
      user: result.value,
      isNew: !result.lastErrorObject?.updatedExisting
    };
  }

  async createUtmCampaign(campaignData: Partial<IUtmCampaign>): Promise<IUtmCampaign> {
    await connectDB();
    const campaign = new UtmCampaign(campaignData);
    await campaign.save();
    return campaign;
  }

  async createBusinessInfo(businessData: Partial<IBusinessInfo>): Promise<IBusinessInfo> {
    await connectDB();
    // Using findOneAndUpdate with upsert in case the user submits twice or data is re-synced
    const result = await BusinessInfo.findOneAndUpdate(
      { userId: businessData.userId },
      { $set: businessData },
      { returnDocument: 'after', upsert: true }
    );
    return result;
  }

  async getUtmTouchpointsWithUsers(
    query: any,
    page: number,
    limit: number
  ): Promise<{ data: IUtmCampaign[]; total: number }> {
    await connectDB();
    
    const skip = (page - 1) * limit;
    
    const [campaigns, total] = await Promise.all([
      UtmCampaign.find(query)
        .populate('userId')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      UtmCampaign.countDocuments(query).exec(),
    ]);

    // Extract all user IDs to fetch their BusinessInfo
    const userIds = campaigns.map(c => (c.userId as any)?._id).filter(Boolean);

    // Fetch BusinessInfo in bulk
    const businessInfos = await BusinessInfo.find({ userId: { $in: userIds } }).lean().exec();

    // Create a lookup map for O(1) access
    const businessInfoMap = new Map();
    businessInfos.forEach(info => {
      businessInfoMap.set(info.userId.toString(), info);
    });

    // Flatten the payload: strip unwanted fields, prevent nested objects, and merge cleanly
    const data = campaigns.map(campaign => {
      const cObj = campaign.toObject() as any;
      const userObj = cObj.userId || {};
      const bInfo = userObj._id ? businessInfoMap.get(userObj._id.toString()) : {};

      // Destructure to remove unwanted fields
      const { _id: cId, userId: _nestedUser, updatedAt: _cUp, __v: _cV, ...cData } = cObj;
      const { _id: uId, updatedAt: _uUp, __v: _uV, createdAt: _uCr, ...uData } = userObj;
      const { _id: _bId, userId: _bUser, updatedAt: _bUp, __v: _bV, createdAt: _bCr, ...bData } = bInfo || {};

      return {
        _id: cId,         // Touchpoint ID
        userId: uId,      // User ID (Flat string)
        ...uData,         // User data (name, email, phone)
        ...bData,         // Business data (monthlyAdSpend, productsSold)
        ...cData,         // UTM Touchpoint data (utm_source, route, etc - placed last so its createdAt overwrites any other)
      };
    });

    return { data, total };
  }
}
