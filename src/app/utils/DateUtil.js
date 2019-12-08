export function formatDate(dateString) {
  var options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "America/Sao_Paulo"
  };
  var date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", options);
}

export function formatDateTime(dateString) {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  };
  var date = new Date(dateString);

  return date.toLocaleDateString("pt-BR", options);
}

export function ptStringToDate(dateString) {
  var splitted = dateString.split("/");
  var date = new Date(splitted[2], Number(splitted[1]) - 1, splitted[0]);
  return date;
}

export function ptDateToLong(dateString) {
  return ptStringToDate(dateString).getTime();
}

export function unixtimestampToDate(dateLong) {
  return formatDate(new Date(dateLong));
}

export function getDateFromLong(value) {
  var options = { year: "numeric", month: "numeric", day: "numeric", timeZone: "UTC" };
  if (value > 0) {
    return new Date(value * 1000).toLocaleString("pt-BR", options);
  } else {
    return;
  }
}

export function setLongFromDate(value) {
  var splitted = value.split("/")
  var date = parseInt((new Date(`${splitted[2]}-${splitted[1]}-${splitted[0]}`).getTime() / 1000).toFixed(0))
  return date
}

export function getLongFromDate(value) {
  const date = new Date(value).getTime()
  return date
}

export function getWeekDayName(dateString) {
  var date = new Date(dateString);

  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var n = weekday[date.getUTCDay()];
  return n;
}

export function getDay(dateString) {
  var date = new Date(dateString);
  return date.getUTCDate();
}
