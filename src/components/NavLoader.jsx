import React from "react";

export default function NavLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(4px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9998,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Ripple rings */}
        <span
          style={{
            position: "absolute",
            width: 70,
            height: 70,
            borderRadius: "50%",
            border: "2px solid var(--green-600)",
            animation: "ripple 1.2s ease-out infinite",
            opacity: 0,
          }}
        />
        <span
          style={{
            position: "absolute",
            width: 70,
            height: 70,
            borderRadius: "50%",
            border: "2px solid var(--green-600)",
            animation: "ripple 1.2s ease-out infinite 0.4s",
            opacity: 0,
          }}
        />

        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="GeoTreks Kenya"
          style={{
            width: 52,
            height: 52,
            borderRadius: 10,
            objectFit: "cover",
            boxShadow: "0 4px 16px rgba(10,92,71,0.2)",
            animation: "pulse 1.2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
