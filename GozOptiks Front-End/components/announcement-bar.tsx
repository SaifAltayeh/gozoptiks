import Link from "next/link";
import { store } from "@/data/store";

export function AnnouncementBar() {
  if (!store.announcement.enabled) return null;
  return (
    <div className="announce">
      <Link href={store.announcement.href}>{store.announcement.text}</Link>
    </div>
  );
}
