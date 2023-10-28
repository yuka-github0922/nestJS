import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SignInResponse } from '../types/signInReaponse';
import { SIGN_IN } from '../mutations/authMutations';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 戻り値のsignInは、mutationのリクエストを実行するための関数であり、関数を実行するとリクエストが投げられる
  const [signIn] = useMutation<SignInResponse>(SIGN_IN); // 引数は実行したいmutation
  // サインインが失敗したかどうか
  const [failSignIn, setFailSignIn] = useState(false);
  const navigate  = useNavigate();

  // 以下追加
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signInInput = {
      email,
      password,
    };
    console.log(signInInput)
    try {
      const result = await signIn({ variables: { signInInput } });
      if (result.data) {
        localStorage.setItem('token', result.data.signIn.accessToken);
        localStorage.getItem('token') && navigate('/');return;
      }
      console.log(result);
    } catch(err: any) {
      if (err.message === 'Unauthorized') {
        setFailSignIn(true);
        return;
      }
      console.log(err.message);
      alert('良きせぬエラーが発生しました。')
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* 以下要素追加 */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
            />
            {/* 追加 */}
            {failSignIn && <Typography color="red">メールアドレスまたはパスワードを確認してください</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/signup" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}