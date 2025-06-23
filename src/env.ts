import { z } from 'zod';

export const envSchema = z.object({
    MONGO_URI: z.string().nonempty(),
    JWT_SECRET: z.string().nonempty(),
    NEXT_PUBLIC_SITE_URL: z.string().url().nonempty(),
})

const parsedEnv = envSchema.safeParse(process.env);
if(!parsedEnv.success){
    console.error('Invalid environment variables:', parsedEnv.error.format());
    throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data as z.infer<typeof envSchema>;