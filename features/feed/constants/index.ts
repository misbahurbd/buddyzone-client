import likeReaction from "@/assets/reactions/like-reaction.svg";
import loveReaction from "@/assets/reactions/love-reaction.svg";
import wowReaction from "@/assets/reactions/wow-reaction.svg";
import sadReaction from "@/assets/reactions/sad-reaction.svg";
import angryReaction from "@/assets/reactions/angry-reaction.svg";
import hahaReaction from "@/assets/reactions/haha-reaction.svg";
import { StaticImageData } from "next/image";
import { FeedReactionType } from "../actions";

export const FEED_POST_REACTIONS: {
  id: string;
  label: string;
  icon: StaticImageData;
  value: FeedReactionType;
}[] = [
  {
    id: "like",
    label: "Like",
    icon: likeReaction,
    value: "LIKE",
  },
  {
    id: "love",
    label: "Love",
    icon: loveReaction,
    value: "LOVE",
  },
  {
    id: "wow",
    label: "Wow",
    icon: wowReaction,
    value: "WOW",
  },
  {
    id: "sad",
    label: "Sad",
    icon: sadReaction,
    value: "SAD",
  },
  {
    id: "angry",
    label: "Angry",
    icon: angryReaction,
    value: "ANGRY",
  },
  {
    id: "haha",
    label: "Haha",
    icon: hahaReaction,
    value: "HAHA",
  },
];
