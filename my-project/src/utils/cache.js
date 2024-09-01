
import { singleton } from "./singleton.js";

const cache = singleton("serverCache", () => new Map());

function cacheget() {
  const duration=60000
  if (cache.size == 0 || (Date.now()-cache.get("latestcomment").Date)>duration) {
    console.log("here");
    return null;
  }
  const data = {
    latestcomment: cache.get("latestcomment").latestcomment,
    username: cache.get("username").username,
    userdata: cache.get("userdata").userdata,
  };
  console.log(data);
  return data;
}
 export function cacheset(latestcomment, username, userdata) {
  cache.set("latestcomment", {latestcomment:latestcomment,Date:Date.now()});
  cache.set("username", {username:username,Date:Date.now()});
  cache.set("userdata", { userdata:userdata,Date:Date.now()});
}



export async function getCachedData() {
    const cached = cacheget();
     return cached;
  
  
}
