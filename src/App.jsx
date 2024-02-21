import { useQuery } from "@tanstack/react-query";

const POSTS = [
  { id: 1, name: "ashik" },
  { id: 2, name: "sabbir" },
];

const App = () => {
  const postsQuery = useQuery({
    queryKey: "posts",
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;

  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <div className="text-center ">
      <h1 className="font-bold text-2xl">Tanstack query App</h1>
      <p>
        {postsQuery.data.map((post) => (
          <article key={post.id}>{post.name}</article>
        ))}
      </p>
    </div>
  );
};

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
