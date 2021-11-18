import { makeStyles } from '@material-ui/core/styles';
//Create a hook that => function call
//which contains a style object
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  icon: {
    marginRight: '20px',
  },
  cardGrid: {
    padding: '20px 0',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9 How u use to see the image
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default useStyles;
