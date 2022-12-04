const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const smtp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Facebook email verification",
    html: `
            <div style="text-align: center;"><h1>Welcome to <span style="color: #1876f2;">Facebook</span>, ${name}</h1>
            <p style="margin: 10px 0;font-size: 15px;">Please click on the link below to verify your email address</p>
            <a href="${url}" style="background-color: #1876f2;color: #fff;padding: 10px 20px;display: inline-block;border-radius: 4px;">Confirm your account</a>
            </div>
        `,
  };
  smtp.sendMail(mailOptions, (error, response) => {
    if (error) return error;
    return response;
  });
};

exports.sendVerificationCode = (email, name, code) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const smtp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Facebook Reset code",
    html: `
            <div style="text-align: center;"><h1>Welcome,${name}</h1>
            <p style="margin: 10px 0;font-size: 15px;">Here is your <span style="color: #1876f2;">Facebook</span> password reset code</p>
            <span style="background-color: #876f62;color: #fff;padding: 10px 20px;display: inline-block;border-radius: 4px;">${code}</span>
            </div>
        `,
  };
  smtp.sendMail(mailOptions, (error, response) => {
    if (error) return error;
    return response;
  });
};
