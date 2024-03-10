import axios from "@/utils/axios";

export default async function Home() {
  const me = await axios.get("/users/me");

  return <div>{JSON.stringify(me.data)}</div>;
}
