export type JwtPayload = {
  email: string;
  sub: string; // subjectの略で、JWTのトークンの識別子
};
