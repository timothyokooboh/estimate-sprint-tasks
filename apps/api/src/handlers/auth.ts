import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
});

export async function googleSignIn(parent, { access_token }, { prisma }, info) {
  client.setCredentials({ access_token: access_token });
  const googleUserInfo = await client.request({
    url: "https://www.googleapis.com/oauth2/v3/userinfo",
  });

  const payload = googleUserInfo.data as {
    sub: string;
    name: string;
    email: string;
    picture: string;
  };

  const { sub, email, name, picture } = payload;

  let user = await prisma.user.findUnique({
    where: { googleId: sub },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        googleId: sub,
        email,
        name,
        picture,
      },
    });
  }

  const jwtToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  return {
    token: jwtToken,
    user,
  };
}
