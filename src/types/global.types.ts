export type Gender = 'female' | 'male' | 'other';

export interface TreeNode<T> {
  data: T;
  children: Record<string, { records: Array<TreeNode<any>> }>;
}