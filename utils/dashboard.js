import Event from "../models/Event.js";
import Node from "../models/Node.js";
import Post from "../models/Post.js";
import Report from "../models/Report.js";
import User from "../models/User.js";

const dashboardHandler = async () => {
  const totalUser = await User.countDocuments();
  const totalNode = await Node.countDocuments();
  const totalPost = await Post.countDocuments();
  const totalEvent = await Event.countDocuments();
  const totalReport = await Report.countDocuments();
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
  const activeInLast24Hour = await User.countDocuments({
    lastInteraction: { $gte: twentyFourHoursAgo },
  });
  const registeredInLast24Hour = await User.countDocuments({
    createdAt: { $gte: twentyFourHoursAgo },
  });
  return {
    totalUser,
    totalNode,
    totalPost,
    totalEvent,
    totalReport,
    activeInLast24Hour,
    registeredInLast24Hour,
  };
};

export default dashboardHandler;
