import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Signup from './Signup'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://cdn.dodowallpaper.com/full/567/mario-kart-8-hd-wallpapers-35.jpg )',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    background:'./Logo.jpg',
    
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#fff",
    backgroundColor: "#bf0547",

    
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();
  console.log(props.signInEmail)

 

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <img width="150" height="150" src="https://eastus21-mediap.svc.ms/transform/thumbnail?provider=spo&inputFormat=jpg&cs=fFNQTw&docid=https%3A%2F%2Funitechn-my.sharepoint.com%3A443%2F_api%2Fv2.0%2Fdrives%2Fb!Cn0Ef-UMIUq-sk9LU9SAK1-4Q-lBjmtPokluTfQXybGlxcN0EnftSJ0weKVTMeQL%2Fitems%2F0133VYAA7TD65BVELKYZBZD5D3LPLXRY2I%3Fversion%3DPublished&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvdW5pdGVjaG4tbXkuc2hhcmVwb2ludC5jb21AYWYyZmQxOTYtMWQ5Zi00N2I0LTkwNjktMzkxYTQ2ZjgzNjAxIiwiaXNzIjoiMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwIiwibmJmIjoiMTU3NTMzNDU5MSIsImV4cCI6IjE1NzUzNTYxOTEiLCJlbmRwb2ludHVybCI6Ik1qekJCSHUzNktjN1ByMFlUV3RqYjJkM2NWd1FMeWZKNlkxYW5vdy9DRFE9IiwiZW5kcG9pbnR1cmxMZW5ndGgiOiIxMTgiLCJpc2xvb3BiYWNrIjoiVHJ1ZSIsImNpZCI6IlpqRmlOakZrT1dZdE5qQXdZaTFoTURBd0xUaGhNekV0WlRWbVlqYzFNall3TXpZeiIsInZlciI6Imhhc2hlZHByb29mdG9rZW4iLCJzaXRlaWQiOiJOMll3TkRka01HRXRNR05sTlMwMFlUSXhMV0psWWpJdE5HWTBZalV6WkRRNE1ESmkiLCJzaWduaW5fc3RhdGUiOiJbXCJrbXNpXCJdIiwibmFtZWlkIjoiMCMuZnxtZW1iZXJzaGlwfGplYW53YWhsdW5nQHVuaXRlYy5lZHUiLCJuaWkiOiJtaWNyb3NvZnQuc2hhcmVwb2ludCIsImlzdXNlciI6InRydWUiLCJjYWNoZWtleSI6IjBoLmZ8bWVtYmVyc2hpcHwxMDAzN2ZmZTljNzBkMmE5QGxpdmUuY29tIiwidHQiOiIwIiwidXNlUGVyc2lzdGVudENvb2tpZSI6IjMifQ.WElkMkhkNXF0ZW4zVmh3MGc1cEh2RDdsMFVBVk8vaGh5bHQxOGxqdEM2WT0&encodeFailures=1&srcWidth=&srcHeight=&width=198&height=198&action=Access">
          </img>
          <Typography component="h1" variant="h4" fontStyle= "italic">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              onChange={props.onTextboxChangeSignInEmail}
              required
              fullWidth
              id="email"
              value={props.signInEmail}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              onChange={props.onTextboxChangeSignInPassword}
              required
              fullWidth
              name="password"
              value={props.signInPassword}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color ="secondary"
              className={classes.submit}
              onClick={props.onSignIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/h" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
           
          </form>
        </div>
      </Grid>
    </Grid>
  );
}