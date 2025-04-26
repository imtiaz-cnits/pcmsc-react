function gradeCal(totalMark) {
  if (
    typeof totalMark !== "number" ||
    Number.isNaN(totalMark) ||
    totalMark < 0 ||
    totalMark > 100
  ) {
    return "Invalid";
  }

  if (totalMark >= 80 && totalMark <= 100) {
    return { letterGrade: "A+", gradePoint: "5.0" };
  }
  if (totalMark >= 70 && totalMark <= 79) {
    return { letterGrade: "A", gradePoint: "4.00" };
  }
  if (totalMark >= 60 && totalMark <= 69) {
    return { letterGrade: "A-", gradePoint: "3.50" };
  }
  if (totalMark >= 50 && totalMark <= 59) {
    return { letterGrade: "B", gradePoint: "3.00" };
  }
  if (totalMark >= 40 && totalMark <= 49) {
    return { letterGrade: "C", gradePoint: "2.00" };
  }
  if (totalMark >= 0 && totalMark <= 39) {
    return { letterGrade: "F", gradePoint: "0.00" };
  }
  return "Invalid";
}

module.exports = { gradeCal };
