async function getResult(req, res, next) {
  try {
    console.log("filter query : ", req.query);

    const { classRoll, section, className, shift, session, examination } =
      req.query;
  } catch (error) {
    console.log("getResult : ", error);
    next(error);
  }
}

module.exports = { getResult };
