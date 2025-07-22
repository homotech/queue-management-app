const QueueSchema = require("../models/queue");

exports.createQueue = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, description, maxPeople, isPublic, autoCloseTime } = req.body;
    const queue = new QueueSchema({
      name,
      description,
      maxPeople,
      isPublic,
      autoCloseTime,
      createdBy: userId,
    });

    await queue.save();
    res.status(200).json({ message: "Queue Created", queue });
  } catch (error) {
    console.error("Error Creating Queue: ", error);
    return res.status(500).json({ message: "Error creating queue" });
  }
};
