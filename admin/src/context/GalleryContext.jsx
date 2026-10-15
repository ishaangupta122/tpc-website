import { galleryApi } from "../api";
import { createCrudContext } from "./createCrudContext";

export const { Provider: GalleryProvider, useResource: useGallery } =
  createCrudContext("Gallery", galleryApi);
