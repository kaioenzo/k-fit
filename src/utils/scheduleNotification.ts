import { user } from "$stores/global";
import type { UserStore } from "$types/global-stores";
import {
  LocalNotifications,
  type LocalNotificationSchema,
} from "@capacitor/local-notifications";
import dayjs, { Dayjs } from "dayjs";

export async function scheduleLocalNotification(
  interval: 15 | 30,
  userData: UserStore,
  url: string
) {
  const { startNotificationHour, endNotificationHour } = userData;
  const end = dayjs(startNotificationHour, "HH:mm");
  const start = dayjs(endNotificationHour, "HH:mm");

  if (!start.isValid() || !end.isValid()) {
    alert("Invalid start or end time");
    return;
  }

  const currentNotificationTime = dayjs();

  if (interval === 15) {
    await scheduleWaterNotification(
      userData,
      currentNotificationTime,
      end,
      start
    );
  } else if (interval === 30) {
    await scheduleBreakNotification(userData, currentNotificationTime, start);
  }
}

async function scheduleBreakNotification(
  userData: UserStore,
  currentNotificationTime: Dayjs,
  end: Dayjs
) {
  await clearNotification("break");

  const notifications = [];
  let now = currentNotificationTime.add(1, "minute");

  while (now.isBefore(end)) {
    notifications.push({
      title: "Faça uma pausa agora!",
      body: "Alongue-se e tenha mais qualidade de vida!",
      id: now.unix(),
      schedule: { at: now.toDate() },
      extra: {
        url: "/breaks",
      },
    });
    now = now.add(30, "minutes");
  }
  await LocalNotifications.schedule({ notifications });
}

async function scheduleWaterNotification(
  userData: UserStore,
  currentNotificationTime: Dayjs,
  start: Dayjs,
  end: Dayjs
) {
  await clearNotification("water");

  const { endNotificationHour, doseOfWater, waterPerDayInML } = userData;
  const timeDifference = end.diff(currentNotificationTime, "minute");
  const remainingWater = timeDifference * waterPerDayInML;
  let notificationNumber = Math.ceil(remainingWater / waterPerDayInML);
  let now = currentNotificationTime.add(1, "minute");
  const notifications: LocalNotificationSchema[] = [];

  while (
    (dayjs().diff(dayjs(endNotificationHour), "minutes") / 15) * doseOfWater <
    waterPerDayInML
  ) {
    userData.doseOfWater += 100;
    user.update((u) => {
      u.doseOfWater += 100;
      return u;
    });
  }

  for (; notificationNumber > 0 && now.isBefore(end); notificationNumber--) {
    notifications.push({
      title: "Ei, não esqueça de beber água!",
      body: `Beba ${doseOfWater}ml agora e fique mais perto do seu objetivo diário de ${waterPerDayInML}ml!`,
      id: now.unix(),
      schedule: { at: now.toDate() },
      extra: {
        url: "/home",
      },
    });
    now = now.add(15, "minutes");
  }

  await LocalNotifications.schedule({ notifications });
}

type notificationType = "water" | "break";

async function clearNotification(type: notificationType) {
  try {
    await LocalNotifications.removeAllDeliveredNotifications();
    const notificationsSend = (await LocalNotifications.getPending())
      .notifications;
    const filteredNotifications = notificationsSend.filter((n) =>
      type === "water" ? n.title.includes("água") : n.title.includes("pausa")
    );

    if (filteredNotifications.length > 0) {
      await LocalNotifications.cancel({ notifications: filteredNotifications });
    }
  } catch (ex) {
    console.error(ex);
  }
}
