function getFilteredDate(filterValue) {
  const now = new Date();
  const formDate = new Date(now);

  switch (filterValue) {
    case "today": {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      const startOfTomorrow = new Date(startOfToday);
      startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

      return {
        createdAt: { $gte: startOfToday, $lt: startOfTomorrow },
      };
    }

    // Add more cases here if needed:
    case "7days": {
      formDate.setDate(now.getDate() - 7);

      return {
        createdAt: { $gte: formDate },
      };
    }

    case "30days": {
      formDate.setDate(now.getDate() - 30);

      return {
        createdAt: { $gte: formDate },
      };
    }

    case "lastyear": {
      formDate.setFullYear(now.getFullYear() - 1);
      return {
        createdAt: { $gte: formDate },
      };
    }

    default:
      return {}; // fallback
  }
}

module.exports = getFilteredDate;
