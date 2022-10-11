import moment from "moment-timezone"
export function selectedDate() {
  return {
    "Pass week": [
      moment().subtract(1, "weeks").startOf("week"),
      moment().subtract(1, "weeks").endOf("week")
    ],
    "Pass month": [moment().startOf("month"), moment().endOf("month")],
    "Pass 3 months": [moment().subtract(3, "months").startOf("month"), moment().endOf("month")],
    "Pass 6 months": [moment().subtract(6, "months").startOf("month"), moment()],
    "Pass year": [moment().subtract(1, "year").startOf("year"), moment()]
  }
}

export function nextDate() {
  return {
    "Next week": [moment(), moment().add(1, "weeks")],
    "Next month": [moment(), moment().add(1, "months")]
  }
}
