import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          position: "relative",
          overflow: "hidden",
          borderRadius: "50%", // Makes it a circle
        }}
      >
        {/* White Top Half */}
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            position: "absolute",
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)", // Top half
          }}
        />

        {/* Red Bottom Half */}
        <div
          style={{
            backgroundColor: "red",
            width: "100%",
            height: "100%",
            position: "absolute",
            clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)", // Bottom half
          }}
        />

        {/* Flipped Diagonal Slash */}
        <div
          style={{
            position: "absolute",
            width: "150%", // Extends beyond circle
            height: "10%",
            backgroundColor: "black",
            transform: "rotate(-45deg)", // Flipped diagonal
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
