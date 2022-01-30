import { makeStyles } from '@material-ui/core/styles';

// TODO: put these styles directly on the component declarations.
export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
    fontWeight: 'bold',
  },
  cardActions: {
    padding: '0 16px 16px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});
