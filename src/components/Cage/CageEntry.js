import { makeStyles, Typography } from '@material-ui/core';
const useCageEntryStyles = makeStyles((theme) => ({
  entryImage: {
    width: '50%',
  },
}));

export default function CageEntry(props) {
  const {
    title,
    image,
    className,
    onClick,
  } = props;
  const style = useCageEntryStyles();
  return (
    <div onClick={onClick} className={className}>
      <Typography variant="h5" align="center" className={style.entryTitle}>{title}</Typography>
      <img className={style.entryImage} src={image} />
    </div>
  )
}
