import { z } from 'zod';

export const SignupPayloadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  countryCode: z.string().optional(),
  timezone: z.string().optional(),
  profession: z.string().optional(),
  route: z.string().min(1, 'Route is required'),
  monthlyAdSpend: z.string().min(1, 'Current monthly ad spend is required'),
  productsSold: z.string().min(1, 'What do you sell is required'),
  
  // UTM and tracking fields
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  platform: z.string().optional(),
  gclid: z.string().optional(),
  fbclid: z.string().optional(),
  fbp: z.string().optional(),
  fbc: z.string().optional(),
  matchtype: z.string().optional(),
  network: z.string().optional(),
  device: z.string().optional(),
  keyword: z.string().optional(),
  placement: z.string().optional(),
  campaignid: z.string().optional(),
  adgroupid: z.string().optional(),
});

export type SignupPayload = z.infer<typeof SignupPayloadSchema>;

export const UserDetailsQuerySchema = z.object({
  range: z.enum(['today', 'yesterday', '7days', '1month', 'custom']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  timezone: z.string().optional().default('Asia/Kolkata'),
  page: z.string().regex(/^\d+$/).transform(Number).optional().default(1 as any),
  limit: z.string().regex(/^\d+$/).transform(Number).refine(val => val <= 300, { message: 'Max limit is 300' }).optional().default(10 as any),
});

export type UserDetailsQuery = z.infer<typeof UserDetailsQuerySchema>;
