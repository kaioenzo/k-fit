import type { UserStore } from "$types/global-stores";
import { Preferences } from "@capacitor/preferences";

export async function updateLocalUser(user: UserStore): Promise<void> {
  user.startNotificationHour = "08:00";
  user.endNotificationHour = "23:59";
  await Preferences.set({
    key: "user",
    value: JSON.stringify(user),
  });
}
