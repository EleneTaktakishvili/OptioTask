import connectMongoDB from "./mongodbConnection";
import PigStatus from "../lib/models/pigStatus";

export async function getNextSequenceValue(statusId) {
  await connectMongoDB();
  const result = await PigStatus.findOneAndUpdate(
    { _id: statusId },
    { $inc: { sequenceValue: 1 } },
    { returnDocument: "after", upsert: true } // Upsert ensures creation if not exists
  );
  return result.value.sequenceValue;
}

export default getNextSequenceValue;
