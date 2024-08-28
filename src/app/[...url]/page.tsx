import { ragChat } from "@/lib/rag-chat";
import React from "react";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );

  return decodedComponents.join("/");
}

async function Page({ params }: PageProps) {
  console.log(params);

  const reconstructedUrl = reconstructUrl({ url: params.url as string[] });

  await ragChat.context.add({
    type: "html",
    source: reconstructedUrl,
    config: { chunkOverlap: 50, chunkSize: 200 },
  });

  return <div>hey</div>;
}

export default Page;
