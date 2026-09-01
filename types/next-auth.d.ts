import 'next-auth';
import 'next-auth/jwt';
import type { DefaultSession } from 'next-auth';

// Augmentacao dos tipos do next-auth com os campos usados pela aplicacao
// e pelo Design System (@mpms/shared-ui).
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user?: DefaultSession['user'] & {
      login?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    // Usado por @mpms/shared-ui/getServerToken (snake_case do provider).
    access_token?: string;
  }
}
