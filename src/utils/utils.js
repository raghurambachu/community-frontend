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

function axios(url, method, data, auth) {
  let headers = {};
  headers["Content-Type"] = "application/json";
  if (auth) headers["authorization"] = localStorage.authToken;

  let fetchPayload = {
    method: method,
    headers: headers,
  };
  if ((method === "POST" || method === "PUT") && data) {
    // body: JSON.stringify(data),
    fetchPayload["body"] = JSON.stringify(data);
  }
  console.log(fetchPayload);
  return fetch(process.env.REACT_APP_URL + url, fetchPayload).then((res) =>
    res.json()
  );
}

module.exports = { getFormattedDate, axios };
