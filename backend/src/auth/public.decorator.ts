import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const REQUIRES_AUTH_KEY = 'requiresAuth';

/** The route needs no token even though it is not a safe (read-only) method. */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/** The route needs a token even though it is a read-only (GET) method. */
export const RequiresAuth = () => SetMetadata(REQUIRES_AUTH_KEY, true);
