import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  gridPosts: {
    // alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: { 
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'absolute',
  }
}));