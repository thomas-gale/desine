import occtimportjs from "occt-import-js";

export interface MeshRequest {
  stepFile: Uint8Array;
}

export interface MeshResponse {
  meshes: { attributes: any; index: any; color: any }[];
}

class MeshingListenerMessageEvent extends Event {
  data: MeshRequest;
}

export class MeshingPostMessageEvent extends Event {
  data: MeshResponse;
}

addEventListener("message", async (event: MeshingListenerMessageEvent) => {
  console.log("2.1 (meshing web worker) message received...");
  const occt = await occtimportjs();
  let result = occt.ReadStepFile(event.data.stepFile, null);
  console.log("2.1 (meshing web worker) work complete!");
  postMessage(result as MeshResponse);
});
