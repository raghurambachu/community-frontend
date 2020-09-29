function getFormattedDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  date = date.slice(0, 10).split("-"); //2020-18-25dgsdgjlsdk
  return `${date[2]} ${months[+date[1]]}, ${date[0]}`;
}

module.exports = { getFormattedDate };
