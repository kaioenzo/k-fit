import type { UserStore } from "$types/global-stores";
import { LocalNotifications } from "@capacitor/local-notifications";
import dayjs from "dayjs";

export async function scheduleLocalNotification(
  interval: 15 | 30,
  userData: UserStore,
  url: string
) {
  const userClonable = { ...userData };
  try {
    await LocalNotifications.removeAllDeliveredNotifications();
    const notificationsSend = (await LocalNotifications.getPending())
      .notifications;
    if (notificationsSend.length > 0) {
      await LocalNotifications.cancel({ notifications: notificationsSend });
    }
  } catch (ex) {
    alert(ex);
  }

  const start = dayjs(userClonable.startNotificationHour, "HH:mm");
  const end = dayjs(userClonable.endNotificationHour, "HH:mm");

  if (!start.isValid() || !end.isValid() || !start.isBefore(end)) {
    alert("Invalid start or end time");
    return;
  }

  let currentNotificationTime = dayjs().isAfter(start) ? dayjs() : start;

  const minutesToNotificate = end.diff(start, "minutes");
  let remainingNotifications = Math.round(minutesToNotificate / interval);
  const needDrinkWater =
    userClonable.waterPerDayInML - userClonable.waterLevel > 0;

  while (
    currentNotificationTime.isBefore(end) &&
    remainingNotifications > 0 &&
    needDrinkWater
  ) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Ei, não esqueça de beber água!",
          body: `Beba ${userClonable.doseOfWater}ml agora e fique mais perto do seu objetivo diário de ${userClonable.waterPerDayInML}ml!`,
          id: currentNotificationTime.unix(),
          schedule: { at: currentNotificationTime.toDate() },
          extra: {
            url: url,
          },
        },
      ],
    });

    currentNotificationTime = currentNotificationTime.add(1, "minutes");
    remainingNotifications--;
  }
}
