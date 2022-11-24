function getTimeString(timeSince) {
  let monthsSince = Math.trunc(timeSince / 1000 / 60 / 60 / 24 / 30);
  let daysSince = Math.trunc(timeSince / 1000 / 60 / 60 / 24);
  let hoursSince = Math.trunc(timeSince / 1000 / 60 / 60);
  let minutesSince = Math.trunc(timeSince / 1000 / 60);
  let secondsSince = Math.trunc(timeSince / 1000);

  let timeString = '';
  //choose appropriate
  if (monthsSince > 0) {
    timeString = `Posted ${monthsSince} months ago.`;
  } else
  if (daysSince > 0) {
    timeString = `Posted ${daysSince} days ago.`;
  } else
  if (hoursSince > 0) {
    timeString = `Posted ${hoursSince} hours ago.`;
  } else
  if (minutesSince > 0) {
    timeString = `Posted ${minutesSince} minutes ago.`;
  } else
  if (secondsSince > 0) {
    timeString = `Posted ${secondsSince} seconds ago.`;
  } else {
    timeString = `Posted 0 seconds ago.`;
  }
  return timeString;
}