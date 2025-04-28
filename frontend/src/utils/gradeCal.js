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

function GradePointCal(gradePoint) {
  if (
    typeof gradePoint !== "number" ||
    Number.isNaN(gradePoint) ||
    gradePoint < 0 ||
    gradePoint > 5
  ) {
    return "Invalid";
  }

  if (gradePoint >= 4.9 && gradePoint <= 5.0) {
    return { letterGrade: "A+", gradePoint: "5.00" };
  } else if (gradePoint >= 3.9 && gradePoint < 4.9) {
    return { letterGrade: "A", gradePoint: "4.00" };
  } else if (gradePoint >= 3.5 && gradePoint < 3.9) {
    return { letterGrade: "A-", gradePoint: "3.50" };
  } else if (gradePoint >= 3.0 && gradePoint < 3.5) {
    return { letterGrade: "B", gradePoint: "3.00" };
  } else if (gradePoint >= 2.0 && gradePoint < 3.0) {
    return { letterGrade: "C", gradePoint: "2.00" };
  } else if (gradePoint >= 0 && gradePoint < 2.0) {
    return { letterGrade: "F", gradePoint: "0.00" };
  }
}

export function totalGradeCal(student, totalEntries) {
  if (!Array.isArray(student) || student.length === 0 || !totalEntries) {
    return { letterGrade: "N/A", gradePoint: "0.00" };
  }

  const totalGradePoint = student.reduce((acc, cur) => {
    console.log(Number(cur.gradePoint));
    const total = Number(acc) + Number(cur.gradePoint);
    return total;
  }, 0.0);

  console.log(totalGradePoint / totalEntries);
  return GradePointCal(Number(totalGradePoint / totalEntries));
}

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
