import { me } from "@/app/actions";

export default async function Home() {
  const meData = await me();

  return <div>{JSON.stringify(meData.data)}</div>;
}
