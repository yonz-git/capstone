import { useRouter } from "next/router";
import SavedList from "@/components/SavedList/SavedList";

export default function SavedDatesPage() {
  const router = useRouter();

  return (
    <>
      <SavedList onBackToForm={() => router.push("/checktiming")} />
    </>
  );
}
