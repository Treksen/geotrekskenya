import React from "react";

export default function PageLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      {/* Pulsing logo */}
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
            width: 90,
            height: 90,
            borderRadius: "50%",
            border: "3px solid var(--green-600)",
            animation: "ripple 1.6s ease-out infinite",
            opacity: 0,
          }}
        />
        <span
          style={{
            position: "absolute",
            width: 90,
            height: 90,
            borderRadius: "50%",
            border: "3px solid var(--green-600)",
            animation: "ripple 1.6s ease-out infinite 0.5s",
            opacity: 0,
          }}
        />

        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="GeoTreks Kenya"
          style={{
            width: 70,
            height: 70,
            borderRadius: 14,
            objectFit: "cover",
            boxShadow: "0 4px 20px rgba(10,92,71,0.25)",
            animation: "pulse 1.6s ease-in-out infinite",
          }}
        />
      </div>

      {/* Brand name */}
      <div
        style={{
          marginTop: 24,
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 22,
          color: "var(--green-600)",
          letterSpacing: "0.02em",
        }}
      >
        GeoTreks
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.15em",
          color: "var(--green-600)",
          textTransform: "uppercase",
          opacity: 0.7,
        }}
      >
        Kenya
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
