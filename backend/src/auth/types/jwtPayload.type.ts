export type JwtPayload = {
  email: string;
  sub: string; // subjectの略で、認証情報の識別子を指定
};
