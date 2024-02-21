import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const POSTS = [
  { id: 1, name: "ashik" },
  { id: 2, name: "sabbir" },
];

const App = () => {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const postsQueryMutation = useMutation({
    mutationFn: async (title) => {
      const newPost = { id: Date.now(), name: title }; // Create a new post object
      POSTS.push(newPost); // Push the new post to the POSTS array
      await wait(1000); // Wait for 1 second
      return newPost; // Return the new post
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]); // Invalidate the cache to trigger a refetch
    },
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;

  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;
  console.log(POSTS);
  return (
    <div className="text-center ">
      <h1 className="font-bold text-2xl">Tanstack query App</h1>
      <p>
        {postsQuery.data.map((post) => (
          <article key={post.id}>{post.name}</article>
        ))}
      </p>
      <button
        disabled={postsQueryMutation.isLoading}
        className="bg-blue-500 py-2 px-4 text-white"
        onClick={() => postsQueryMutation.mutate("hello")}
      >
        Add{" "}
      </button>
    </div>
  );
};

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
