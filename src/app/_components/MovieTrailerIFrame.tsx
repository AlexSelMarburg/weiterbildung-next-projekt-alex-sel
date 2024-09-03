import { VideoData } from "@/types/movie-type";

export default function MovieTrailerIFrame({ video }: { video: VideoData }) {
  return (
    <div className="iframe-container">
      <iframe
        className="movie-trailer-iframe"
        src={`https://www.youtube.com/embed/${video.key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
