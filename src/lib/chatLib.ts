import axios from "axios";

export function isOnlineF({
  setIsOnline,
  roomId,
}: {
  setIsOnline: any;
  roomId: string;
}) {
  const response = axios.get(
    `https://autocommentapi.vercel.app/v1/room/${roomId}`
  );
  response.then((res) => {
    setIsOnline(res?.data?.isOnline);
  });
}
export function fetchAds({ setAds, roomId }: { setAds: any; roomId: string }) {
  const response = axios.get(
    `https://autocommentapi.vercel.app/v1/ads/room/${roomId}`
  );
  response.then((res) => {
    setAds(res.data);
  });
}

export function fetchOnline({
  setNumberOfOnline,
  roomId,
}: {
  setNumberOfOnline: any;
  roomId: string;
}) {
  const response = axios.get(
    `https://autocommentapi.vercel.app/v1/online-user/${roomId}`
  );
  response.then((res) => {
    setNumberOfOnline(res.data);
  });
}

export function reFetchChat({
  setChat,
  roomId,
}: {
  setChat: any;
  roomId: string;
}) {
  const response = axios.get(
    `https://autocommentapi.vercel.app/api/messages/${roomId}`
  );
  response.then((res) => {
    setChat(res.data);
  });
}

export function PollFetch(roomId: string, setPoll: any) {
  const response = axios.get(
    `https://autocommentapi.vercel.app/v1/poll/get/${roomId}`
  );
  response.then((res) => {
    setPoll(res?.data?.result);
  });
}
