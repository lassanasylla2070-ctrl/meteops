import { DateTime } from 'luxon';

export const nowUTC = () => DateTime.local().toUTC();
