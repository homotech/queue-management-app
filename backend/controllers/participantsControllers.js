const participantSchema = require("../models/participant");

exports.createQueue = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, note } = req.body;
    const queue = new QueueSchema({
      name,
      phone,
      note,
      createdBy: userId,
    });

    await queue.save();
    res.status(200).json({ message: "Queue Created", queue });
  } catch (error) {
    console.error("Error Creating Queue: ", error);
    return res.status(500).json({ message: "Error creating queue" });
  }
};
