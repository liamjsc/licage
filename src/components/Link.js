import { Link as MaterialLink } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

export default function Link(props = {}) {
  return <MaterialLink component={RouterLink} {...props} />
}