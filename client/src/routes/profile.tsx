import { createFileRoute } from '@tanstack/react-router'
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


export const Route = createFileRoute('/profile')({
  component: Profile
})




async function getCurrentUser() {
  const res = await api.me.$get();
  if (!res.ok) {
    throw new Error("Server wrong");
  }
  const data = await res.json();
  return data;
}

function Profile() {

  const { isPending, error, data } = useQuery({
    queryKey: ["get-current-user"],
    queryFn: getCurrentUser,
  }
)
    if(isPending) return 'Loading...';
    if(error) return 'An error occurred ' + error.message;
    return (
      <div>
        <h1>Profile</h1>
        <p>{data?.user.family_name}</p>
      </div>
    );
};