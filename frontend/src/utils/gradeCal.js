export const gradeCal = (totalMark) => {
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
};

// totalGradeCal

/*

const students = [
    {
      studentID: "STU001",
      name: "Sajid Ahmed",
      grade: '3.20'
    },
    {
      studentID: "STU002",
      name: "Naim Hossain",
     grade: '4.25'
    },
    {
      studentID: "STU003",
      name: "Mitu Akter",
     grade: '5.00'
    }
  ];

const sum = students.reduce((acc , cur)=>{
    console.log(Number(cur.grade))
    const totalGrade = (acc + Number(cur.grade))
    console.log(totalGrade)
    return totalGrade
},0)


console.log(Number(sum/3))

console.log(sum)

*/
