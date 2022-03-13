import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      // Allows relative callback URLs
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
    async session({ session }) {
      const user = session.user;
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/user';
      const res = await axios.post(url, { name: user.name, email: user.email });
      session.user.id = res.data.id;
      return Promise.resolve(session);
    },
  },
});
