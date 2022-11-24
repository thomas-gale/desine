export interface Metadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  background_color: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}
