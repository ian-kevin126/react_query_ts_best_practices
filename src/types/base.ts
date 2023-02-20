export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface Rating {
  rate: number;
  count: number;
}

export interface Task {
  id: number;
  name: string;
  processor: number;
  projectId: number;
  epicId: number;
  kanbanId: number;
  typeId: number;
  note: string;
}

export interface ProductParams {
  id?: number;
  name: string;
  page: number;
  size: number;
}
