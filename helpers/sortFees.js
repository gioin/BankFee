import moment from 'moment';
import roundUpToCents from './roundUpToCents.js';

function sortFees(result) {
  return result.sort((a, b) => moment.utc(a.date).diff(moment.utc(b.date)))
    .map((data) => ({ ...data, fee: roundUpToCents(data.fee) }));
}

export default sortFees;
