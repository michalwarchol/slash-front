import { me } from "@/app/actions";

export default async function Home() {
  const data = await me();

  return <div>{JSON.stringify(data)}</div>;
}
