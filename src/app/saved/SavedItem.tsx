export type SavedItemData = {
  id: string;
  image: string | null;
  type: string;
  tag: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  itemType: "article" | "episode";
  numericId: number;
};
