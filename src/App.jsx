import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Initial list of posts
const POSTS = [
  { id: 1, name: "ashik" },
  { id: 2, name: "sabbir" },
];

// Main component
const App = () => {
  // Access the query client instance
  const queryClient = useQueryClient();

  // Query to fetch posts
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]), // Simulate fetching posts
  });

  // Mutation function to add a new post
  const postsQueryMutation = useMutation({
    // Add a new post with a title
    mutationFn: async (title) => {
      const newPost = { id: Date.now(), name: title }; // Create a new post object
      POSTS.push(newPost); // Push the new post to the POSTS array
      await wait(1000); // Wait for 1 second
      return newPost; // Return the new post
    },
    // On mutation success, invalidate the posts query to refetch
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]); // Invalidate the cache to trigger a refetch
    },
  });

  // Render loading state while fetching posts
  if (postsQuery.isLoading) return <h1>Loading...</h1>;

  // Render error state if there's an error fetching posts
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  // Log the current list of posts
  console.log(POSTS);

  // Render the main application UI
  return (
    <div className="text-center ">
      <h1 className="font-bold text-2xl">Tanstack query App</h1>
      <p>
        {/* Render each post */}
        {postsQuery.data.map((post) => (
          <article key={post.id}>{post.name}</article>
        ))}
      </p>
      {/* Button to add a new post */}
      <button
        disabled={postsQueryMutation.isLoading} // Disable button while adding a post
        className="bg-blue-500 py-2 px-4 text-white"
        onClick={() => postsQueryMutation.mutate("hello")} // Trigger mutation with a title
      >
        Add
      </button>
    </div>
  );
};

// Function to wait for a duration
function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

// Export the main component
export default App;
