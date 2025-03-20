// 📝 do add section
const Section = require("../../models/sectionModel");

async function addSection(req, res, next) {
    const { section, status } = req.body;

    try {
        // create new object
        const newSection = new Section({
            name: section.trim(),
            status: status?.value,
        });

        // save to db
        await newSection.save();

        return res.status(200).json({
            success: true,
            message: "Successfully added!",
        });
    } catch (error) {
        console.log("Error in adding section: ", error);
        return next(error);
    }
}

//exports
module.exports ={addSection}