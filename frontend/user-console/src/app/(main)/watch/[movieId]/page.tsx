export default function WatchPage({ params }: { params: { movieId: string } }) {
  return (
    <div>
      <h1>Watch Movie {params.movieId}</h1>
    </div>
  );
}
