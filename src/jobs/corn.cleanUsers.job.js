import cron from "node-cron";

import { AdminApproachEnum } from "../common/enums/email.enum.js";
import { UserModel } from "../DB/index.js";
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("🧹 Cleaning inactive users...");

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const result = await UserModel.deleteMany({
      status: {
        $in: [
          AdminApproachEnum.PENDING,
          AdminApproachEnum.APPROVED
        ],
      },
      createdAt: { $lte: oneDayAgo },
    });

    console.log("Deleted users:", result.deletedCount);
  } catch (error) {
    console.log("Cron Error:", error);
  }
});