export type activityType = {
  id?: number;
  title: string;
  email?: string;
  created_at?: string;
  todo_items?: string[];
};

export type listItemType = {
  id?: number;
  activity_group_id?: number;
  title?: string;
  priority?: string;
  is_active?: number;
}