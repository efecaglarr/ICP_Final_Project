import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        maxWidth: '85rem',
        padding: theme.spacing(2, 4),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(2, 4),
        },
      },
      card: {
        borderRadius: theme.spacing(2),
        padding: theme.spacing(4),
        boxShadow: 'none',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[50],
        },
      },
      iconButton: {
        margin: 'auto',
        marginBottom: '10px',
      },
}));