// * Utility types

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock?: number;
  quantity?: number;
  weight?: string;
  color?: string;
};

type ProductSummery = Pick<
  Product,
  "id" | "name" | "price" | "description" | "stock"
>;
type ProductWithoutWeightQuantity = Omit<Product, "quantity" | "weight">;

type ProductAllRequired = Required<Product>;
type OptionalProduct = Partial<Product>;

type ReadonlyProduct = Readonly<Product>;

const emptyObj: Record<string, unknown> = {};
