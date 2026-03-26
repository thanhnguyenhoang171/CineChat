import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactCompiler: true,
  transpilePackages: ["@cinechat/types"], // Giúp Next.js hiểu và biên dịch code từ gói shared
};

export default nextConfig;
