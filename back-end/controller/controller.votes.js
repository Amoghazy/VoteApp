import { Votes } from "../model/model.js";

export const getvotes = async (req, res) => {
  let [db] = await Votes.find({}, { _id: 0 }).lean();
  const totalVotes = Object.values(db).reduce((acc, crr) => (acc += crr), 0);

  let data = Object.entries(db).map(([label, votes]) => {
    return {
      label,
      percentage: ((100 * votes) / totalVotes || 0).toFixed(0),
    };
  });

  res.json({ data, totalVotes });
};
export const sendVotes = async (req, res) => {
  const votes = await Votes.findOne({}, { _id: 0 }).lean();

  votes[req.body.add]++;

  const updatedVotes = await Votes.findOneAndUpdate(
    {},
    { ...votes },
    { new: true }
  );

  res.end(JSON.stringify(votes));
};
